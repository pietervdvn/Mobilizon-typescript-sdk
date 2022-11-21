import {MobilizonInstance} from "./src/Instance";

async function main() {
    const instance = new MobilizonInstance("https://mobilizon.openstreetmap.fr")
    const locations = await instance.searchLocation("Eiffel Tower, France")
    console.log(locations)
    const group = "osmcal"
    const events = await instance.FetchGroup(group)
    console.log("Group '"+group+"' organizes",events.organizedEvents.elements.length,"events in total:", events.organizedEvents.elements[0])
}

main().then(_ => console.log("Done")).catch(err => console.error("ERROR:" , err))