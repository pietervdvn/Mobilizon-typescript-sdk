import {
    Actor,
    Address,
    AddressInput,
    Contact,
    Event,
    EventCategory,
    EventJoinOptions,
    EventMetadataInput,
    EventOptionsInput,
    EventStatus,
    EventVisibility,
    Group,
    MediaInput,
    Member,
    Person,
    RootMutationTypeUpdateEventArgs
} from "./Definitions";
import fetch from "node-fetch";
import {Blob} from 'buffer';

export class MobilizonInstance {
    private readonly _api: string;
    private personEventCache?: { beginsOn: string, id: string, title: string }[] = undefined
    private personEventCacheMoment: Date = new Date()

    constructor(api: string) {
        if (!api.endsWith("/")) {
            api += "/"
        }
        if (!api.endsWith("api/")) {
            api += "api/"
        }
        this._api = api;
    }

    /**
     * Logs in with the email address and password of given user; returns an authorized instance
     */
    async login(email: string, password: string): Promise<AuthorizedInstance> {

        const connectToAuthQ = {
            "operationName": "Login",
            "variables": {
                email,
                password
            },
            "query": "mutation Login($email: String!, $password: String!) {\n login(email: $email, password: $password) { accessToken refreshToken user { id email role __typename } __typename\n }\n}\n"
        };
        const responseBody = await this.ApiFetch(connectToAuthQ);
        return new AuthorizedInstance(this._api, responseBody.login.accessToken);
    }

    /**
     * Ask the instance to search for a location
     *
     * const instance = new MobilizonInstance("https://demo.mobilizon.org")
     * const result : any = await instance.searchLocation("Ecoliving VZW", "nl")
     * result[0]["geom"] // => "3.2349621;51.2101117"
     */
    async searchLocation(searchText: string, locale: string = "en"): Promise<(Address)[]> {

        const query = {
            "operationName": "SearchAddress",
            "variables": {"query": searchText},
            "query": `query SearchAddress($query: String!, $type: AddressSearchType) {
  searchAddress(query: $query, type: $type) { ...AdressFragment} } fragment AdressFragment on Address { id  description  geom
  street
  locality
  postalCode
  region
  country
  }
`
        }
        let responseBody = await this.ApiFetch(query)
        return responseBody.searchAddress;
    }

    /**
     * How much events are stored on this server?
     */
    async GetEventCount(): Promise<number> {
        const query = `query {
 events(limit: 0) {
  total
 }
 }`
        const reponse = await this.ApiFetch({
            query
        })
        return Number.parseInt(reponse.events.total)
    }

    /**
     * Fetches `maxCount` events
     * @param maxCount
     */
    async fetchEvents(maxCount: number = 10): Promise<Event[]> {
        const query = `query {
 events(limit: ${maxCount}) {
  elements {
  id,
  title,
  description,
  url,
  beginsOn,
  endsOn,
  picture {
   url
  }
  },
  total
 }
 }`
        const reponse = await this.ApiFetch({
            query
        })
        return reponse.events.elements
    }

    public async FetchGroupEventTotal(groupname: string, afterdate?: Date, beforedate?: Date): Promise<number> {
        const query = {
            "operationName": "FetchGroup",
            "variables": {
                "name": groupname,
                "beforeDateTime": beforedate?.toISOString(),
                "afterDateTime": afterdate?.toISOString()
            },
            "query": `query FetchGroup($name: String!, $afterDateTime: DateTime, $beforeDateTime: DateTime, $organisedEventsPage: Int, $organisedEventsLimit: Int) {
 group(preferredUsername: $name) { ...GroupFullFields
 }
}

fragment GroupFullFields on Group {
 organizedEvents( afterDatetime: $afterDateTime beforeDatetime: $beforeDateTime page: $organisedEventsPage limit: $organisedEventsLimit) { total  }
}

`
        }
        const response: { group: Group } = (await this.ApiFetch(query))
        return response.group.organizedEvents.total
    }

