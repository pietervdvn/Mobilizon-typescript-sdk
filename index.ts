import * as fs from "fs";
import {MobilizonInstance} from "./lib/Instance";
import {Group, Person} from "./src/graphql-types";
import {Utils} from "./lib/Utils";
import * as ical from "ical"

interface Config {
    email: string,
    password: string,
    server: string
}

export default class Main {

    async main(args: string[]) {
        console.log("Mobilizon importer 0.0.1")
        console.log("Arguments:", args)
        const configfilepath = args[0] ?? "config.json"
        const config: Config = JSON.parse(fs.readFileSync(configfilepath, "utf8"))

        const instance = new MobilizonInstance(config.server)
        const authInstance = await instance.login(config.email, config.password)
        const memberships = await authInstance.GetGroupMemberships()
        const testgroup: Group = <any>memberships.find(m => m.parent?.preferredUsername == "pietervdvn_test_group")?.parent
        console.log("Posting in group:", testgroup?.preferredUsername)
        const info = await authInstance.GetUserInfo()
        const alias = <Person>info.find(alias => !alias.name?.endsWith("-bot"))
        console.log("Posting as ", JSON.stringify(alias))


        const icalData = await Utils.Download("https://osmcal.org/events.ics")
        // Calendar = object which maps ID --> CalendarComponent
        const calendar = <any>ical.parseICS(icalData)

        for (const calendarKey in calendar) {
            const eventIcal = calendar[calendarKey]
            const event = Utils.IcalToEventParameters(eventIcal, alias, testgroup)
            try {
                console.log("Inspecting ", event.title)
                if(event.beginsOn === undefined){
                    console.log("Skipping ",event.title,", no start time given")

                    continue
                }
                if(new Date().getTime() > event.beginsOn.getTime()){
                    console.log("Skipping ",event.title,", it's in the past")
                    continue
                }
                if (await authInstance.AlreadyExists(event)) {
                    console.log("Already exists:", event.title)
                    continue
                }
                await authInstance.CreateEvent(event)
                console.log("Created event ", event.title)
            } catch (e) {
                console.error("ERROR while inspecting "+ event.title+" "+ e)
            }
        }

        /*
        await authInstance.CreateEvent(
            {
                attributedToId: testgroup, 
                organizerActorId: alias,
                beginsOn: new Date(2023,4,1,12,0,0),
                description: "This is a test event, please ignore",
                title: "Test event",
                endsOn: new Date(2023,4,1,13,0,0),

            }
        )//*/
        //console.log(JSON.stringify(memberships, null, "  "))
        //   console.log(await authInstance.GetInfo())
    }
}

new Main().main(process.argv.slice(2))
    .catch(e => console.log("ERROR: error message is: " + e.toString().substring(0, 500)))
    .then(() => console.log("All done!"));