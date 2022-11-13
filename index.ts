import * as fs from "fs";
import {AuthorizedInstance, MobilizonInstance} from "./lib/Instance";
import {Utils} from "./lib/Utils";
import * as fakedom from "fake-dom"
import {Group} from "./src/graphql-types";
import {IcalPoster} from "./bot/IcalPoster";

interface Config {
    email: string,
    password: string,
    server: string
}

export default class Main {


    async main(args: string[]) {
        
       
        if (fakedom === undefined || document === undefined) {
            throw "FakeDom not initialized"
        }
        console.log("Mobilizon importer 0.0.1")
        console.log("Arguments:", args)
        const configfilepath = args[0] ?? "config.json"
        const config: Config = JSON.parse(fs.readFileSync(configfilepath, "utf8"))

        const instance = new MobilizonInstance(config.server)

        let authInstance: AuthorizedInstance
        try {

            authInstance = await instance.login(config.email, config.password)

        } catch (e) {
            if ((<any>e).toString() === "User not found") {
                console.log("User not found; creating user now")
                await instance.CreateAccount(config.email, config.password)
                console.warn("You should have received a confirmation email on " + config.email + ", please click it and then run this script again")
                return
            }
            throw e
        }
        const userinfo = await authInstance.GetUserInfo()

        console.log("This bot has to following profiles: ", userinfo.map(i => i.preferredUsername).join(", "))
        const memberships = await authInstance.GetGroupMemberships()

        const invitedTo = memberships.filter(group => group.role === "INVITED")
        for (const group of invitedTo) {
            await authInstance.AcceptInvite(group)
        }

        const linksToHandle: { frequency: number, tags: string[], link: string, group: Group }[] = []

        console.log("This bot is part of the following groups:")
        console.log("GROUPNAME \t| ROLE      \t| SUMMARY \t\t\t| ICAL-LINKS (reload every _n_ seconds)")
        for (const membership of memberships) {
            const div = document.createElement("p")
            div.innerHTML = membership.parent?.summary

            const allLinks = Array.from(div.getElementsByTagName("a")).filter(a => a.href.endsWith(".ical") || a.href.endsWith(".ics"))
            const withFreq = allLinks.map(a => ({
                frequency: Utils.extractFrequency(a.parentElement.textContent),
                link: a.href,
                tags: a.parentElement.textContent.split(" ").filter(s => s.startsWith("#"))
            }))
            console.log(
                [
                    membership.parent?.name,
                    membership.role,
                    div.textContent.substring(0, 31),
                    withFreq.map(a => a.link + " (" + a.frequency + "s, "+a.tags.join("")+")").join(" ")
                ].join("\t"))
                
              
            if (membership.role !== "MODERATOR" && membership.role !== "ADMINISTRATOR" && membership.role !== "CREATOR") {
                console.warn("    No rights to make changes to this group - not attempting to create events")
                continue
            }

            for (const withFreqElement of withFreq) {
                linksToHandle.push({
                    ...withFreqElement,
                    group: membership.parent
                })
            }
        }


        for (const icalToHandle of linksToHandle) {
            const icalData = await Utils.Download(icalToHandle.link)
            await new IcalPoster(authInstance, userinfo[0], icalToHandle.tags, icalToHandle.group).PostAllEvents(icalData)
        }


    }
}

new Main().main(process.argv.slice(2))
    .catch(e => console.log("ERROR: error message is: " + e.toString().substring(0, 500)))
    .then(() => console.log("All done!"));