    /**
     * Fetches the specified group information with _all_ group events
     * @param groupname
     * @param afterdate
     * @param beforedate
     * @constructor
     */
    public async FetchGroup(groupname: string, afterdate?: Date, beforedate?: Date): Promise<Group> {
        const eventCount = await this.FetchGroupEventTotal(groupname)
        const query = {
            "operationName": "FetchGroup",
            "variables": {
                "name": groupname,
                "beforeDateTime": beforedate?.toISOString(),
                "afterDateTime": afterdate?.toISOString(),
                organisedEventsLimit: eventCount
            },
            "query": `query FetchGroup($name: String!, $afterDateTime: DateTime, $beforeDateTime: DateTime, $organisedEventsPage: Int, $organisedEventsLimit: Int) {
 group(preferredUsername: $name) { ...GroupFullFields __typename
 }
}

fragment GroupFullFields on Group {
 ...ActorFragment
 organizedEvents( afterDatetime: $afterDateTime beforeDatetime: $beforeDateTime page: $organisedEventsPage limit: $organisedEventsLimit
 ) { elements { id uuid title beginsOn endsOn description status draft language options {  maximumAttendeeCapacity  __typename } participantStats {  participant  notApproved  __typename } attributedTo {  ...ActorFragment  __typename } organizerActor {  ...ActorFragment  __typename } picture {  id  url  __typename } physicalAddress {  ...AdressFragment  __typename } options {  ...EventOptions  __typename } tags {  ...TagFragment  __typename } __typename }
 }
}

fragment ActorFragment on Actor {
 id
 avatar { id url }
 banner { id url }
 type
 preferredUsername
 name
 domain
 summary
 url
 __typename
}

fragment AdressFragment on Address {
 id
 description
 geom
 street
 locality
 postalCode
 region
 country
 type
 url
 originId
 timezone
 __typename
}

fragment EventOptions on EventOptions {
 maximumAttendeeCapacity
 remainingAttendeeCapacity
 showRemainingAttendeeCapacity
 anonymousParticipation
 showStartTime
 showEndTime
 timezone
 offers { price priceCurrency url __typename
 }
 participationConditions { title content url __typename
 }
 attendees
 program
 commentModeration
 showParticipationPrice
 hideOrganizerWhenGroupEvent
 isOnline
 __typename
}

fragment TagFragment on Tag {
 id
 slug
 title
 __typename
}

`
        }
        return (await this.ApiFetch(query)).group
    }

    /**
     * Create a new account. An account gives you the rights to access the service, but an account managers multiple _profiles_
     * Most account will only have one profile though
     * @param email: the email address to register with
     * @param password: the password to login
     * @constructor
     */
    public async CreateAccount(email: string, password: string): Promise<void> {
        const query = {
            "operationName": "CreateUser",
            "variables": {email, password},
            "query": "mutation CreateUser($email: String!, $password: String!, $locale: String) {\n createUser(email: $email, password: $password, locale: $locale) { email confirmationSentAt __typename\n }\n}\n"
        }

        // Set up the account - this will send the confirmation email
        await this.ApiFetch(query)
    }


    public async FetchPersonEvents(person: Person): Promise<{ beginsOn: string, id: string, title: string }[]> {
        const cacheAgeSecs = Math.abs(this.personEventCacheMoment.getTime() - new Date().getTime()) / 1000
        if (cacheAgeSecs > 60) {
            this.personEventCache = undefined
        }

        if (this.personEventCache !== undefined) {
            return this.personEventCache
        }
        const response = await this.ApiFetch({
            query: "query {fetchPerson(preferredUsername: \"" + person.preferredUsername + "\" ) {id organizedEvents {elements { id title beginsOn }}}}"
        })

        const result = response.fetchPerson.organizedEvents.elements
        this.personEventCache = result
        this.personEventCacheMoment = new Date()
        return result
    }


    protected async ApiFetch(body: any | string, authToken?: string): Promise<any> {
        if (typeof body !== "string") {
            body = JSON.stringify(body)
        }
        const headers = <any>{
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sec-gpc": "1",
            "Content-Type": "application/json",
            // Use 'Blob' to determine the size in bytes. Some characters (e.g. é, ç, ... take up two bytes)
            "Content-Length": new Blob([body]).size
        }
        if (authToken) {
            headers["authorization"] = "Bearer " + authToken;
        }

        const response = await fetch(this._api, {
            method: 'POST',
            headers,
            body
        })
        const txt = await response.text()
        let result: any;
        try {
            result = JSON.parse(txt)

        } catch (e) {
            throw "Could not parse response: " + txt
        }

        if (result.errors) {
            throw result.errors
        }
        return result.data
    }
}

