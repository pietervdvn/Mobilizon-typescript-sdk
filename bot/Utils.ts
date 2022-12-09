import {CalendarComponent} from "ical"
import {Actor, Person} from "mobilizon-typescript-sdk/dist/Definitions";
import {EventParameters} from "mobilizon-typescript-sdk/dist/Instance";

export class Utils {
    private static readonly E = 0.00000000000001;
    private static readonly RadiusOfEarth = 6371000;

    /**
     * Extracts a duration from an english string, returns the total amount of seconds.
     * Returns null if no value is found
     *
     * Utils.extractFrequency("Imports the feed from https://example.org/calendar.ics every 15 minutes") // => 15 * 60
     * Utils.extractFrequency("Imports the feed from https://example.org/calendar.ics every hour") // => 1 * 60 * 60
     * Utils.extractFrequency("Imports the feed from https://example.org/calendar.ics every 2 hours") // => 2 * 60 * 60
     * Utils.extractFrequency("Imports the feed from https://example.org/calendar.ics every day") // => 24 * 60 * 60
     * Utils.extractFrequency("blabla") // => null
     */
    public static extractFrequency(textContent: string) : number | null {
        const match = textContent.match(/([0-9]+)? (hours|minutes|days|hour|minute|day)/i);
        if (match === null) {
            return null;
        }
        let duration = 1
        if (match[1] !== undefined) {
            duration = Number.parseInt(match[1])
        }
        const unit = match[2]
        if (unit.startsWith("min")) {
            return 60 * duration
        }
        if (unit.startsWith("hour")) {
            return 60 * 60 * duration
        }
        if (unit.startsWith("day")) {
            return 24 * 60 * 60 * duration
        }
        return null;
    }

    public static IcalToEventParameters(ical: CalendarComponent, organizer: Person, attributeTo: Actor): EventParameters {
        return {
            attributedToId: attributeTo,
            beginsOn: <Date>ical.start,
            endsOn: <Date>ical.end,
            description: <string>ical.description ?? "No description available",
            title: <string>ical?.summary,
            organizerActorId: organizer,


        }
    }


    /**
     *  Returns an estimate of the distance between the two given coordinates in meter
     *  Accuracy decreases with distance. Coordinates in WGS84
     * @constructor
     */
    public static DistanceEstimateInMeter(coordinate1: { lat: number, lon: number },
                                   coordinate2: { lat: number, lon: number }): number {
        const lat1Rad = (coordinate1.lat / 180) * Math.PI;
        const lon1Rad = (coordinate1.lon / 180) * Math.PI;
        const lat2Rad = (coordinate2.lat / 180) * Math.PI;
        const lon2Rad = (coordinate2.lon / 180) * Math.PI;

        const x = (lon2Rad - lon1Rad) * Math.cos((lat1Rad + lat2Rad) / 2.0);
        const y = lat2Rad - lat1Rad;

        return Math.sqrt(x * x + y * y) * Utils.RadiusOfEarth;
    }

    /**
     * Walks the 'source'-object to every leaf of the object.
     * If the leaf at the same location in the 'comparison'-object is different, an object is returned with the changes.
     * Returns null if no differences are found
     * @param source
     * @param comparison
     */
    public static difference(source: any, comparison: any) : any | null{

        if(source?.toISOString !== undefined){
            source = source.toISOString()
            if(typeof comparison === "string"){
                comparison = new Date(comparison)
            }
        }
        if(comparison?.toISOString !== undefined){
            comparison = comparison.toISOString()
        }


        if(typeof source === "object"){
            if(source == comparison){
                // Comparison by reference indicated that this is the same object
                return null;
            }
            if(comparison == undefined || comparison == null){
                return source
            }

            const diff = {}
            let hasDiff = false;
            for (const sourceKey in source) {
                if(sourceKey.endsWith("Id")){
                    const key = sourceKey.substring(0, sourceKey.length - 2)
                    const comparisonId = comparison[key]?.id
                    if(source[sourceKey].id === comparisonId){
                        continue
                    }
                }
                
                let keyDiff : any;
                if(sourceKey === "description"){
                    // Mobilizon injects html-attributes.
                    // We strip them here
                    const el = document.createElement("div")
                    el.innerHTML = comparison[sourceKey]
                    const sourceDescr = source[sourceKey].trim()
                    const comparisonDescr = el.textContent.trim()
                    keyDiff = Utils.difference(sourceDescr, comparisonDescr)
                }else{
                    keyDiff = Utils.difference(source[sourceKey], comparison[sourceKey])
                }
                if(keyDiff === null){
                    continue
                }
                diff[sourceKey] = keyDiff
                hasDiff = true
            }
            if(hasDiff){
                return diff
            }else{
                return null
            }
        }else{
            if(source === undefined && comparison === null){
                return null;
            }
              if(source === comparison){
                return null;
            }
            return source ;
        }
        
    }
}