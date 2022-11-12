import {Utils} from "./Utils";
import {EventParameters} from "./Instance";
import {Actor} from "../src/graphql-types";

export interface Location {
    short?: string,
    detailed?: string,
    /**
     * Lon, lat
     */
    coords: [number, number],
    venue: string
}

/**
 * Date object, with start date, end date (optional), human date (preferred way of display, localized) and indication, whether the event is a full-day event (`whole_day`)."
 */
export interface OsmCalDate {
   
    "start":string,
    "end"?: string,
    "human":string,
    "human_short":string,
    "whole_day":false | boolean
}

export interface OsmCalEvent {

    "name": string
    "url": string,
    "date": OsmCalDate,
    "location"?: Location,
    "cancelled"?: false | boolean
}

export class OsmCal {

    public static GetEvents(): Promise<OsmCalEvent[]> {
        return Utils.DownloadJson("https://osmcal.org/api/v2/events/", {"Client-App": "pietervdvn's-mobilizon-syncer"})
    }



}