export interface EventParameters {
    title: string;
    description: string;
    attributedToId: Actor;
    organizerActorId: Actor;
    beginsOn: Date;
    endsOn?: Date,
    category?: EventCategory;
    contacts?: Contact[];
    draft?: boolean;
    joinOptions?: EventJoinOptions;
    language?: string;
    metadata?: Array<EventMetadataInput>;
    onlineAddress?: string;
    options?: EventOptionsInput;
    phoneAddress?: string;
    physicalAddress?: AddressInput;
    picture?: MediaInput;
    status?: EventStatus;
    tags?: string[];
    visibility?: EventVisibility;
}

class EventParametersUtils {

    public static ParametersToRootParameters(params: EventParameters): RootMutationTypeUpdateEventArgs {
        if (params.title === undefined || params.title === "") {
            throw "Invalid title"
        }
        return {
            eventId: "",
            title: params.title,
            description: params.description,
            attributedToId: params.attributedToId.id,
            organizerActorId: params.organizerActorId.id,
            beginsOn: params.beginsOn?.toISOString(),
            endsOn: params.endsOn?.toISOString(),
            category: params.category,
            contacts: params.contacts,
            draft: params.draft,
            joinOptions: params.joinOptions,
            language: params.language,
            metadata: params.metadata,
            onlineAddress: params.onlineAddress,
            options: params.options,
            phoneAddress: params.phoneAddress,
            physicalAddress: params.physicalAddress,
            picture: params.picture,
            status: params.status,
            tags: params.tags,
            visibility: params.visibility,

        }
    }

}

/**
 * An instance where the user is logged in.
 */
export class AuthorizedInstance extends MobilizonInstance {

    private readonly _authToken: string | undefined = undefined;

    constructor(api: string, authToken: string) {
        super(api);
        this._authToken = authToken;
    }

    public async GetGroupMemberships(): Promise<Member[]> {

        const membershipsQuery = {
            "operationName": "LoggedUserMemberships",
            "variables": {"page": 1, "limit": 30},
            "query": "query LoggedUserMemberships($page: Int, $limit: Int) { loggedUser {id memberships(page: $page, limit: $limit) { total elements {  id  role  actor {  id avatar {   id   url   __typename  }  preferredUsername  name  domain  __typename  }  parent {  id summary preferredUsername  domain  name  type  avatar {   id   url   __typename  }  organizedEvents {   elements {   id   title   picture {    id    url    __typename   }   __typename   }   total   __typename  }  __typename  }  invitedBy {  id  preferredUsername  domain  name  avatar {   id   url   __typename  }  __typename  }  __typename } __typename } __typename\n }\n}\n"
        };

        const response = await this.ApiFetch(membershipsQuery)
        return response.loggedUser.memberships.elements;
    }

    /**
     * Accepts an invitation to a group.
     * This is modeled with a 'membership' which one joins
     * @param membership
     * @constructor
     */
    public async AcceptInvite(membership: Member) {
        const query = {
            "operationName": "AcceptInvitation",
            "variables": {"id": membership.id},
            "query": "mutation AcceptInvitation($id: ID!) {\n  acceptInvitation(id: $id) {\n    ...MemberFragment\n    __typename\n  }\n}\n\nfragment MemberFragment on Member {\n  id\n  role\n  parent {\n    ...ActorFragment\n    __typename\n  }\n  actor {\n    ...ActorFragment\n    __typename\n  }\n  insertedAt\n  __typename\n}\n\nfragment ActorFragment on Actor {\n  id\n  avatar {\n    id\n    url\n    __typename\n  }\n  type\n  preferredUsername\n  name\n  domain\n  summary\n  url\n  __typename\n}\n"
        }
        await this.ApiFetch(query)
        console.log("Invitation by " + membership.invitedBy?.preferredUsername + " to join group " + membership.parent?.name + " has been accepted")
    }

    /**
     * Lists all the identities of the logged in user
     */
    public async GetUserInfo(): Promise<Person[]> {
        const getInfoQ = {
            "operationName": null,
            "variables": {},
            "query": "{\n identities { id avatar { id url __typename } type preferredUsername name __typename}}"
        };
        return (await this.ApiFetch(getInfoQ)).identities
    }

