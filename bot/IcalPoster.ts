import {Utils} from "./Utils";
import {AuthorizedInstance} from "mobilizon-typescript-sdk/dist/Instance";
import {Group, Event, Person, AddressInput} from "mobilizon-typescript-sdk/dist/Definitions";
import * as ical from "ical"

export class IcalPoster {
    private readonly authorizedInstance: AuthorizedInstance;
    private readonly profile: Person;
    private readonly tags: string[];
    private readonly groupname: string;

    /**
     * Reads an ICAL-stream, posts it to Mobilizon
     * @param authorizedInstance: The instance to post to
     * @param profile: the profile to past as
     * @param tags: default tags to add to the event. Note that tags in the descriptions are appended to this list automatically by Mobilizon itself
     * @param groupname: the preferredUserName of the group to post into
     */
    constructor(authorizedInstance: AuthorizedInstance, profile: Person, tags: string[], groupname: string) {
        this.tags = tags;
        this.profile = profile;
        this.authorizedInstance = authorizedInstance;
        this.groupname = groupname;
    }
    
    private async determineLocation(eventIcal: ical.CalendarComponent): Promise<AddressInput>{
        let chosenLocation = undefined
        if (eventIcal.location) {

            try {

                const locs = await this.authorizedInstance.searchLocation(eventIcal.location)
                if (locs.length > 0) {

                    if (eventIcal.geo !== undefined) {
                        const withDistance = locs.map(l => {
                            const geo : number[] = (<string> l.geom).split(";").map(c => Number.parseFloat(c))
                            const d = Utils.DistanceEstimateInMeter(eventIcal.geo, {lat: geo[0], lon: geo[1]})
                            return ({l, d});
                        })
                        withDistance.sort((a, b) => a.d - b.d)
                        chosenLocation = withDistance[0].l
                    } else {
                        chosenLocation = locs[0]
                    }
                } else {
                    chosenLocation = {
                        geom: eventIcal.geo.lon + ";" + eventIcal.geo.lat,
                        description: eventIcal.location
                    }
                }
            } catch (e) {
                console.error("Could not lookup location due to ", e)
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
        return chosenLocation;
    }

    /**
     * Creates the event; return 'true' if the event was created.
     *
     * Events might be skipped because they are in the past, duplicated or invalid for some other reason
     */
    public async PostSingleEvent(eventIcal: ical.CalendarComponent, group: Group): Promise<"updated" | "created" | "skipped" | "already_exists"> {
        const event = Utils.IcalToEventParameters(eventIcal, this.profile, group ?? this.profile)
        event.tags = this.tags
        /* event.picture = {
             mediaId: group.banner?.id ?? group.avatar?.id
         }*/
        event.options = {anonymousParticipation : true}
        const alreadyKnownEvents : Event[] = group.organizedEvents.elements
        if (event.beginsOn === undefined) {
            console.warn("  Skipping", event.title, ", no start time given")
            return "skipped"
        }
        if (new Date().getTime() > event.beginsOn.getTime()) {
            console.debug("  Skipping", event.title, ", it's in the past")
            return "skipped"
        }
        
        const possibleDuplicate = alreadyKnownEvents.filter(known =>
            new Date( known.beginsOn).toString() === event.beginsOn.toString() && known.title === event.title)
        

        if(possibleDuplicate.length > 0){
            console.log("  Inspecting "+event.title+": already exists within group...")
            event.physicalAddress = await this.determineLocation(eventIcal)

            const diff = Utils.difference(event, possibleDuplicate[0])
            if(diff !== null){
                console.log("Found differences between the ical and Mobilizon; updating mobilizon")
                await   this.authorizedInstance.UpdateEvent(
                    possibleDuplicate[0].id,
                    event)
                return "updated"
            }
            return "already_exists"
        }


        event.physicalAddress = await this.determineLocation(eventIcal)
        
        console.log("POSTING:", event.title)
        await this.authorizedInstance.CreateEvent(event) // TODO reenable
        return "created";
    }

    public async PostAllEvents(icalData: string): Promise<{ total: number; created: number; failed: number; skipped: number; already_exists }> {
        // Calendar = object which maps ID --> CalendarComponent
        const calendar = <any>ical.parseICS(icalData)

        const group =  await this.authorizedInstance.FetchGroup(this.groupname, new Date())
        const results  = {
            created : 0,
            failed: 0,
            skipped: 0,
            already_exists: 0,
            total :0
        }
        for (const calendarKey in calendar) {
            const eventIcal = calendar[calendarKey]

            try {
               results. total++
                const result = await this.PostSingleEvent(eventIcal, group)
               results[result]++
            } catch (e) {
                results.failed++
                console.error("Error while creating or inspecting event", eventIcal.summary, " due to ", e)
            }
        }
        console.log("All done! ", JSON.stringify(results));
        return results
    }

}