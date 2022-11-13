import * as ical from "ical";
import {AuthorizedInstance} from "../lib/Instance";
import {Utils} from "../lib/Utils";
import {Group, Person} from "../src/graphql-types";

export class IcalPoster {
    private readonly authorizedInstance: AuthorizedInstance;
    private readonly profile: Person;
    private readonly tags: string[];
    private readonly group?: Group;

    /**
     * Reads an ICAL-stream, posts it to Mobilizon
     * @param authorizedInstance: The instance to post to
     * @param profile: the profile to past as
     * @param tags: default tags to add to the event. Note that tags in the descriptions are appended to this list automatically by Mobilizon itself
     * @param group: the group to post into
     */
    constructor(authorizedInstance: AuthorizedInstance, profile: Person, tags: string[], group?: Group) {
        this.tags = tags;
        this.profile = profile;
        this.group = group;
        this.authorizedInstance = authorizedInstance;
    }

    /**
     * Creates the event; return 'true' if the event was created.
     *
     * Events might be skipped because they are in the past, duplicated or invalid for some other reason
     * @param eventIcal
     * @constructor
     */
    public async PostSingleEvent(eventIcal: ical.CalendarComponent): Promise<boolean> {
        const event = Utils.IcalToEventParameters(eventIcal, this.profile, this.group ?? this.profile)

        if (event.beginsOn === undefined) {
            console.log("Skipping ", event.title, ", no start time given")
            return false
        }
        if (new Date().getTime() > event.beginsOn.getTime()) {
            console.log("Skipping ", event.title, ", it's in the past")
            return false
        }
        if (await this.authorizedInstance.AlreadyExists(event)) {
            console.log("Already exists:", event.title)
            return false
        }


        let chosenLocation = undefined
        if (eventIcal.location) {

            try {

                const locs = await this.authorizedInstance.searchLocation(eventIcal.location)
                if (eventIcal.geo !== undefined) {
                    const withDistance = locs.map(l => {
                        const d = Utils.DistanceEstimateInMeter(eventIcal.geo, l.geom)
                        return ({l, d});
                    })
                    withDistance.sort((a, b) => b.d - a.d)
                    chosenLocation = withDistance[0].l
                } else {
                    chosenLocation = locs[0]
                }
            } catch (e) {
                console.error("Could not lookup location")
                chosenLocation = {
                    geom: eventIcal.geo.lon + ";" + eventIcal.geo.lat,
                    description: eventIcal.location
                }
            }
        } else if (eventIcal.geo !== undefined) {
            chosenLocation = {
                geom: eventIcal.geo.lon + ";" + eventIcal.geo.lat
            }
        }
        if (chosenLocation !== undefined && eventIcal.geo !== undefined) {
            chosenLocation.geom = eventIcal.geo.lon + ";" + eventIcal.geo.lat
        }
        event.physicalAddress = chosenLocation
        
        event.tags = this.tags
        console.log(event)
        //await this.authorizedInstance.CreateEvent(event) // TODO reenable
        return true;
    }

    public async PostAllEvents(icalData: string): Promise<{ total: number; created: number; failed: number; skipped: number }> {
        // Calendar = object which maps ID --> CalendarComponent
        const calendar = <any>ical.parseICS(icalData)

        let total = 0
        let created = 0
        let failed = 0
        let skipped = 0
        for (const calendarKey in calendar) {
            const eventIcal = calendar[calendarKey]

            try {
                total++
                if (await this.PostSingleEvent(eventIcal)) {
                    created++
                } else {
                    skipped++
                }
            } catch (e) {
                failed++
                console.error("Error while creating or inspecting event", eventIcal.summary, " due to ", e)
            }
        }
        const result = {created, failed, skipped, total}
        console.log("All done! ", JSON.stringify(result));
        return result
    }

}