    public async AlreadyExists(information: EventParameters): Promise<boolean> {
        const variables = EventParametersUtils.ParametersToRootParameters(information)
        const previousEvents: { beginsOn?: string, title?: string }[] = await this.FetchPersonEvents(information.organizerActorId)
        if (information.attributedToId) {
            // const previousGroupEvents = await this.FetchGroupFetchGroupEvents(information.attributedToId.name, new Date())
            // previousEvents.push(...(previousGroupEvents.organizedEvents.elements ?? []))
        }
        for (const previousEvent of previousEvents) {
            const datediff = <any>new Date(previousEvent.beginsOn) - <any>information.beginsOn
            if (datediff == 0 && previousEvent.title === variables.title) {
                return true
            }
        }
        return false;
    }

    public async CreateEvent(information: EventParameters) {
        const variables = EventParametersUtils.ParametersToRootParameters(information)
        if (await this.AlreadyExists(information)) {
            throw "Event already exists: " + information.title
        }


        const createEvent = {
            variables,
            operationName: "createEvent",
            query:
                `mutation createEvent($organizerActorId: ID!, $attributedToId: ID, $title: String!, $description: String!, $beginsOn: DateTime!, $endsOn: DateTime, $status: EventStatus, $visibility: EventVisibility, $joinOptions: EventJoinOptions, $draft: Boolean, $tags: [String], $picture: MediaInput, $onlineAddress: String, $phoneAddress: String, $category: EventCategory, $physicalAddress: AddressInput, $options: EventOptionsInput, $contacts: [Contact]) {
     createEvent( organizerActorId: $organizerActorId
      attributedToId: $attributedToId
      title: $title
      description: $description
      beginsOn: $beginsOn
      endsOn: $endsOn 
      status: $status 
      visibility: $visibility 
      joinOptions: $joinOptions 
      draft: $draft 
      tags: $tags 
      picture: $picture 
      onlineAddress: $onlineAddress 
      phoneAddress: $phoneAddress 
      category: $category 
      physicalAddress: $physicalAddress 
      options: $options 
      contacts: $contacts 
      ) {
       id
       uuid
       title
       url
       local
       description
       beginsOn
       endsOn
       status
       visibility
       joinOptions
       draft
       picture { id }
       publishAt
       category
       onlineAddress
       phoneAddress
       physicalAddress {
        description
        street
        locality
        postalCode
        region
        country
        geom
        type
        id
        originId
        __typename
       }
       attributedTo {
        id
        domain
        name
        url
        preferredUsername
        avatar {
        id
        url
        __typename
        }
        __typename
       }
       organizerActor {
        avatar {
        id
        url
        __typename
        }
        preferredUsername
        domain
        name
        url
        id
        __typename
       }
       contacts {
        avatar {
        id
        url
        __typename
        }
        preferredUsername
        domain
        name
        url
        id
        __typename
       }
       participantStats {
        going
        notApproved
        participant
        __typename
       }
       tags {
        id
        slug
        title
        __typename
       }
       options {
        maximumAttendeeCapacity
        remainingAttendeeCapacity
        showRemainingAttendeeCapacity
        anonymousParticipation
        showStartTime
        showEndTime
        offers {
        price
        priceCurrency
        url
        __typename
        }
        participationConditions {
        title
        content
        url
        __typename
        }
        attendees
        program
        commentModeration
        showParticipationPrice
        hideOrganizerWhenGroupEvent
        __typename
       }
       __typename}}`
        };

        return await this.ApiFetch(createEvent)
    }

