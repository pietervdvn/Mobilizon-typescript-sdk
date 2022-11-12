import * as https from "https";
import {CalendarComponent} from "ical"
import {EventParameters} from "./Instance";
import {Actor, Person} from "../src/graphql-types";

export class Utils {
    public static async DownloadJson(url: string, headers?: any, method: "GET" | "POST" = "GET"): Promise<any> {
        return JSON.parse((await this.Download(url, headers, method)))
    }

    public static Post(url: string, body: string | any, headers?: any): Promise< string > {
        return new Promise((resolve, reject) => {
            try {
                let bodyStr :string ;
                if(typeof body ==="string"){
                    bodyStr = body
                }else{
                    bodyStr = JSON.stringify(body);
                }
                headers = headers ?? {}
                headers["accept"] = "application/json"
                headers["Content-Type"] = "application/json";
                headers["Content-Length"] = bodyStr.length;
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
                            // @ts-ignore
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

    public static IcalToEventParameters(ical: CalendarComponent, organizer: Person, attributeTo: Actor): EventParameters{
        return {
            attributedToId: attributeTo , 
            beginsOn:<Date> ical.start,
            endsOn:<Date> ical.end,
            description: <string> ical.description,
            title: <string> ical?.summary,
            organizerActorId: organizer,
        }
    }
    
    public static Download(url: string, headers ?: any, method: "GET" | "POST" = "GET", body: any = undefined
    ):
        Promise< string> {
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
                            resolve (parts.join(""))
                        })
                    }
                )
            } catch (e) {
                reject(e)
            }
        })
    }
}