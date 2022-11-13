import * as https from "https";
import {CalendarComponent} from "ical"
import {EventParameters} from "./Instance";
import {Actor, Person} from "../src/graphql-types";
import * as Buffer from "buffer";

export class Utils {
    private static readonly E = 0.00000000000001;
    private static readonly RadiusOfEarth = 6371000;

    public static async DownloadJson(url: string, headers?: any, method: "GET" | "POST" = "GET"): Promise<any> {
        return JSON.parse((await this.Download(url, headers, method)))
    }

    public static Post(url: string, body: string | any, headers?: any): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                let bodyStr: string;
                if (typeof body === "string") {
                    bodyStr = body
                } else {
                    bodyStr = JSON.stringify(body);
                }
                headers = headers ?? {}
                headers["accept"] = "application/json"
                headers["Content-Type"] = "application/json";
                // Use 'Blob' to determine the size in bytes. Some characters (e.g. é, ç, ... take up two bytes)
                headers["Content-Length"] = new Blob([bodyStr]).size 
                const urlObj = new URL(url)
                const req = https.request(
                    {
                        host: urlObj.host,
                        path: urlObj.pathname + urlObj.search,
                        method: "POST",
                        port: urlObj.port,
                        headers: headers,
                    
                    },
                    (res) => {
                        const parts: string[] = []
                        res.setEncoding("utf8")
                        res.on("data", function (chunk) {
                            parts.push(chunk)
                        })

                        res.addListener("end", function () {
                            resolve(parts.join(""))
                        })
                    }
                )
                req.write(bodyStr)
                req.end()
            } catch (e) {
                reject(e)
            }
        })
    }

    /**
     * Extracts a duration from an english string, returns the total amount of seconds.
     *
     * Utils.extractFrequency("Imports the feed from https://example.org/calendar.ics every 15 minutes") // => 15 * 60
     * Utils.extractFrequency("Imports the feed from https://example.org/calendar.ics every hour") // => 1 * 60 * 60
     * Utils.extractFrequency("Imports the feed from https://example.org/calendar.ics every 2 hours") // => 2 * 60 * 60
     * Utils.extractFrequency("Imports the feed from https://example.org/calendar.ics every day") // => 24 * 60 * 60
     */
    public static extractFrequency(textContent: string) {
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
        return 0;
    }

    public static IcalToEventParameters(ical: CalendarComponent, organizer: Person, attributeTo: Actor): EventParameters {
        return {
            attributedToId: attributeTo,
            beginsOn: <Date>ical.start,
            endsOn: <Date>ical.end,
            description: <string>ical.description,
            title: <string>ical?.summary,
            organizerActorId: organizer,


        }
    }


    /// <summary>
    ///
    /// </summary>
    /// <param name="coordinate1">The first coordinate in WGS84</param>
    /// <param name="coordinate2">The second coordinate in WGS84</param>

    public static Download(url: string, headers ?: any, method: "GET" | "POST" = "GET"    ):
        Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                headers = headers ?? {}
                headers.accept = "application/json"
                console.log(" > ScriptUtils.DownloadJson(", url, ")")
                const urlObj = new URL(url)
                https.get(
                    {
                        host: urlObj.host,
                        path: urlObj.pathname + urlObj.search,
                        method,
                        port: urlObj.port,
                        headers: headers,

                    },
                    (res) => {
                        const parts: string[] = []
                        res.setEncoding("utf8")
                        res.on("data", function (chunk) {
                            // @ts-ignore
                            parts.push(chunk)
                        })

                        res.addListener("end", function () {
                            resolve(parts.join(""))
                        })
                    }
                )
            } catch (e) {
                reject(e)
            }
        })
    }

    /// <remarks>Accuracy decreases with distance.</remarks>
    /**
     *  Returns an estimate of the distance between the two given coordinates in meter
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
}