    public async UpdateEvent(id: string, event: EventParameters) {
        if(id === null){
            throw "Id may not be null to update an event"
        }
        //  "physicalAddress":{"country":"Belgium","description":"Muntpunt Café","locality":"Brussels","postalCode":"1000","region":"Brussels-Capital","street":"2 Rue Léopold - Leopoldstraat","type":"house","id":null,"originId":"nominatim:4138936385","url":null,"geom":"4.3542569;50.8491801","timezone":"Europe/Brussels"},
        //            
/*
        const updateExample : EventParameters = {
            "id": "14161",
            "title": "OpenStreetMap meetup in Brussels",
            "description": "Let&#39;s build a community with everybody interested in OpenStreetMap! \n \nThe target audience is everybody! From hearing the word OpenStreetMap a few seconds ago to the total expert in no time. There will be someone you can discuss and have a drink with we’re an interational community speaking English, Dutch, French so come join us!\nEvent Website: <a href=\"https://www.meetup.com/openstreetmap-belgium/events/289850800/\" target=\"_blank\" rel=\"noopener noreferrer ugc\">https://www.meetup.com/openstreetmap-belgium/events/289850800/</a>",
            "beginsOn":new Date( "2022-12-20T17:00:00.000Z"),
            "endsOn": new Date("2022-12-20T19:00:00.000Z"),
            "status": "CONFIRMED",
            "category": "MEETING",
            "visibility": "PUBLIC",
            "joinOptions": "FREE",
            "draft": false,
            "tags": [
                "openstreetmap",
                "osmcal"
            ],
            "onlineAddress": null,
            "phoneAddress": null,
            "physicalAddress": {
                "country": "Belgium",
                "description": "Muntpunt Café",
                "locality": "Brussels",
                "postalCode": "1000",
                "region": "Brussels-Capital",
                "street": "2 Rue Léopold - Leopoldstraat",
                "type": "house",
                "id": null,
                "originId": "nominatim:4138936385",
                "url": null,
                "geom": "4.3542569;50.8491801",
                "timezone": "Europe/Brussels"
            },
            "options": {
                "maximumAttendeeCapacity": null,
                "remainingAttendeeCapacity": null,
                "showRemainingAttendeeCapacity": null,
                "anonymousParticipation": true,
                "showStartTime": true,
                "showEndTime": true,
                "timezone": "Europe/Brussels",
                "offers": [],
                "participationConditions": null,
                "attendees": null,
                "program": null,
                "commentModeration": null,
                "showParticipationPrice": null,
                "hideOrganizerWhenGroupEvent": false,
                "isOnline": false
            },
            "metadata": [
                {
                    "key": "mz:accessibility:wheelchairAccessible",
                    "value": "fully",
                    "type": "STRING"
                }
            ],
            "attributedToId": "409107",
            "contacts": [],
            "organizerActorId": "409104"
        };//*/
        const variables = {...event, id, organizerActorId: event.organizerActorId.id}
        
        const blacklist = ["__typename","avatar","banner","domain","id","name","organizedEvents","preferredUsername","summary","type","url"]
        for (const key of blacklist) {
            delete variables[key]
        }
        const query = {
            "operationName": "updateEvent",
            "variables": variables,
            "query": "mutation updateEvent(" +
                "$id: ID!, " +
                "$title: String, " +
                "$description: String, " +
                "$beginsOn: DateTime, " +
                "$endsOn: DateTime, " +
                "$status: EventStatus, " +
                "$visibility: EventVisibility, " +
                "$joinOptions: EventJoinOptions, " +
                "$draft: Boolean, " +
                "$tags: [String], " +
                "$picture: MediaInput, " +
                "$onlineAddress: String, " +
                "$phoneAddress: String, " +
                "$organizerActorId: ID, " +
                "$attributedToId: ID, " +
                "$category: EventCategory, " +
                "$physicalAddress: AddressInput, " +
                "$options: EventOptionsInput, " +
                "$contacts: [Contact], " +
                "$metadata: [EventMetadataInput])" +
                " {\n  updateEvent(\n    eventId: $id\n    title: $title\n    description: $description\n    beginsOn: $beginsOn\n    endsOn: $endsOn\n    status: $status\n    visibility: $visibility\n    joinOptions: $joinOptions\n    draft: $draft\n    tags: $tags\n    picture: $picture\n    onlineAddress: $onlineAddress\n    phoneAddress: $phoneAddress\n    organizerActorId: $organizerActorId\n    attributedToId: $attributedToId\n    category: $category\n    physicalAddress: $physicalAddress\n    options: $options\n    contacts: $contacts\n    metadata: $metadata\n  ) {\n    ...FullEvent\n    __typename\n  }\n}\n\nfragment FullEvent on Event {\n  id\n  uuid\n  url\n  local\n  title\n  description\n  beginsOn\n  endsOn\n  status\n  visibility\n  joinOptions\n  draft\n  language\n  category\n  picture {\n    id\n    url\n    name\n    metadata {\n      width\n      height\n      blurhash\n      __typename\n    }\n    __typename\n  }\n  publishAt\n  onlineAddress\n  phoneAddress\n  physicalAddress {\n    ...AdressFragment\n    __typename\n  }\n  organizerActor {\n    ...ActorFragment\n    __typename\n  }\n  contacts {\n    ...ActorFragment\n    __typename\n  }\n  attributedTo {\n    ...ActorFragment\n    __typename\n  }\n  participantStats {\n    going\n    notApproved\n    participant\n    __typename\n  }\n  tags {\n    ...TagFragment\n    __typename\n  }\n  relatedEvents {\n    id\n    uuid\n    title\n    beginsOn\n    status\n    language\n    picture {\n      id\n      url\n      name\n      metadata {\n        width\n        height\n        blurhash\n        __typename\n      }\n      __typename\n    }\n    physicalAddress {\n      ...AdressFragment\n      __typename\n    }\n    organizerActor {\n      ...ActorFragment\n      __typename\n    }\n    attributedTo {\n      ...ActorFragment\n      __typename\n    }\n    options {\n      ...EventOptions\n      __typename\n    }\n    tags {\n      ...TagFragment\n      __typename\n    }\n    __typename\n  }\n  options {\n    ...EventOptions\n    __typename\n  }\n  metadata {\n    key\n    title\n    value\n    type\n    __typename\n  }\n  __typename\n}\n\nfragment AdressFragment on Address {\n  id\n  description\n  geom\n  street\n  locality\n  postalCode\n  region\n  country\n  type\n  url\n  originId\n  timezone\n  pictureInfo {\n    url\n    author {\n      name\n      url\n      __typename\n    }\n    source {\n      name\n      url\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment TagFragment on Tag {\n  id\n  slug\n  title\n  __typename\n}\n\nfragment EventOptions on EventOptions {\n  maximumAttendeeCapacity\n  remainingAttendeeCapacity\n  showRemainingAttendeeCapacity\n  anonymousParticipation\n  showStartTime\n  showEndTime\n  timezone\n  offers {\n    price\n    priceCurrency\n    url\n    __typename\n  }\n  participationConditions {\n    title\n    content\n    url\n    __typename\n  }\n  attendees\n  program\n  commentModeration\n  showParticipationPrice\n  hideOrganizerWhenGroupEvent\n  isOnline\n  __typename\n}\n\nfragment ActorFragment on Actor {\n  id\n  avatar {\n    id\n    url\n    __typename\n  }\n  type\n  preferredUsername\n  name\n  domain\n  summary\n  url\n  __typename\n}\n"
        }
        
        await this.ApiFetch(query)
    }

    public async DeleteEvent(eventId: string): Promise<void> {
        const query =
            {
                "operationName": "DeleteEvent",
                "variables": {eventId},
                "query": "mutation DeleteEvent($eventId: ID!) {\n deleteEvent(eventId: $eventId) { id __typename\n }\n}"
            }
        await this.ApiFetch(query)
    }

    ApiFetch(body: any | string): Promise<any | { errors: { code: string, message: string }[] }> {
        return super.ApiFetch(body, this._authToken)
    }


    /**
     * Create a _profile_ for the given account
     * @param email: the email address to register with
     * @param displayname: the name that other humans will see
     * @param name: the name that is used as handle. Should match [a-z_]+
     * @param bio: a short description of yourself
     * @constructor
     */
    public async RegisterProfile(email: string, displayname: string, name: string, bio: string): Promise<Person> {
        const query2 = {
            "variables": {
                "email": email,
                "name": displayname,
                "preferredUsername": name,
                "summary": bio
            },
            "query": "mutation ($preferredUsername: String!, $name: String!, $summary: String!, $email: String!) {\n registerPerson( preferredUsername: $preferredUsername name: $name summary: $summary email: $email\n ) { ...ActorFragment __typename\n }\n}\n\nfragment ActorFragment on Actor {\n id\n avatar { id url __typename\n }\n type\n preferredUsername\n name\n domain\n summary\n url\n __typename\n}\n"
        }

        return (await this.ApiFetch(query2)).registerUser
    }

}