export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a date and time in the UTC
   * timezone. The DateTime appears in a JSON response as an ISO8601 formatted
   * string, including UTC timezone ("Z"). The parsed date and time string will
   * be converted to UTC if there is an offset.
   */
  DateTime: any;
  /**
   * The `Point` scalar type represents Point geographic information compliant string data,
   * represented as floats separated by a semi-colon. The geodetic system is WGS 84
   */
  Point: any;
  /**
   * The `UUID` scalar type represents UUID4 compliant string data, represented as UTF-8
   * character sequences. The UUID4 type is most often used to represent unique
   * human-readable ID strings.
   */
  UUID: any;
  /**
   * The `Naive DateTime` scalar type represents a naive date and time without
   * timezone. The DateTime appears in a JSON response as an ISO8601 formatted
   * string.
   */
  NaiveDateTime: any;
  /** Represents an uploaded file. */
  Upload: any;
}

/** Root Query */
export interface RootQueryType {
  __typename?: 'RootQueryType';
  /** Get the list of action logs */
  actionLogs?: Maybe<PaginatedActionLogList>;
  /** Get admin settings */
  adminSettings?: Maybe<AdminSettings>;
  /** Get the instance config */
  config?: Maybe<Config>;
  /** Get dashboard information */
  dashboard?: Maybe<Dashboard>;
  /** Get a discussion */
  discussion?: Maybe<Discussion>;
  /** Get an event by uuid */
  event?: Maybe<Event>;
  /** Get all events */
  events?: Maybe<PaginatedEventList>;
  /** Get a person by its (federated) username */
  fetchPerson?: Maybe<Person>;
  /** Get a group by its ID */
  getGroup?: Maybe<Group>;
  /** Get a group by its preferred username */
  group?: Maybe<Group>;
  /** Get a group by its preferred username */
  groupById?: Maybe<Group>;
  /** Get all groups */
  groups?: Maybe<PaginatedGroupList>;
  /** Get the persons for an user */
  identities?: Maybe<Array<Maybe<Person>>>;
  /** Get an instance's details */
  instance?: Maybe<Instance>;
  /** List instances */
  instances?: Maybe<PaginatedInstanceList>;
  /** Interact with an URI */
  interact?: Maybe<Interactable>;
  /** List the instance's supported languages */
  languages?: Maybe<Array<Maybe<Language>>>;
  /** Get the current actor for the logged-in user */
  loggedPerson?: Maybe<Person>;
  /** Get the current user */
  loggedUser?: Maybe<User>;
  /** Get a media */
  media?: Maybe<Media>;
  /** Get a person by its ID */
  person?: Maybe<Person>;
  /** List the profiles */
  persons?: Maybe<PaginatedPersonList>;
  /** Get a post */
  post?: Maybe<Post>;
  /** List the relay followers */
  relayFollowers?: Maybe<PaginatedFollowerList>;
  /** List the relay followings */
  relayFollowings?: Maybe<PaginatedFollowerList>;
  /** Get a report by id */
  report?: Maybe<Report>;
  /** Get all reports */
  reports?: Maybe<PaginatedReportList>;
  /** Get a resource */
  resource?: Maybe<Resource>;
  /** Reverse geocode coordinates */
  reverseGeocode?: Maybe<Array<Maybe<Address>>>;
  /** Search for an address */
  searchAddress?: Maybe<Array<Maybe<Address>>>;
  /** Search events */
  searchEvents?: Maybe<Events>;
  /** Search groups */
  searchGroups?: Maybe<Groups>;
  /** Search persons */
  searchPersons?: Maybe<Persons>;
  /** Get the instance statistics */
  statistics?: Maybe<Statistics>;
  /** Get the list of tags */
  tags: Array<Maybe<Tag>>;
  /** Get replies for thread */
  thread?: Maybe<Array<Maybe<Comment>>>;
  /** Get a todo */
  todo?: Maybe<Todo>;
  /** Get a todo list */
  todoList?: Maybe<TodoList>;
  /** Get an user */
  user?: Maybe<User>;
  /** List instance users */
  users?: Maybe<Users>;
}


/** Root Query */
export interface RootQueryTypeActionLogsArgs {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}


/** Root Query */
export interface RootQueryTypeDiscussionArgs {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
}


/** Root Query */
export interface RootQueryTypeEventArgs {
  uuid: Scalars['UUID'];
}


/** Root Query */
export interface RootQueryTypeEventsArgs {
  direction?: InputMaybe<SortDirection>;
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EventOrderBy>;
  page?: InputMaybe<Scalars['Int']>;
}


/** Root Query */
export interface RootQueryTypeFetchPersonArgs {
  preferredUsername: Scalars['String'];
}


/** Root Query */
export interface RootQueryTypeGetGroupArgs {
  id: Scalars['ID'];
}


/** Root Query */
export interface RootQueryTypeGroupArgs {
  preferredUsername: Scalars['String'];
}


/** Root Query */
export interface RootQueryTypeGroupByIdArgs {
  id: Scalars['ID'];
}


/** Root Query */
export interface RootQueryTypeGroupsArgs {
  domain?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  local?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  preferredUsername?: InputMaybe<Scalars['String']>;
  suspended?: InputMaybe<Scalars['Boolean']>;
}


/** Root Query */
export interface RootQueryTypeInstanceArgs {
  domain: Scalars['ID'];
}


/** Root Query */
export interface RootQueryTypeInstancesArgs {
  direction?: InputMaybe<Scalars['String']>;
  filterDomain?: InputMaybe<Scalars['String']>;
  filterFollowStatus?: InputMaybe<InstanceFilterFollowStatus>;
  filterSuspendStatus?: InputMaybe<InstanceFilterSuspendStatus>;
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<InstancesSortFields>;
  page?: InputMaybe<Scalars['Int']>;
}


/** Root Query */
export interface RootQueryTypeInteractArgs {
  uri: Scalars['String'];
}


/** Root Query */
export interface RootQueryTypeLanguagesArgs {
  codes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
}


/** Root Query */
export interface RootQueryTypeMediaArgs {
  id: Scalars['ID'];
}


/** Root Query */
export interface RootQueryTypePersonArgs {
  id: Scalars['ID'];
}


/** Root Query */
export interface RootQueryTypePersonsArgs {
  domain?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  local?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  preferredUsername?: InputMaybe<Scalars['String']>;
  suspended?: InputMaybe<Scalars['Boolean']>;
}


/** Root Query */
export interface RootQueryTypePostArgs {
  slug: Scalars['String'];
}


/** Root Query */
export interface RootQueryTypeRelayFollowersArgs {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}


/** Root Query */
export interface RootQueryTypeRelayFollowingsArgs {
  direction?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
}


/** Root Query */
export interface RootQueryTypeReportArgs {
  id: Scalars['ID'];
}


/** Root Query */
export interface RootQueryTypeReportsArgs {
  domain?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<ReportStatus>;
}


/** Root Query */
export interface RootQueryTypeResourceArgs {
  path: Scalars['String'];
  username: Scalars['String'];
}


/** Root Query */
export interface RootQueryTypeReverseGeocodeArgs {
  latitude: Scalars['Float'];
  locale?: InputMaybe<Scalars['String']>;
  longitude: Scalars['Float'];
  zoom?: InputMaybe<Scalars['Int']>;
}


/** Root Query */
export interface RootQueryTypeSearchAddressArgs {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  query: Scalars['String'];
  type?: InputMaybe<AddressSearchType>;
}


/** Root Query */
export interface RootQueryTypeSearchEventsArgs {
  beginsOn?: InputMaybe<Scalars['DateTime']>;
  category?: InputMaybe<Scalars['String']>;
  endsOn?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
  location?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  radius?: InputMaybe<Scalars['Float']>;
  tags?: InputMaybe<Scalars['String']>;
  term?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<EventType>;
}


/** Root Query */
export interface RootQueryTypeSearchGroupsArgs {
  excludeMyGroups?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  location?: InputMaybe<Scalars['String']>;
  minimumVisibility?: InputMaybe<GroupVisibility>;
  page?: InputMaybe<Scalars['Int']>;
  radius?: InputMaybe<Scalars['Float']>;
  term?: InputMaybe<Scalars['String']>;
}


/** Root Query */
export interface RootQueryTypeSearchPersonsArgs {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  term?: InputMaybe<Scalars['String']>;
}


/** Root Query */
export interface RootQueryTypeTagsArgs {
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}


/** Root Query */
export interface RootQueryTypeThreadArgs {
  id: Scalars['ID'];
}


/** Root Query */
export interface RootQueryTypeTodoArgs {
  id: Scalars['ID'];
}


/** Root Query */
export interface RootQueryTypeTodoListArgs {
  id: Scalars['ID'];
}


/** Root Query */
export interface RootQueryTypeUserArgs {
  id: Scalars['ID'];
}


/** Root Query */
export interface RootQueryTypeUsersArgs {
  currentSignInIp?: InputMaybe<Scalars['String']>;
  direction?: InputMaybe<SortDirection>;
  email?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SortableUserField>;
}

/** A paginated list of action logs */
export interface PaginatedActionLogList {
  __typename?: 'PaginatedActionLogList';
  /** A list of action logs */
  elements?: Maybe<Array<Maybe<ActionLog>>>;
  /** The total number of action logs in the list */
  total?: Maybe<Scalars['Int']>;
}

/** An action log */
export interface ActionLog {
  __typename?: 'ActionLog';
  /** The action that was done */
  action?: Maybe<ActionLogAction>;
  /** The actor that acted */
  actor?: Maybe<Actor>;
  /** Internal ID for this comment */
  id?: Maybe<Scalars['ID']>;
  /** The time when the action was performed */
  insertedAt?: Maybe<Scalars['DateTime']>;
  /** The object that was acted upon */
  object?: Maybe<ActionLogObject>;
}

/** The different types of action log actions */
export type ActionLogAction =
  /** An actor was suspended */
  | 'ACTOR_SUSPENSION'
  /** An actor was unsuspended */
  | 'ACTOR_UNSUSPENSION'
  /** A comment was deleted */
  | 'COMMENT_DELETION'
  /** An event was deleted */
  | 'EVENT_DELETION'
  /** An event was updated */
  | 'EVENT_UPDATE'
  /** A note was created on a report */
  | 'NOTE_CREATION'
  /** A note was deleted on a report */
  | 'NOTE_DELETION'
  /** The report was closed */
  | 'REPORT_UPDATE_CLOSED'
  /** The report was opened */
  | 'REPORT_UPDATE_OPENED'
  /** The report was resolved */
  | 'REPORT_UPDATE_RESOLVED'
  /** An user was deleted */
  | 'USER_DELETION';

/** An ActivityPub actor */
export interface Actor {
  /** The actor's avatar media */
  avatar?: Maybe<Media>;
  /** The actor's banner media */
  banner?: Maybe<Media>;
  /** The actor's domain if (null if it's this instance) */
  domain?: Maybe<Scalars['String']>;
  /** Number of followers for this actor */
  followersCount?: Maybe<Scalars['Int']>;
  /** Number of actors following this actor */
  followingCount?: Maybe<Scalars['Int']>;
  /** Internal ID for this actor */
  id?: Maybe<Scalars['ID']>;
  /** If the actor is from this instance */
  local?: Maybe<Scalars['Boolean']>;
  /** Whether the actors manually approves followers */
  manuallyApprovesFollowers?: Maybe<Scalars['Boolean']>;
  /** The total size of the media from this actor */
  mediaSize?: Maybe<Scalars['Int']>;
  /** The actor's displayed name */
  name?: Maybe<Scalars['String']>;
  /** The actor's preferred username */
  preferredUsername?: Maybe<Scalars['String']>;
  /** The actor's summary */
  summary?: Maybe<Scalars['String']>;
  /** If the actor is suspended */
  suspended?: Maybe<Scalars['Boolean']>;
  /** The type of Actor (Person, Group,…) */
  type?: Maybe<ActorType>;
  /** The ActivityPub actor's URL */
  url?: Maybe<Scalars['String']>;
}

/** A media */
export interface Media {
  __typename?: 'Media';
  /** The media's alternative text */
  alt?: Maybe<Scalars['String']>;
  /** The media's detected content type */
  contentType?: Maybe<Scalars['String']>;
  /** The media's ID */
  id?: Maybe<Scalars['ID']>;
  /** The media's metadata */
  metadata?: Maybe<MediaMetadata>;
  /** The media's name */
  name?: Maybe<Scalars['String']>;
  /** The media's size */
  size?: Maybe<Scalars['Int']>;
  /** The media's full URL */
  url?: Maybe<Scalars['String']>;
}

/** Some metadata associated with a media */
export interface MediaMetadata {
  __typename?: 'MediaMetadata';
  /** The media blurhash (if a picture */
  blurhash?: Maybe<Scalars['String']>;
  /** The media width (if a height) */
  height?: Maybe<Scalars['Int']>;
  /** The media width (if a picture) */
  width?: Maybe<Scalars['Int']>;
}

/** The list of types an actor can be */
export type ActorType =
  /** An ActivityPub Application */
  | 'APPLICATION'
  /** An ActivityPub Group */
  | 'GROUP'
  /** An ActivityPub Organization */
  | 'ORGANIZATION'
  /** An ActivityPub Person */
  | 'PERSON'
  /** An ActivityPub Service */
  | 'SERVICE';

/** The objects that can be in an action log */
export interface ActionLogObject {
  /** Internal ID for this object */
  id?: Maybe<Scalars['ID']>;
}

/** Admin settings */
export interface AdminSettings {
  __typename?: 'AdminSettings';
  /** The instance's contact details */
  contact?: Maybe<Scalars['String']>;
  /** The instance's description */
  instanceDescription?: Maybe<Scalars['String']>;
  /** The instance's languages */
  instanceLanguages?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The instance's long description */
  instanceLongDescription?: Maybe<Scalars['String']>;
  /** The instance's name */
  instanceName?: Maybe<Scalars['String']>;
  /** The instance's privacy policy body text */
  instancePrivacyPolicy?: Maybe<Scalars['String']>;
  /** The instance's privacy policy type */
  instancePrivacyPolicyType?: Maybe<InstancePrivacyType>;
  /** The instance's privacy policy URL */
  instancePrivacyPolicyUrl?: Maybe<Scalars['String']>;
  /** The instance's rules */
  instanceRules?: Maybe<Scalars['String']>;
  /** The instance's slogan */
  instanceSlogan?: Maybe<Scalars['String']>;
  /** The instance's terms body text */
  instanceTerms?: Maybe<Scalars['String']>;
  /** The instance's terms type */
  instanceTermsType?: Maybe<InstanceTermsType>;
  /** The instance's terms URL */
  instanceTermsUrl?: Maybe<Scalars['String']>;
  /** Whether the registrations are opened */
  registrationsOpen?: Maybe<Scalars['Boolean']>;
}

/** The acceptable values for the instance privacy policy type */
export type InstancePrivacyType =
  /** Custom privacy policy text */
  | 'CUSTOM'
  /** Privacy policy will be set to Mobilizon's default privacy policy */
  | 'DEFAULT'
  /** An URL. Users will be redirected to this URL. */
  | 'URL';

/** The acceptable values for the instance's terms type */
export type InstanceTermsType =
  /** Custom terms text */
  | 'CUSTOM'
  /** Terms will be set to Mobilizon's default terms */
  | 'DEFAULT'
  /** An URL. Users will be redirected to this URL. */
  | 'URL';

/** A config object */
export interface Config {
  __typename?: 'Config';
  /** Configuration for diverse analytics services */
  analytics?: Maybe<Array<Maybe<Analytics>>>;
  /** The instance's anonymous action settings */
  anonymous?: Maybe<Anonymous>;
  /** The instance auth methods */
  auth?: Maybe<Auth>;
  /** The instance's contact details */
  contact?: Maybe<Scalars['String']>;
  /** The country code from the IP */
  countryCode?: Maybe<Scalars['String']>;
  /** Whether the demo mode is enabled */
  demoMode?: Maybe<Scalars['Boolean']>;
  /** The instance's short description */
  description?: Maybe<Scalars['String']>;
  /** The instance list of event categories possibilities */
  eventCategories?: Maybe<Array<Maybe<EventCategoryOption>>>;
  /** The instance list of export formats */
  exportFormats?: Maybe<ExportFormats>;
  /** The instance's features */
  features?: Maybe<Features>;
  /** Whether this instance is federation */
  federating?: Maybe<Scalars['Boolean']>;
  /** The instance's geocoding settings */
  geocoding?: Maybe<Geocoding>;
  /** The instance's feed settings */
  instanceFeeds?: Maybe<InstanceFeeds>;
  /** The instance's admins languages */
  languages?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The IP's location */
  location?: Maybe<Lonlat>;
  /** The instance's long description */
  longDescription?: Maybe<Scalars['String']>;
  /** The instance's maps settings */
  maps?: Maybe<Maps>;
  /** The instance's name */
  name?: Maybe<Scalars['String']>;
  /** The instance's privacy policy */
  privacy?: Maybe<Privacy>;
  /** Whether the registration are on an allowlist */
  registrationsAllowlist?: Maybe<Scalars['Boolean']>;
  /** Whether the registrations are opened */
  registrationsOpen?: Maybe<Scalars['Boolean']>;
  /** The instance's enabled resource providers */
  resourceProviders?: Maybe<Array<Maybe<ResourceProvider>>>;
  /** The instance's restrictions */
  restrictions?: Maybe<Restrictions>;
  /** The instance's rules */
  rules?: Maybe<Scalars['String']>;
  /** The instance's slogan */
  slogan?: Maybe<Scalars['String']>;
  /** The instance's terms */
  terms?: Maybe<Terms>;
  /** The instance's available timezones */
  timezones?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The configuration for upload limits */
  uploadLimits?: Maybe<UploadLimits>;
  /** The instance's version */
  version?: Maybe<Scalars['String']>;
  /** Web Push settings for the instance */
  webPush?: Maybe<WebPush>;
}


/** A config object */
export interface ConfigPrivacyArgs {
  locale?: InputMaybe<Scalars['String']>;
}


/** A config object */
export interface ConfigTermsArgs {
  locale?: InputMaybe<Scalars['String']>;
}

export interface Analytics {
  __typename?: 'Analytics';
  /** A list of key-values configuration */
  configuration?: Maybe<Array<Maybe<AnalyticsConfiguration>>>;
  /** Whether the service is activated or not */
  enabled?: Maybe<Scalars['Boolean']>;
  /** ID of the analytics service */
  id?: Maybe<Scalars['String']>;
}

export interface AnalyticsConfiguration {
  __typename?: 'AnalyticsConfiguration';
  /** The key for the analytics configuration element */
  key?: Maybe<Scalars['String']>;
  /** The analytics configuration type */
  type?: Maybe<AnalyticsConfigurationType>;
  /** The value for the analytics configuration element */
  value?: Maybe<Scalars['String']>;
}

export type AnalyticsConfigurationType =
  /** A boolean */
  | 'BOOLEAN'
  /** A float */
  | 'FLOAT'
  /** An integer */
  | 'INTEGER'
  /** A string */
  | 'STRING';

/** Instance anonymous configuration */
export interface Anonymous {
  __typename?: 'Anonymous';
  /** The actor ID that should be used to perform anonymous actions */
  actorId?: Maybe<Scalars['ID']>;
  /** The instance's anonymous event creation settings */
  eventCreation?: Maybe<AnonymousEventCreation>;
  /** The instance's anonymous participation settings */
  participation?: Maybe<AnonymousParticipation>;
  /** The instance's anonymous reports setting */
  reports?: Maybe<AnonymousReports>;
}

/** Instance anonymous event creation configuration */
export interface AnonymousEventCreation {
  __typename?: 'AnonymousEventCreation';
  /** Whether anonymous event creation is enabled */
  allowed?: Maybe<Scalars['Boolean']>;
  /** The methods to validate events created anonymously */
  validation?: Maybe<AnonymousEventCreationValidation>;
}

/** Instance anonymous event creation validation configuration */
export interface AnonymousEventCreationValidation {
  __typename?: 'AnonymousEventCreationValidation';
  /** The policy to validate anonymous event creations by captcha */
  captcha?: Maybe<AnonymousEventCreationValidationCaptcha>;
  /** The policy to validate anonymous event creations by email */
  email?: Maybe<AnonymousEventCreationValidationEmail>;
}

/** Instance anonymous event creation captcha validation configuration */
export interface AnonymousEventCreationValidationCaptcha {
  __typename?: 'AnonymousEventCreationValidationCaptcha';
  /** Whether anonymous event creation with validation by captcha is enabled */
  enabled?: Maybe<Scalars['Boolean']>;
}

/** Instance anonymous event creation email validation configuration */
export interface AnonymousEventCreationValidationEmail {
  __typename?: 'AnonymousEventCreationValidationEmail';
  /** Whether anonymous event creation with email validation is required */
  confirmationRequired?: Maybe<Scalars['Boolean']>;
  /** Whether anonymous event creation with email validation is enabled */
  enabled?: Maybe<Scalars['Boolean']>;
}

/** Instance anonymous participation configuration */
export interface AnonymousParticipation {
  __typename?: 'AnonymousParticipation';
  /** Whether anonymous participations are allowed */
  allowed?: Maybe<Scalars['Boolean']>;
  /** The ways to validate anonymous participations */
  validation?: Maybe<AnonymousParticipationValidation>;
}

/** Instance anonymous participation validation configuration */
export interface AnonymousParticipationValidation {
  __typename?: 'AnonymousParticipationValidation';
  /** The policy to validate anonymous participations by captcha */
  captcha?: Maybe<AnonymousParticipationValidationCaptcha>;
  /** The policy to validate anonymous participations by email */
  email?: Maybe<AnonymousParticipationValidationEmail>;
}

/** Instance anonymous participation with validation by captcha configuration */
export interface AnonymousParticipationValidationCaptcha {
  __typename?: 'AnonymousParticipationValidationCaptcha';
  /** Whether anonymous participation validation by captcha is enabled */
  enabled?: Maybe<Scalars['Boolean']>;
}

/** Instance anonymous participation with validation by email configuration */
export interface AnonymousParticipationValidationEmail {
  __typename?: 'AnonymousParticipationValidationEmail';
  /** Whether anonymous participation validation by email is required */
  confirmationRequired?: Maybe<Scalars['Boolean']>;
  /** Whether anonymous participation validation by email is enabled */
  enabled?: Maybe<Scalars['Boolean']>;
}

/** Instance anonymous reports */
export interface AnonymousReports {
  __typename?: 'AnonymousReports';
  /** Whether anonymous reports are allowed */
  allowed?: Maybe<Scalars['Boolean']>;
}

/** The instance's auth configuration */
export interface Auth {
  __typename?: 'Auth';
  /** Whether or not LDAP auth is enabled */
  ldap?: Maybe<Scalars['Boolean']>;
  /** List of oauth providers */
  oauthProviders?: Maybe<Array<Maybe<OauthProvider>>>;
}

/** An oAuth Provider */
export interface OauthProvider {
  __typename?: 'OauthProvider';
  /** The provider ID */
  id?: Maybe<Scalars['String']>;
  /** The label for the auth provider */
  label?: Maybe<Scalars['String']>;
}

/** Event categories list configuration */
export interface EventCategoryOption {
  __typename?: 'EventCategoryOption';
  /** The ID of the event category */
  id?: Maybe<Scalars['String']>;
  /** The translated name of the event category */
  label?: Maybe<Scalars['String']>;
}

/** Export formats configuration */
export interface ExportFormats {
  __typename?: 'ExportFormats';
  /** The list of formats the event participants can be exported to */
  eventParticipants?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** The instance's features */
export interface Features {
  __typename?: 'Features';
  /** Whether event creation is allowed on this instance */
  eventCreation?: Maybe<Scalars['Boolean']>;
  /** Whether groups are activated on this instance */
  groups?: Maybe<Scalars['Boolean']>;
}

/** Instance geocoding configuration */
export interface Geocoding {
  __typename?: 'Geocoding';
  /** Whether autocomplete in address fields can be enabled */
  autocomplete?: Maybe<Scalars['Boolean']>;
  /** The geocoding provider */
  provider?: Maybe<Scalars['String']>;
}

export interface InstanceFeeds {
  __typename?: 'InstanceFeeds';
  /** Whether the instance-wide feeds are enabled */
  enabled?: Maybe<Scalars['Boolean']>;
}

/** Geographic coordinates */
export interface Lonlat {
  __typename?: 'Lonlat';
  /** The coordinates latitude */
  latitude?: Maybe<Scalars['Float']>;
  /** The coordinates longitude */
  longitude?: Maybe<Scalars['Float']>;
}

/** Instance maps configuration */
export interface Maps {
  __typename?: 'Maps';
  /** The instance's maps routing configuration */
  routing?: Maybe<Routing>;
  /** The instance's maps tiles configuration */
  tiles?: Maybe<Tiles>;
}

/** Instance map routing configuration */
export interface Routing {
  __typename?: 'Routing';
  /** The instance's routing type */
  type?: Maybe<RoutingType>;
}

export type RoutingType =
  /** Redirect to Google Maps's direction endpoint */
  | 'GOOGLE_MAPS'
  /** Redirect to openstreetmap.org's direction endpoint */
  | 'OPENSTREETMAP';

/** Instance map tiles configuration */
export interface Tiles {
  __typename?: 'Tiles';
  /** The instance's tiles attribution text */
  attribution?: Maybe<Scalars['String']>;
  /** The instance's tiles endpoint */
  endpoint?: Maybe<Scalars['String']>;
}

/** The instance's privacy policy configuration */
export interface Privacy {
  __typename?: 'Privacy';
  /** The instance's privacy policy body text */
  bodyHtml?: Maybe<Scalars['String']>;
  /** The instance's privacy policy type */
  type?: Maybe<InstancePrivacyType>;
  /** The instance's privacy policy URL */
  url?: Maybe<Scalars['String']>;
}

/** A resource provider details */
export interface ResourceProvider {
  __typename?: 'ResourceProvider';
  /** The resource provider's endpoint */
  endpoint?: Maybe<Scalars['String']>;
  /** The resource provider's software */
  software?: Maybe<Scalars['String']>;
  /** The resource provider's type */
  type?: Maybe<Scalars['String']>;
}

/** The instance's restrictions */
export interface Restrictions {
  __typename?: 'Restrictions';
  /** Whether groups creation is allowed only for admin, not for all users */
  onlyAdminCanCreateGroups?: Maybe<Scalars['Boolean']>;
  /** Whether events creation is allowed only for groups, not for persons */
  onlyGroupsCanCreateEvents?: Maybe<Scalars['Boolean']>;
}

/** The instance's terms configuration */
export interface Terms {
  __typename?: 'Terms';
  /** The instance's terms body text */
  bodyHtml?: Maybe<Scalars['String']>;
  /** The instance's terms type */
  type?: Maybe<InstanceTermsType>;
  /** The instance's terms URL. */
  url?: Maybe<Scalars['String']>;
}

/** An upload limits configuration */
export interface UploadLimits {
  __typename?: 'UploadLimits';
  /** The avatar limitation, in bytes */
  avatar?: Maybe<Scalars['Int']>;
  /** The banner limitation, in bytes */
  banner?: Maybe<Scalars['Int']>;
  /** The default limitation, in bytes */
  default?: Maybe<Scalars['Int']>;
}

export interface WebPush {
  __typename?: 'WebPush';
  /** Whether the WebPush feature is enabled */
  enabled?: Maybe<Scalars['Boolean']>;
  /** The server's public WebPush VAPID key */
  publicKey?: Maybe<Scalars['String']>;
}

/** Dashboard information */
export interface Dashboard {
  __typename?: 'Dashboard';
  /** Last public group created */
  lastGroupCreated?: Maybe<Group>;
  /** Last public event published */
  lastPublicEventPublished?: Maybe<Event>;
  /** The number of local comments */
  numberOfComments?: Maybe<Scalars['Int']>;
  /** The number of total confirmed participations to local events */
  numberOfConfirmedParticipationsToLocalEvents?: Maybe<Scalars['Int']>;
  /** The number of local events */
  numberOfEvents?: Maybe<Scalars['Int']>;
  /** The number of instance followers */
  numberOfFollowers?: Maybe<Scalars['Int']>;
  /** The number of instance followings */
  numberOfFollowings?: Maybe<Scalars['Int']>;
  /** The number of local groups */
  numberOfGroups?: Maybe<Scalars['Int']>;
  /** The number of current opened reports */
  numberOfReports?: Maybe<Scalars['Int']>;
  /** The number of local users */
  numberOfUsers?: Maybe<Scalars['Int']>;
}

/** Represents a group of actors */
export interface Group extends ActionLogObject, ActivityObject, Actor, Interactable {
  __typename?: 'Group';
  /** The group activity */
  activity?: Maybe<PaginatedActivityList>;
  /** The actor's avatar media */
  avatar?: Maybe<Media>;
  /** The actor's banner media */
  banner?: Maybe<Media>;
  /** A list of the discussions for this group */
  discussions?: Maybe<PaginatedDiscussionList>;
  /** The actor's domain if (null if it's this instance) */
  domain?: Maybe<Scalars['String']>;
  /** A paginated list of the followers this group has */
  followers?: Maybe<PaginatedFollowerList>;
  /** Number of followers for this actor */
  followersCount?: Maybe<Scalars['Int']>;
  /** Number of actors following this actor */
  followingCount?: Maybe<Scalars['Int']>;
  /** Internal ID for this group */
  id?: Maybe<Scalars['ID']>;
  /** If the actor is from this instance */
  local?: Maybe<Scalars['Boolean']>;
  /** Whether the actors manually approves followers */
  manuallyApprovesFollowers?: Maybe<Scalars['Boolean']>;
  /** The total size of the media from this actor */
  mediaSize?: Maybe<Scalars['Int']>;
  /** A paginated list of group members */
  members?: Maybe<PaginatedMemberList>;
  /** The actor's displayed name */
  name?: Maybe<Scalars['String']>;
  /** Whether the group is opened to all or has restricted access */
  openness?: Maybe<Openness>;
  /** A list of the events this actor has organized */
  organizedEvents?: Maybe<PaginatedEventList>;
  /** The type of the event's address */
  physicalAddress?: Maybe<Address>;
  /** A paginated list of the posts this group has */
  posts?: Maybe<PaginatedPostList>;
  /** The actor's preferred username */
  preferredUsername?: Maybe<Scalars['String']>;
  /** A paginated list of the resources this group has */
  resources?: Maybe<PaginatedResourceList>;
  /** The actor's summary */
  summary?: Maybe<Scalars['String']>;
  /** If the actor is suspended */
  suspended?: Maybe<Scalars['Boolean']>;
  /** A paginated list of the todo lists this group has */
  todoLists?: Maybe<PaginatedTodoListList>;
  /** The type of Actor (Person, Group,…) */
  type?: Maybe<ActorType>;
  /** The type of group : Group, Community,… */
  types?: Maybe<GroupType>;
  /** The ActivityPub actor's URL */
  url?: Maybe<Scalars['String']>;
  /** Whether the group can be found and/or promoted */
  visibility?: Maybe<GroupVisibility>;
}


/** Represents a group of actors */
export interface GroupActivityArgs {
  author?: InputMaybe<ActivityAuthor>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<ActivityType>;
}


/** Represents a group of actors */
export interface GroupDiscussionsArgs {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}


/** Represents a group of actors */
export interface GroupFollowersArgs {
  approved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}


/** Represents a group of actors */
export interface GroupMembersArgs {
  limit?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  roles?: InputMaybe<Scalars['String']>;
}


/** Represents a group of actors */
export interface GroupOrganizedEventsArgs {
  afterDatetime?: InputMaybe<Scalars['DateTime']>;
  beforeDatetime?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}


/** Represents a group of actors */
export interface GroupPostsArgs {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}


/** Represents a group of actors */
export interface GroupResourcesArgs {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}


/** Represents a group of actors */
export interface GroupTodoListsArgs {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}

export interface ActivityObject {
  id?: Maybe<Scalars['ID']>;
}

/** A entity that can be interacted with from a remote instance */
export interface Interactable {
  /** A public URL for the entity */
  url?: Maybe<Scalars['String']>;
}

export type ActivityAuthor =
  /** Activities created by others */
  | 'BY'
  /** Activities created by the current actor */
  | 'SELF';

export type ActivityType =
  /** Activities concerning discussions */
  | 'DISCUSSION'
  /** Activities concerning events */
  | 'EVENT'
  /** Activities concerning group settings */
  | 'GROUP'
  /** Activities concerning members */
  | 'MEMBER'
  /** Activities concerning posts */
  | 'POST'
  /** Activities concerning resources */
  | 'RESOURCE';

/** A paginated list of activity items */
export interface PaginatedActivityList {
  __typename?: 'PaginatedActivityList';
  /** A list of activities */
  elements?: Maybe<Array<Maybe<Activity>>>;
  /** The total number of elements in the list */
  total?: Maybe<Scalars['Int']>;
}

export interface Activity {
  __typename?: 'Activity';
  author?: Maybe<Actor>;
  group?: Maybe<Group>;
  /** The activity item ID */
  id?: Maybe<Scalars['ID']>;
  /** When was the activity inserted */
  insertedAt?: Maybe<Scalars['DateTime']>;
  message?: Maybe<Scalars['String']>;
  messageParams?: Maybe<Array<Maybe<ActivityParamItem>>>;
  object?: Maybe<ActivityObject>;
  priority?: Maybe<Scalars['Int']>;
  subject?: Maybe<Scalars['String']>;
  subjectParams?: Maybe<Array<Maybe<ActivityParamItem>>>;
  type?: Maybe<ActivityType>;
}

export interface ActivityParamItem {
  __typename?: 'ActivityParamItem';
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
}

/** A paginated list of discussions */
export interface PaginatedDiscussionList {
  __typename?: 'PaginatedDiscussionList';
  /** A list of discussion */
  elements?: Maybe<Array<Maybe<Discussion>>>;
  /** The total number of discussions in the list */
  total?: Maybe<Scalars['Int']>;
}

/** A discussion */
export interface Discussion extends ActivityObject {
  __typename?: 'Discussion';
  /** This discussion's group */
  actor?: Maybe<Actor>;
  /** The comments for the discussion */
  comments?: Maybe<PaginatedCommentList>;
  /** This discussions's creator */
  creator?: Maybe<Person>;
  /** Internal ID for this discussion */
  id?: Maybe<Scalars['ID']>;
  /** When was this discussion's created */
  insertedAt?: Maybe<Scalars['DateTime']>;
  /** The last comment of the discussion */
  lastComment?: Maybe<Comment>;
  /** The slug for the discussion */
  slug?: Maybe<Scalars['String']>;
  /** The title for this discussion */
  title?: Maybe<Scalars['String']>;
  /** When was this discussion's updated */
  updatedAt?: Maybe<Scalars['DateTime']>;
}


/** A discussion */
export interface DiscussionCommentsArgs {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}

/** A paginated list of comments */
export interface PaginatedCommentList {
  __typename?: 'PaginatedCommentList';
  /** A list of comments */
  elements?: Maybe<Array<Maybe<Comment>>>;
  /** The total number of comments in the list */
  total?: Maybe<Scalars['Int']>;
}

/** A comment */
export interface Comment extends ActionLogObject, ActivityObject {
  __typename?: 'Comment';
  /** The comment's author */
  actor?: Maybe<Person>;
  /** When was the comment deleted */
  deletedAt?: Maybe<Scalars['DateTime']>;
  /** The eventual event this comment is under */
  event?: Maybe<Event>;
  /** Internal ID for this comment */
  id?: Maybe<Scalars['ID']>;
  /** The comment this comment directly replies to */
  inReplyToComment?: Maybe<Comment>;
  /** When was the comment inserted in database */
  insertedAt?: Maybe<Scalars['DateTime']>;
  /** Whether this comment needs to be announced to participants */
  isAnnouncement: Scalars['Boolean'];
  /** The comment language */
  language?: Maybe<Scalars['String']>;
  /** Whether this comment is local or not */
  local?: Maybe<Scalars['Boolean']>;
  /** The original comment that started the thread this comment is in */
  originComment?: Maybe<Comment>;
  /** The comment's primary language */
  primaryLanguage?: Maybe<Scalars['String']>;
  /** When was the comment published */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** A list of replies to the comment */
  replies?: Maybe<Array<Maybe<Comment>>>;
  /** The comment body */
  text?: Maybe<Scalars['String']>;
  /** The thread languages */
  threadLanguages: Array<Maybe<Scalars['String']>>;
  /** The number of total known replies to this comment */
  totalReplies?: Maybe<Scalars['Int']>;
  /** When was the comment updated */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** Comment URL */
  url?: Maybe<Scalars['String']>;
  /** An UUID for this comment */
  uuid?: Maybe<Scalars['UUID']>;
  /** The visibility for the comment */
  visibility?: Maybe<CommentVisibility>;
}

/** Represents a person identity */
export interface Person extends ActionLogObject, Actor {
  __typename?: 'Person';
  /** The actor's avatar media */
  avatar?: Maybe<Media>;
  /** The actor's banner media */
  banner?: Maybe<Media>;
  /** The actor's domain if (null if it's this instance) */
  domain?: Maybe<Scalars['String']>;
  /** A list of the feed tokens for this person */
  feedTokens?: Maybe<Array<Maybe<FeedToken>>>;
  /** Number of followers for this actor */
  followersCount?: Maybe<Scalars['Int']>;
  /** Number of actors following this actor */
  followingCount?: Maybe<Scalars['Int']>;
  /** The list of groups this person follows */
  follows?: Maybe<PaginatedFollowerList>;
  /** Internal ID for this person */
  id?: Maybe<Scalars['ID']>;
  /** If the actor is from this instance */
  local?: Maybe<Scalars['Boolean']>;
  /** Whether the actors manually approves followers */
  manuallyApprovesFollowers?: Maybe<Scalars['Boolean']>;
  /** The total size of the media from this actor */
  mediaSize?: Maybe<Scalars['Int']>;
  /** The list of groups this person is member of */
  memberOf?: Maybe<Array<Maybe<Member>>>;
  /** The list of groups this person is member of */
  memberships?: Maybe<PaginatedMemberList>;
  /** The actor's displayed name */
  name?: Maybe<Scalars['String']>;
  /** A list of the events this actor has organized */
  organizedEvents?: Maybe<PaginatedEventList>;
  /** The list of events this person goes to */
  participations?: Maybe<PaginatedParticipantList>;
  /** The actor's preferred username */
  preferredUsername?: Maybe<Scalars['String']>;
  /** The actor's summary */
  summary?: Maybe<Scalars['String']>;
  /** If the actor is suspended */
  suspended?: Maybe<Scalars['Boolean']>;
  /** The type of Actor (Person, Group,…) */
  type?: Maybe<ActorType>;
  /** The ActivityPub actor's URL */
  url?: Maybe<Scalars['String']>;
  /** The user this actor is associated to */
  user?: Maybe<User>;
}


/** Represents a person identity */
export interface PersonFollowsArgs {
  group?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}


/** Represents a person identity */
export interface PersonMembershipsArgs {
  group?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}


/** Represents a person identity */
export interface PersonOrganizedEventsArgs {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}


/** Represents a person identity */
export interface PersonParticipationsArgs {
  eventId?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}

/**
 * Represents a feed token
 *
 * Feed tokens are tokens that are used to provide access to private feeds such as WebCal feed for all of your user's events,
 * or an Atom feed for just a profile.
 */
export interface FeedToken {
  __typename?: 'FeedToken';
  /** The event which the actor participates in */
  actor?: Maybe<Actor>;
  /** A ShortUUID private token */
  token?: Maybe<Scalars['String']>;
  /** The actor that participates to the event */
  user?: Maybe<User>;
}

/** A local user of Mobilizon */
export interface User extends ActionLogObject {
  __typename?: 'User';
  /** The user's activity settings */
  activitySettings?: Maybe<Array<Maybe<ActivitySetting>>>;
  /** The user's list of profiles (identities) */
  actors: Array<Maybe<Person>>;
  /** The datetime the last activation/confirmation token was sent */
  confirmationSentAt?: Maybe<Scalars['DateTime']>;
  /** The account activation/confirmation token */
  confirmationToken?: Maybe<Scalars['String']>;
  /** The datetime when the user was confirmed/activated */
  confirmedAt?: Maybe<Scalars['DateTime']>;
  /** When the user currenlty signed-in */
  currentSignInAt?: Maybe<Scalars['DateTime']>;
  /** The IP adress the user's currently signed-in with */
  currentSignInIp?: Maybe<Scalars['String']>;
  /** The user's default actor */
  defaultActor?: Maybe<Person>;
  /** Whether the user is disabled */
  disabled?: Maybe<Scalars['Boolean']>;
  /** The list of draft events this user has created */
  drafts?: Maybe<Array<Maybe<Event>>>;
  /** The user's email */
  email: Scalars['String'];
  /** A list of the feed tokens for this user */
  feedTokens?: Maybe<Array<Maybe<FeedToken>>>;
  /** The suggested events from the groups this user follows */
  followedGroupEvents?: Maybe<PaginatedFollowedGroupEvents>;
  /** The user's ID */
  id?: Maybe<Scalars['ID']>;
  /** When the user previously signed-in */
  lastSignInAt?: Maybe<Scalars['DateTime']>;
  /** The IP adress the user previously sign-in with */
  lastSignInIp?: Maybe<Scalars['String']>;
  /** The user's locale */
  locale?: Maybe<Scalars['String']>;
  /** The user's media objects */
  media?: Maybe<PaginatedMediaList>;
  /** The total size of all the media from this user (from all their actors) */
  mediaSize?: Maybe<Scalars['Int']>;
  /** The list of memberships for this user */
  memberships?: Maybe<PaginatedMemberList>;
  /** The list of participations this user has */
  participations?: Maybe<PaginatedParticipantList>;
  /** The user's login provider */
  provider?: Maybe<Scalars['String']>;
  /** The datetime last reset password email was sent */
  resetPasswordSentAt?: Maybe<Scalars['DateTime']>;
  /** The token sent when requesting password token */
  resetPasswordToken?: Maybe<Scalars['String']>;
  /** The role for the user */
  role?: Maybe<UserRole>;
  /** The list of settings for this user */
  settings?: Maybe<UserSettings>;
}


/** A local user of Mobilizon */
export interface UserDraftsArgs {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}


/** A local user of Mobilizon */
export interface UserFollowedGroupEventsArgs {
  afterDatetime?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}


/** A local user of Mobilizon */
export interface UserMediaArgs {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}


/** A local user of Mobilizon */
export interface UserMembershipsArgs {
  limit?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
}


/** A local user of Mobilizon */
export interface UserParticipationsArgs {
  afterDatetime?: InputMaybe<Scalars['DateTime']>;
  beforeDatetime?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}

export interface ActivitySetting {
  __typename?: 'ActivitySetting';
  enabled?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['String']>;
  method?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
}

/** An event */
export interface Event extends ActionLogObject, ActivityObject, Interactable {
  __typename?: 'Event';
  /** Who the event is attributed to (often a group) */
  attributedTo?: Maybe<Actor>;
  /** Datetime for when the event begins */
  beginsOn?: Maybe<Scalars['DateTime']>;
  /** The event's category */
  category?: Maybe<EventCategory>;
  /** The comments in reply to the event */
  comments?: Maybe<Array<Maybe<Comment>>>;
  /** The events contacts */
  contacts?: Maybe<Array<Maybe<Actor>>>;
  /** The event's description */
  description?: Maybe<Scalars['String']>;
  /** Whether or not the event is a draft */
  draft?: Maybe<Scalars['Boolean']>;
  /** Datetime for when the event ends */
  endsOn?: Maybe<Scalars['DateTime']>;
  /** Internal ID for this event */
  id?: Maybe<Scalars['ID']>;
  /** When the event was created */
  insertedAt?: Maybe<Scalars['DateTime']>;
  /** The event's visibility */
  joinOptions?: Maybe<EventJoinOptions>;
  /** The event language */
  language?: Maybe<Scalars['String']>;
  /** Whether the event is local or not */
  local?: Maybe<Scalars['Boolean']>;
  /** The event's media */
  media?: Maybe<Array<Maybe<Media>>>;
  /** A key-value list of metadata */
  metadata?: Maybe<Array<Maybe<EventMetadata>>>;
  /** Online address of the event */
  onlineAddress?: Maybe<Scalars['String']>;
  /** The event options */
  options?: Maybe<EventOptions>;
  /** The event's organizer (as a person) */
  organizerActor?: Maybe<Actor>;
  /** The event's participants */
  participants?: Maybe<PaginatedParticipantList>;
  /** Statistics on the event */
  participantStats?: Maybe<ParticipantStats>;
  /** Phone address for the event */
  phoneAddress?: Maybe<Scalars['String']>;
  /** The event's physical address */
  physicalAddress?: Maybe<Address>;
  /** The event's picture */
  picture?: Maybe<Media>;
  /** When the event was published */
  publishAt?: Maybe<Scalars['DateTime']>;
  /** Events related to this one */
  relatedEvents?: Maybe<Array<Maybe<Event>>>;
  /** The event's description's slug */
  slug?: Maybe<Scalars['String']>;
  /** Status of the event */
  status?: Maybe<EventStatus>;
  /** The event's tags */
  tags?: Maybe<Array<Maybe<Tag>>>;
  /** The event's title */
  title?: Maybe<Scalars['String']>;
  /** When the event was last updated */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** The ActivityPub Event URL */
  url?: Maybe<Scalars['String']>;
  /** The Event UUID */
  uuid?: Maybe<Scalars['UUID']>;
  /** The event's visibility */
  visibility?: Maybe<EventVisibility>;
}


/** An event */
export interface EventParticipantsArgs {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  roles?: InputMaybe<Scalars['String']>;
}

export type EventCategory =
  | 'ARTS'
  | 'AUTO_BOAT_AIR'
  | 'BOOK_CLUBS'
  | 'BUSINESS'
  | 'CAUSES'
  | 'COMEDY'
  | 'COMMUNITY'
  | 'CRAFTS'
  | 'FAMILY_EDUCATION'
  | 'FASHION_BEAUTY'
  | 'FILM_MEDIA'
  | 'FOOD_DRINK'
  | 'GAMES'
  | 'HEALTH'
  | 'LANGUAGE_CULTURE'
  | 'LEARNING'
  | 'LGBTQ'
  | 'MEETING'
  | 'MOVEMENTS_POLITICS'
  | 'MUSIC'
  | 'NETWORKING'
  | 'OUTDOORS_ADVENTURE'
  | 'PARTY'
  | 'PERFORMING_VISUAL_ARTS'
  | 'PETS'
  | 'PHOTOGRAPHY'
  | 'SCIENCE_TECH'
  | 'SPIRITUALITY_RELIGION_BELIEFS'
  | 'SPORTS'
  | 'THEATRE';

/** The list of join options for an event */
export type EventJoinOptions =
  /** Anyone can join and is automatically accepted */
  | 'FREE'
  /** Participants must be invited */
  | 'INVITE'
  /** Manual acceptation */
  | 'RESTRICTED';

export interface EventMetadata {
  __typename?: 'EventMetadata';
  /** The key for the metadata */
  key?: Maybe<Scalars['String']>;
  /** The title for the metadata */
  title?: Maybe<Scalars['String']>;
  /** The metadata type */
  type?: Maybe<EventMetadataType>;
  /** The value for the metadata */
  value?: Maybe<Scalars['String']>;
}

export type EventMetadataType =
  /** A boolean */
  | 'BOOLEAN'
  /** An integer */
  | 'INTEGER'
  /** A string */
  | 'STRING';

/** Event options */
export interface EventOptions {
  __typename?: 'EventOptions';
  /** Whether or not to allow anonymous participation (if the server allows it) */
  anonymousParticipation?: Maybe<Scalars['Boolean']>;
  /** The list of special attendees */
  attendees?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The policy on public comment moderation under the event */
  commentModeration?: Maybe<EventCommentModeration>;
  /** Whether to show or hide the person organizer when event is organized by a group */
  hideOrganizerWhenGroupEvent?: Maybe<Scalars['Boolean']>;
  /** Whether the event is fully online */
  isOnline?: Maybe<Scalars['Boolean']>;
  /** The maximum attendee capacity for this event */
  maximumAttendeeCapacity?: Maybe<Scalars['Int']>;
  /** The list of offers to show for this event */
  offers?: Maybe<Array<Maybe<EventOffer>>>;
  /** The list of participation conditions to accept to join this event */
  participationConditions?: Maybe<Array<Maybe<EventParticipationCondition>>>;
  /** The list of the event */
  program?: Maybe<Scalars['String']>;
  /** The number of remaining seats for this event */
  remainingAttendeeCapacity?: Maybe<Scalars['Int']>;
  /** Show event end time */
  showEndTime?: Maybe<Scalars['Boolean']>;
  /** Whether or not to show the participation price */
  showParticipationPrice?: Maybe<Scalars['Boolean']>;
  /** Whether or not to show the number of remaining seats for this event */
  showRemainingAttendeeCapacity?: Maybe<Scalars['Boolean']>;
  /** Show event start time */
  showStartTime?: Maybe<Scalars['Boolean']>;
  /** The event's timezone */
  timezone?: Maybe<Scalars['String']>;
}

/** The list of possible options for the event's status */
export type EventCommentModeration =
  /** Anyone can comment under the event */
  | 'ALLOW_ALL'
  /** No one can comment except for the admin */
  | 'CLOSED'
  /** Every comment has to be moderated by the admin */
  | 'MODERATED';

/** An event offer */
export interface EventOffer {
  __typename?: 'EventOffer';
  /** The price amount for this offer */
  price?: Maybe<Scalars['Float']>;
  /** The currency for this price offer */
  priceCurrency?: Maybe<Scalars['String']>;
  /** The URL to access to this offer */
  url?: Maybe<Scalars['String']>;
}

/** An event participation condition */
export interface EventParticipationCondition {
  __typename?: 'EventParticipationCondition';
  /** The content for this condition */
  content?: Maybe<Scalars['String']>;
  /** The title for this condition */
  title?: Maybe<Scalars['String']>;
  /** The URL to access this condition */
  url?: Maybe<Scalars['String']>;
}

/** A paginated list of participants */
export interface PaginatedParticipantList {
  __typename?: 'PaginatedParticipantList';
  /** A list of participants */
  elements?: Maybe<Array<Maybe<Participant>>>;
  /** The total number of participants in the list */
  total?: Maybe<Scalars['Int']>;
}

/** Represents a participant to an event */
export interface Participant {
  __typename?: 'Participant';
  /** The actor that participates to the event */
  actor?: Maybe<Actor>;
  /** The event which the actor participates in */
  event?: Maybe<Event>;
  /** The participation ID */
  id?: Maybe<Scalars['ID']>;
  /** The datetime this participant was created */
  insertedAt?: Maybe<Scalars['DateTime']>;
  /** The metadata associated to this participant */
  metadata?: Maybe<ParticipantMetadata>;
  /** The role of this actor at this event */
  role?: Maybe<ParticipantRoleEnum>;
}

/** Metadata about a participant */
export interface ParticipantMetadata {
  __typename?: 'ParticipantMetadata';
  /** The eventual token to leave an event when user is anonymous */
  cancellationToken?: Maybe<Scalars['String']>;
  /** The participant's locale */
  locale?: Maybe<Scalars['String']>;
  /** The eventual message the participant left */
  message?: Maybe<Scalars['String']>;
}

/** The possible values for a participant role */
export type ParticipantRoleEnum =
  /** The participant is an event administrator */
  | 'ADMINISTRATOR'
  /** The participant is an event creator */
  | 'CREATOR'
  /** The participant is an event moderator */
  | 'MODERATOR'
  /** The participant has not been approved */
  | 'NOT_APPROVED'
  /** The participant has not confirmed their participation */
  | 'NOT_CONFIRMED'
  /** The participant is a regular participant */
  | 'PARTICIPANT'
  /** The participant has been rejected from this event */
  | 'REJECTED';

/** Participation statistics */
export interface ParticipantStats {
  __typename?: 'ParticipantStats';
  /** The number of administrators */
  administrator?: Maybe<Scalars['Int']>;
  /** The number of creators */
  creator?: Maybe<Scalars['Int']>;
  /** The number of approved participants */
  going?: Maybe<Scalars['Int']>;
  /** The number of moderators */
  moderator?: Maybe<Scalars['Int']>;
  /** The number of not approved participants */
  notApproved?: Maybe<Scalars['Int']>;
  /** The number of not confirmed participants */
  notConfirmed?: Maybe<Scalars['Int']>;
  /** The number of simple participants (excluding creators) */
  participant?: Maybe<Scalars['Int']>;
  /** The number of rejected participants */
  rejected?: Maybe<Scalars['Int']>;
}

/** An address object */
export interface Address {
  __typename?: 'Address';
  /** The address's country */
  country?: Maybe<Scalars['String']>;
  /** The address's description */
  description?: Maybe<Scalars['String']>;
  /** The geocoordinates for the point where this address is */
  geom?: Maybe<Scalars['Point']>;
  /** The address's ID */
  id?: Maybe<Scalars['ID']>;
  /** The address's locality */
  locality?: Maybe<Scalars['String']>;
  /** The address's original ID from the provider */
  originId?: Maybe<Scalars['String']>;
  /** The address's postal code */
  postalCode?: Maybe<Scalars['String']>;
  /** The address's region */
  region?: Maybe<Scalars['String']>;
  /** The address's street name (with number) */
  street?: Maybe<Scalars['String']>;
  /** The (estimated) timezone of the location */
  timezone?: Maybe<Scalars['String']>;
  /** The address's type */
  type?: Maybe<Scalars['String']>;
  /** The address's URL */
  url?: Maybe<Scalars['String']>;
}

/** The list of possible options for the event's status */
export type EventStatus =
  /** The event is cancelled */
  | 'CANCELLED'
  /** The event is confirmed */
  | 'CONFIRMED'
  /** The event is tentative */
  | 'TENTATIVE';

/** A tag */
export interface Tag {
  __typename?: 'Tag';
  /** The tag's ID */
  id?: Maybe<Scalars['ID']>;
  /** Related tags to this tag */
  related?: Maybe<Array<Maybe<Tag>>>;
  /** The tags's slug */
  slug?: Maybe<Scalars['String']>;
  /** The tag's title */
  title?: Maybe<Scalars['String']>;
}

/** The list of visibility options for an event */
export type EventVisibility =
  /** Visible only to people members of the group or followers of the person */
  | 'PRIVATE'
  /** Publicly listed and federated. Can be shared. */
  | 'PUBLIC'
  /** Visible only after a moderator accepted */
  | 'RESTRICTED'
  /** Visible only to people with the link - or invited */
  | 'UNLISTED';

/** A paginated list of follow group events */
export interface PaginatedFollowedGroupEvents {
  __typename?: 'PaginatedFollowedGroupEvents';
  /** A list of follow group events */
  elements?: Maybe<Array<Maybe<FollowedGroupEvent>>>;
  /** The total number of follow group events in the list */
  total?: Maybe<Scalars['Int']>;
}

/** A follow group event */
export interface FollowedGroupEvent {
  __typename?: 'FollowedGroupEvent';
  event?: Maybe<Event>;
  group?: Maybe<Group>;
  profile?: Maybe<Person>;
  user?: Maybe<User>;
}

/** A paginated list of medias */
export interface PaginatedMediaList {
  __typename?: 'PaginatedMediaList';
  /** The list of medias */
  elements?: Maybe<Array<Maybe<Media>>>;
  /** The total number of medias in the list */
  total?: Maybe<Scalars['Int']>;
}

/** A paginated list of members */
export interface PaginatedMemberList {
  __typename?: 'PaginatedMemberList';
  /** A list of members */
  elements?: Maybe<Array<Maybe<Member>>>;
  /** The total number of elements in the list */
  total?: Maybe<Scalars['Int']>;
}

/** Represents a member of a group */
export interface Member extends ActivityObject {
  __typename?: 'Member';
  /** Which profile is member of */
  actor?: Maybe<Person>;
  /** The member's ID */
  id?: Maybe<Scalars['ID']>;
  /** When was this member created */
  insertedAt?: Maybe<Scalars['NaiveDateTime']>;
  /** Who invited this member */
  invitedBy?: Maybe<Person>;
  /** Of which the profile is member */
  parent?: Maybe<Group>;
  /** The role of this membership */
  role?: Maybe<MemberRoleEnum>;
  /** When was this member updated */
  updatedAt?: Maybe<Scalars['NaiveDateTime']>;
}

/** Values for a member role */
export type MemberRoleEnum =
  /** The member is an administrator */
  | 'ADMINISTRATOR'
  /** The member was the creator of the group. Shouldn't be used. */
  | 'CREATOR'
  /** The member has been invited */
  | 'INVITED'
  /** Regular member */
  | 'MEMBER'
  /** The member is a moderator */
  | 'MODERATOR'
  /** The member needs to be approved by the group admins */
  | 'NOT_APPROVED'
  /** The member has been rejected or excluded from the group */
  | 'REJECTED';

/** The list of roles an user can have */
export type UserRole =
  /** Administrator role */
  | 'ADMINISTRATOR'
  /** Moderator role */
  | 'MODERATOR'
  /** User role */
  | 'USER';

/** A set of user settings */
export interface UserSettings {
  __typename?: 'UserSettings';
  /** When does the user receives a notification about new activity */
  groupNotifications?: Maybe<NotificationPendingEnum>;
  /** The user's preferred location, where they want to be suggested events */
  location?: Maybe<Location>;
  /** Whether this user will receive a notification right before event */
  notificationBeforeEvent?: Maybe<Scalars['Boolean']>;
  /** Whether this user will receive an weekly event recap */
  notificationEachWeek?: Maybe<Scalars['Boolean']>;
  /** Whether this user will receive an email at the start of the day of an event. */
  notificationOnDay?: Maybe<Scalars['Boolean']>;
  /** When does the user receives a notification about a new pending membership in one of the group they're admin for */
  notificationPendingMembership?: Maybe<NotificationPendingEnum>;
  /** When does the user receives a notification about new pending participations */
  notificationPendingParticipation?: Maybe<NotificationPendingEnum>;
  /** The timezone for this user */
  timezone?: Maybe<Scalars['String']>;
}

/** The list of values the for pending notification settings */
export type NotificationPendingEnum =
  /** Direct. The notification will be sent right away each time. */
  | 'DIRECT'
  /** None. The notification won't be sent. */
  | 'NONE'
  /** One day. Notifications will be sent at most each day */
  | 'ONE_DAY'
  /** One hour. Notifications will be sent at most each hour */
  | 'ONE_HOUR'
  /** One Week. Notifications will be sent at most each week */
  | 'ONE_WEEK';

export interface Location {
  __typename?: 'Location';
  /** A geohash representing the user's preferred location */
  geohash?: Maybe<Scalars['String']>;
  /** A string describing the user's preferred  location */
  name?: Maybe<Scalars['String']>;
  /** The range in kilometers the user wants to see events */
  range?: Maybe<Scalars['Int']>;
}

/** A paginated list of follower objects */
export interface PaginatedFollowerList {
  __typename?: 'PaginatedFollowerList';
  /** A list of followers */
  elements?: Maybe<Array<Maybe<Follower>>>;
  /** The total number of elements in the list */
  total?: Maybe<Scalars['Int']>;
}

/** Represents an actor's follower */
export interface Follower {
  __typename?: 'Follower';
  /** Which profile follows */
  actor?: Maybe<Actor>;
  /** Whether the follow has been approved by the target actor */
  approved?: Maybe<Scalars['Boolean']>;
  /** The follow ID */
  id?: Maybe<Scalars['ID']>;
  /** When the follow was created */
  insertedAt?: Maybe<Scalars['DateTime']>;
  /** Whether the follower will be notified by the target actor's activity or not (applicable for profile/group follows) */
  notify?: Maybe<Scalars['Boolean']>;
  /** What or who the profile follows */
  targetActor?: Maybe<Actor>;
  /** When the follow was updated */
  updatedAt?: Maybe<Scalars['DateTime']>;
}

/** A paginated list of events */
export interface PaginatedEventList {
  __typename?: 'PaginatedEventList';
  /** A list of events */
  elements?: Maybe<Array<Maybe<Event>>>;
  /** The total number of events in the list */
  total?: Maybe<Scalars['Int']>;
}

/** The list of visibility options for a comment */
export type CommentVisibility =
  /** visible only to people invited */
  | 'INVITE'
  /** Visible only after a moderator accepted */
  | 'MODERATED'
  /** Visible only to people members of the group or followers of the person */
  | 'PRIVATE'
  /** Publicly listed and federated. Can be shared. */
  | 'PUBLIC'
  /** Visible only to people with the link - or invited */
  | 'UNLISTED';

/** Describes how an actor is opened to follows */
export type Openness =
  /** The actor can only be followed by invitation */
  | 'INVITE_ONLY'
  /** The actor needs to accept the following before it's effective */
  | 'MODERATED'
  /** The actor is open to followings */
  | 'OPEN';

/** A paginated list of posts */
export interface PaginatedPostList {
  __typename?: 'PaginatedPostList';
  /** A list of posts */
  elements?: Maybe<Array<Maybe<Post>>>;
  /** The total number of posts in the list */
  total?: Maybe<Scalars['Int']>;
}

/** A post */
export interface Post extends ActivityObject {
  __typename?: 'Post';
  /** The post's group */
  attributedTo?: Maybe<Actor>;
  /** The post's author */
  author?: Maybe<Actor>;
  /** The post's body, as HTML */
  body?: Maybe<Scalars['String']>;
  /** Whether the post is a draft */
  draft?: Maybe<Scalars['Boolean']>;
  /** The post's ID */
  id?: Maybe<Scalars['ID']>;
  /** The post's creation date */
  insertedAt?: Maybe<Scalars['DateTime']>;
  /** The post language */
  language?: Maybe<Scalars['String']>;
  /** The posts's media */
  picture?: Maybe<Media>;
  /** When the post was published */
  publishAt?: Maybe<Scalars['DateTime']>;
  /** The post's slug */
  slug?: Maybe<Scalars['String']>;
  /** The post's tags */
  tags?: Maybe<Array<Maybe<Tag>>>;
  /** The post's title */
  title?: Maybe<Scalars['String']>;
  /** The post's last update date */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** The post's URL */
  url?: Maybe<Scalars['String']>;
  /** The post's visibility */
  visibility?: Maybe<PostVisibility>;
}

/** The list of visibility options for a post */
export type PostVisibility =
  /** Visible only to people members of the group or followers of the person */
  | 'PRIVATE'
  /** Publicly listed and federated. Can be shared. */
  | 'PUBLIC'
  /** Visible only to people with the link */
  | 'UNLISTED';

/** A paginated list of resources */
export interface PaginatedResourceList {
  __typename?: 'PaginatedResourceList';
  /** A list of resources */
  elements?: Maybe<Array<Maybe<Resource>>>;
  /** The total number of resources in the list */
  total?: Maybe<Scalars['Int']>;
}

/** A resource */
export interface Resource extends ActivityObject {
  __typename?: 'Resource';
  /** The resource's owner */
  actor?: Maybe<Actor>;
  /** Children resources in folder */
  children?: Maybe<PaginatedResourceList>;
  /** The resource's creator */
  creator?: Maybe<Actor>;
  /** The resource's ID */
  id?: Maybe<Scalars['ID']>;
  /** The resource's creation date */
  insertedAt?: Maybe<Scalars['NaiveDateTime']>;
  /** The resource's metadata */
  metadata?: Maybe<ResourceMetadata>;
  /** The resource's parent */
  parent?: Maybe<Resource>;
  /** The resource's path */
  path?: Maybe<Scalars['String']>;
  /** The resource's publication date */
  publishedAt?: Maybe<Scalars['NaiveDateTime']>;
  /** The resource's URL */
  resourceUrl?: Maybe<Scalars['String']>;
  /** The resource's summary */
  summary?: Maybe<Scalars['String']>;
  /** The resource's title */
  title?: Maybe<Scalars['String']>;
  /** The resource's type (if it's a folder) */
  type?: Maybe<Scalars['String']>;
  /** The resource's last update date */
  updatedAt?: Maybe<Scalars['NaiveDateTime']>;
  /** The resource's URL */
  url?: Maybe<Scalars['String']>;
}


/** A resource */
export interface ResourceChildrenArgs {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}

/** The metadata associated to the resource */
export interface ResourceMetadata {
  __typename?: 'ResourceMetadata';
  /** The resource's author name */
  authorName?: Maybe<Scalars['String']>;
  /** The resource's author URL */
  authorUrl?: Maybe<Scalars['String']>;
  /** The resource's metadata description */
  description?: Maybe<Scalars['String']>;
  /** The resource's favicon URL */
  faviconUrl?: Maybe<Scalars['String']>;
  /** The resource's metadata image height */
  height?: Maybe<Scalars['Int']>;
  /** The resource's author name */
  html?: Maybe<Scalars['String']>;
  /** The resource's metadata image */
  imageRemoteUrl?: Maybe<Scalars['String']>;
  /** The resource's provider name */
  providerName?: Maybe<Scalars['String']>;
  /** The resource's provider URL */
  providerUrl?: Maybe<Scalars['String']>;
  /** The resource's metadata title */
  title?: Maybe<Scalars['String']>;
  /** The type of the resource */
  type?: Maybe<Scalars['String']>;
  /** The resource's metadata image width */
  width?: Maybe<Scalars['Int']>;
}

/** A paginated list of todo-lists */
export interface PaginatedTodoListList {
  __typename?: 'PaginatedTodoListList';
  /** A list of todo lists */
  elements?: Maybe<Array<Maybe<TodoList>>>;
  /** The total number of todo lists in the list */
  total?: Maybe<Scalars['Int']>;
}

/** A todo list */
export interface TodoList {
  __typename?: 'TodoList';
  /** The actor that owns this todo list */
  actor?: Maybe<Actor>;
  /** The todo list's ID */
  id?: Maybe<Scalars['ID']>;
  /** The todo list's title */
  title?: Maybe<Scalars['String']>;
  /** The todo-list's todos */
  todos?: Maybe<PaginatedTodoList>;
}


/** A todo list */
export interface TodoListTodosArgs {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}

/** A paginated list of todos */
export interface PaginatedTodoList {
  __typename?: 'PaginatedTodoList';
  /** A list of todos */
  elements?: Maybe<Array<Maybe<Todo>>>;
  /** The total number of todos in the list */
  total?: Maybe<Scalars['Int']>;
}

/** A todo */
export interface Todo {
  __typename?: 'Todo';
  /** The todos's assigned person */
  assignedTo?: Maybe<Actor>;
  /** The todo's creator */
  creator?: Maybe<Actor>;
  /** The todo's due date */
  dueDate?: Maybe<Scalars['DateTime']>;
  /** The todo's ID */
  id?: Maybe<Scalars['ID']>;
  /** The todo's status */
  status?: Maybe<Scalars['Boolean']>;
  /** The todo's title */
  title?: Maybe<Scalars['String']>;
  /** The todo list this todo is attached to */
  todoList?: Maybe<TodoList>;
}

/** The types of Group that exist */
export type GroupType =
  /** A public group of many actors */
  | 'COMMUNITY'
  /** A private group of persons */
  | 'GROUP';

/** The list of visibility options for a group */
export type GroupVisibility =
  /** Visible only to people with the link - or invited */
  | 'PRIVATE'
  /** Publicly listed and federated */
  | 'PUBLIC'
  /** Visible only to people with the link - or invited */
  | 'UNLISTED';

/** Available sort directions */
export type SortDirection =
  /** Ascending order */
  | 'ASC'
  /** Descending order */
  | 'DESC';

/** Available event sort fields */
export type EventOrderBy =
  /** Sort by the date the event starts */
  | 'BEGINS_ON'
  /** Sort by the date the event was created */
  | 'INSERTED_AT'
  /** Sort by the date the event was updated */
  | 'UPDATED_AT';

/** A paginated list of groups */
export interface PaginatedGroupList {
  __typename?: 'PaginatedGroupList';
  /** A list of groups */
  elements?: Maybe<Array<Maybe<Group>>>;
  /** The total number of groups in the list */
  total?: Maybe<Scalars['Int']>;
}

/** An instance representation */
export interface Instance {
  __typename?: 'Instance';
  /** The domain name of the instance */
  domain?: Maybe<Scalars['ID']>;
  /** The number of events on this instance we know of */
  eventCount?: Maybe<Scalars['Int']>;
  /** Does this instance follow us? */
  followedStatus?: Maybe<InstanceFollowStatus>;
  /** The number of their profiles who follow our groups */
  followersCount?: Maybe<Scalars['Int']>;
  /** Do we follow this instance */
  followerStatus?: Maybe<InstanceFollowStatus>;
  /** The number of our profiles who follow their groups */
  followingsCount?: Maybe<Scalars['Int']>;
  /** The number of grouo on this instance we know of */
  groupCount?: Maybe<Scalars['Int']>;
  /** Whether this instance has a relay, meaning that it's a Mobilizon instance that we can follow */
  hasRelay?: Maybe<Scalars['Boolean']>;
  /** The size of all the media files sent by actors from this instance */
  mediaSize?: Maybe<Scalars['Int']>;
  /** The number of profiles on this instance we know of */
  personCount?: Maybe<Scalars['Int']>;
  /** The number of reports made against profiles from this instance */
  reportsCount?: Maybe<Scalars['Int']>;
}

export type InstanceFollowStatus =
  /** The instance follow was approved */
  | 'APPROVED'
  /** There's no instance follow etablished */
  | 'NONE'
  /** The instance follow is still pending */
  | 'PENDING';

export type InstanceFilterFollowStatus =
  | 'ALL'
  | 'FOLLOWED'
  | 'FOLLOWING';

export type InstanceFilterSuspendStatus =
  | 'ALL'
  | 'SUSPENDED';

export type InstancesSortFields =
  | 'EVENT_COUNT'
  | 'FOLLOWERS_COUNT'
  | 'FOLLOWINGS_COUNT'
  | 'GROUP_COUNT'
  | 'MEDIA_SIZE'
  | 'PERSON_COUNT'
  | 'REPORTS_COUNT';

/** A paginated list of instances */
export interface PaginatedInstanceList {
  __typename?: 'PaginatedInstanceList';
  /** A list of instances */
  elements?: Maybe<Array<Maybe<Instance>>>;
  /** The total number of instances in the list */
  total?: Maybe<Scalars['Int']>;
}

/** Language information */
export interface Language {
  __typename?: 'Language';
  /** The iso-639-3 language code */
  code?: Maybe<Scalars['String']>;
  /** The language name */
  name?: Maybe<Scalars['String']>;
}

/** A paginated list of persons */
export interface PaginatedPersonList {
  __typename?: 'PaginatedPersonList';
  /** A list of persons */
  elements?: Maybe<Array<Maybe<Person>>>;
  /** The total number of persons in the list */
  total?: Maybe<Scalars['Int']>;
}

/** A report object */
export interface Report extends ActionLogObject {
  __typename?: 'Report';
  /** The comments that are reported */
  comments?: Maybe<Array<Maybe<Comment>>>;
  /** The comment the reporter added about this report */
  content?: Maybe<Scalars['String']>;
  /** The event that is being reported */
  event?: Maybe<Event>;
  /** The internal ID of the report */
  id?: Maybe<Scalars['ID']>;
  /** When the report was created */
  insertedAt?: Maybe<Scalars['DateTime']>;
  /** The notes made on the event */
  notes?: Maybe<Array<Maybe<ReportNote>>>;
  /** The actor that is being reported */
  reported?: Maybe<Actor>;
  /** The actor that created the report */
  reporter?: Maybe<Actor>;
  /** Whether the report is still active */
  status?: Maybe<ReportStatus>;
  /** When the report was updated */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** The URI of the report */
  uri?: Maybe<Scalars['String']>;
}

/** A report note object */
export interface ReportNote extends ActionLogObject {
  __typename?: 'ReportNote';
  /** The content of the note */
  content?: Maybe<Scalars['String']>;
  /** The internal ID of the report note */
  id?: Maybe<Scalars['ID']>;
  /** When the report note was created */
  insertedAt?: Maybe<Scalars['DateTime']>;
  /** The moderator who added the note */
  moderator?: Maybe<Actor>;
  /** The report on which this note is added */
  report?: Maybe<Report>;
}

/** The list of possible statuses for a report object */
export type ReportStatus =
  /** The report has been closed */
  | 'CLOSED'
  /** The report has been opened */
  | 'OPEN'
  /** The report has been marked as resolved */
  | 'RESOLVED';

export interface PaginatedReportList {
  __typename?: 'PaginatedReportList';
  /** A list of reports */
  elements?: Maybe<Array<Maybe<Report>>>;
  /** The total number of reports in the list */
  total?: Maybe<Scalars['Int']>;
}

/**
 * A list of possible values for the type option to search an address.
 *
 * Results may vary depending on the geocoding provider.
 */
export type AddressSearchType =
  /** Administrative results (cities, regions,...) */
  | 'ADMINISTRATIVE';

export type EventType =
  /** The event will happen in person. It can also be livestreamed, but has a physical address */
  | 'IN_PERSON'
  /** The event will only happen online. It has no physical address */
  | 'ONLINE';

/** Search events result */
export interface Events {
  __typename?: 'Events';
  /** Event elements */
  elements: Array<Maybe<Event>>;
  /** Total elements */
  total: Scalars['Int'];
}

/** Search groups result */
export interface Groups {
  __typename?: 'Groups';
  /** Group elements */
  elements: Array<Maybe<Group>>;
  /** Total elements */
  total: Scalars['Int'];
}

/** Search persons result */
export interface Persons {
  __typename?: 'Persons';
  /** Person elements */
  elements: Array<Maybe<Person>>;
  /** Total elements */
  total: Scalars['Int'];
}

/** A statistics object */
export interface Statistics {
  __typename?: 'Statistics';
  /** The total number of comments */
  numberOfComments?: Maybe<Scalars['Int']>;
  /** The total number of events */
  numberOfEvents?: Maybe<Scalars['Int']>;
  /** The total number of groups */
  numberOfGroups?: Maybe<Scalars['Int']>;
  /** The number of this instance's followers */
  numberOfInstanceFollowers?: Maybe<Scalars['Int']>;
  /** The number of instances this instance follows */
  numberOfInstanceFollowings?: Maybe<Scalars['Int']>;
  /** The number of local events */
  numberOfLocalComments?: Maybe<Scalars['Int']>;
  /** The number of local events */
  numberOfLocalEvents?: Maybe<Scalars['Int']>;
  /** The number of local groups */
  numberOfLocalGroups?: Maybe<Scalars['Int']>;
  /** The number of local users */
  numberOfUsers?: Maybe<Scalars['Int']>;
}

/** The list of sortable fields for an user list */
export type SortableUserField =
  /** The user's ID */
  | 'ID';

/** Users list */
export interface Users {
  __typename?: 'Users';
  /** User elements */
  elements: Array<Maybe<User>>;
  /** Total elements */
  total: Scalars['Int'];
}

/** Root Mutation */
export interface RootMutationType {
  __typename?: 'RootMutationType';
  /** Accept an invitation to a group */
  acceptInvitation?: Maybe<Member>;
  /** Accept a relay subscription */
  acceptRelay?: Maybe<Follower>;
  /** Add an instance subscription */
  addInstance?: Maybe<Instance>;
  /** For an admin to update an user */
  adminUpdateUser?: Maybe<User>;
  /** Approve a membership request */
  approveMember?: Maybe<Member>;
  /** Change default actor for user */
  changeDefaultActor?: Maybe<User>;
  /** Change an user email */
  changeEmail?: Maybe<User>;
  /** Change an user password */
  changePassword?: Maybe<User>;
  /** Confirm a participation */
  confirmParticipation?: Maybe<Participant>;
  /** Create a comment */
  createComment?: Maybe<Comment>;
  /** Create a discussion */
  createDiscussion?: Maybe<Discussion>;
  /** Create an event */
  createEvent?: Maybe<Event>;
  /** Create a Feed Token */
  createFeedToken?: Maybe<FeedToken>;
  /** Create a group */
  createGroup?: Maybe<Group>;
  /** Create a new person for user */
  createPerson?: Maybe<Person>;
  /** Create a post */
  createPost?: Maybe<Post>;
  /** Create a report */
  createReport?: Maybe<Report>;
  /** Create a note on a report */
  createReportNote?: Maybe<ReportNote>;
  /** Create a resource */
  createResource?: Maybe<Resource>;
  /** Create a todo */
  createTodo?: Maybe<Todo>;
  /** Create a todo list */
  createTodoList?: Maybe<TodoList>;
  /** Create an user */
  createUser?: Maybe<User>;
  /** Delete an account */
  deleteAccount?: Maybe<DeletedObject>;
  /** Delete a single comment */
  deleteComment?: Maybe<Comment>;
  /** Delete a discussion */
  deleteDiscussion?: Maybe<Discussion>;
  /** Delete an event */
  deleteEvent?: Maybe<DeletedObject>;
  /** Delete a feed token */
  deleteFeedToken?: Maybe<DeletedFeedToken>;
  /** Delete a group */
  deleteGroup?: Maybe<DeletedObject>;
  /** Delete an identity */
  deletePerson?: Maybe<Person>;
  /** Delete a post */
  deletePost?: Maybe<DeletedObject>;
  /** Delete a note on a report */
  deleteReportNote?: Maybe<DeletedObject>;
  /** Delete a resource */
  deleteResource?: Maybe<DeletedObject>;
  /** Export the event participants as a file */
  exportEventParticipants?: Maybe<Scalars['String']>;
  /** Follow a group */
  followGroup?: Maybe<Follower>;
  /** Invite an actor to join the group */
  inviteMember?: Maybe<Member>;
  /** Join an event */
  joinEvent?: Maybe<Participant>;
  /** Join a group */
  joinGroup?: Maybe<Member>;
  /** Leave an event */
  leaveEvent?: Maybe<DeletedParticipant>;
  /** Leave a group */
  leaveGroup?: Maybe<DeletedObject>;
  /** Login an user */
  login?: Maybe<Login>;
  /** Logout an user, deleting a refresh token */
  logout?: Maybe<Scalars['String']>;
  /** Get a preview for a resource link */
  previewResourceLink?: Maybe<ResourceMetadata>;
  /** Refresh a profile */
  refreshProfile?: Maybe<Actor>;
  /** Refresh a token */
  refreshToken?: Maybe<RefreshedToken>;
  /** Register a first profile on registration */
  registerPerson?: Maybe<Person>;
  registerPush?: Maybe<Scalars['String']>;
  /** Reject an invitation to a group */
  rejectInvitation?: Maybe<Member>;
  /** Reject a membership request */
  rejectMember?: Maybe<Member>;
  /** Reject a relay subscription */
  rejectRelay?: Maybe<Follower>;
  /** Remove a media */
  removeMedia?: Maybe<DeletedObject>;
  /** Remove a member from a group */
  removeMember?: Maybe<Member>;
  /** Delete a relay subscription */
  removeRelay?: Maybe<Follower>;
  /** Reply to a discussion */
  replyToDiscussion?: Maybe<Discussion>;
  /** Resend registration confirmation token */
  resendConfirmationEmail?: Maybe<Scalars['String']>;
  /** Reset user password */
  resetPassword?: Maybe<Login>;
  /** Save admin settings */
  saveAdminSettings?: Maybe<AdminSettings>;
  /** Send a link through email to reset user password */
  sendResetPassword?: Maybe<Scalars['String']>;
  /** Set user settings */
  setUserSettings?: Maybe<UserSettings>;
  /** Suspend an actor */
  suspendProfile?: Maybe<DeletedObject>;
  /** Unfollow a group */
  unfollowGroup?: Maybe<Follower>;
  unregisterPush?: Maybe<Scalars['String']>;
  /** Unsuspend an actor */
  unsuspendProfile?: Maybe<Actor>;
  updateActivitySetting?: Maybe<ActivitySetting>;
  /** Update a comment */
  updateComment?: Maybe<Comment>;
  /** Update a discussion */
  updateDiscussion?: Maybe<Discussion>;
  /** Update an event */
  updateEvent?: Maybe<Event>;
  /** Update follower */
  updateFollower?: Maybe<Follower>;
  /** Update a group */
  updateGroup?: Maybe<Group>;
  /** Update a group follow */
  updateGroupFollow?: Maybe<Follower>;
  /** Update the user's locale */
  updateLocale?: Maybe<User>;
  /** Update a member's role */
  updateMember?: Maybe<Member>;
  /** Update a participation */
  updateParticipation?: Maybe<Participant>;
  /** Update an identity */
  updatePerson?: Maybe<Person>;
  /** Update a post */
  updatePost?: Maybe<Post>;
  /** Update a report */
  updateReportStatus?: Maybe<Report>;
  /** Update a resource */
  updateResource?: Maybe<Resource>;
  /** Update a todo */
  updateTodo?: Maybe<Todo>;
  /** Upload a media */
  uploadMedia?: Maybe<Media>;
  /** Validate an user email */
  validateEmail?: Maybe<User>;
  /** Validate an user after registration */
  validateUser?: Maybe<Login>;
}


/** Root Mutation */
export interface RootMutationTypeAcceptInvitationArgs {
  id: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeAcceptRelayArgs {
  address: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeAddInstanceArgs {
  domain: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeAdminUpdateUserArgs {
  confirmed?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  notify?: InputMaybe<Scalars['Boolean']>;
  role?: InputMaybe<UserRole>;
}


/** Root Mutation */
export interface RootMutationTypeApproveMemberArgs {
  memberId: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeChangeDefaultActorArgs {
  preferredUsername: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeChangeEmailArgs {
  email: Scalars['String'];
  password: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeChangePasswordArgs {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeConfirmParticipationArgs {
  confirmationToken: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeCreateCommentArgs {
  eventId: Scalars['ID'];
  inReplyToCommentId?: InputMaybe<Scalars['ID']>;
  isAnnouncement?: InputMaybe<Scalars['Boolean']>;
  language?: InputMaybe<Scalars['String']>;
  text: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeCreateDiscussionArgs {
  actorId: Scalars['ID'];
  text: Scalars['String'];
  title: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeCreateEventArgs {
  attributedToId?: InputMaybe<Scalars['ID']>;
  beginsOn: Scalars['DateTime'];
  category?: InputMaybe<EventCategory>;
  contacts?: InputMaybe<Array<InputMaybe<Contact>>>;
  description: Scalars['String'];
  draft?: InputMaybe<Scalars['Boolean']>;
  endsOn?: InputMaybe<Scalars['DateTime']>;
  joinOptions?: InputMaybe<EventJoinOptions>;
  language?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Array<InputMaybe<EventMetadataInput>>>;
  onlineAddress?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<EventOptionsInput>;
  organizerActorId: Scalars['ID'];
  phoneAddress?: InputMaybe<Scalars['String']>;
  physicalAddress?: InputMaybe<AddressInput>;
  picture?: InputMaybe<MediaInput>;
  publishAt?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<EventStatus>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title: Scalars['String'];
  visibility?: InputMaybe<EventVisibility>;
}


/** Root Mutation */
export interface RootMutationTypeCreateFeedTokenArgs {
  actorId?: InputMaybe<Scalars['ID']>;
}


/** Root Mutation */
export interface RootMutationTypeCreateGroupArgs {
  avatar?: InputMaybe<MediaInput>;
  banner?: InputMaybe<MediaInput>;
  name?: InputMaybe<Scalars['String']>;
  openness?: InputMaybe<Openness>;
  physicalAddress?: InputMaybe<AddressInput>;
  preferredUsername: Scalars['String'];
  summary?: InputMaybe<Scalars['String']>;
  visibility?: InputMaybe<GroupVisibility>;
}


/** Root Mutation */
export interface RootMutationTypeCreatePersonArgs {
  avatar?: InputMaybe<MediaInput>;
  banner?: InputMaybe<MediaInput>;
  name?: InputMaybe<Scalars['String']>;
  preferredUsername: Scalars['String'];
  summary?: InputMaybe<Scalars['String']>;
}


/** Root Mutation */
export interface RootMutationTypeCreatePostArgs {
  attributedToId: Scalars['ID'];
  body: Scalars['String'];
  draft?: InputMaybe<Scalars['Boolean']>;
  language?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<MediaInput>;
  publishAt?: InputMaybe<Scalars['DateTime']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title: Scalars['String'];
  visibility?: InputMaybe<PostVisibility>;
}


/** Root Mutation */
export interface RootMutationTypeCreateReportArgs {
  commentsIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  content?: InputMaybe<Scalars['String']>;
  eventId?: InputMaybe<Scalars['ID']>;
  forward?: InputMaybe<Scalars['Boolean']>;
  reportedId: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeCreateReportNoteArgs {
  content?: InputMaybe<Scalars['String']>;
  reportId: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeCreateResourceArgs {
  actorId: Scalars['ID'];
  parentId?: InputMaybe<Scalars['ID']>;
  resourceUrl?: InputMaybe<Scalars['String']>;
  summary?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
}


/** Root Mutation */
export interface RootMutationTypeCreateTodoArgs {
  assignedToId?: InputMaybe<Scalars['ID']>;
  dueDate?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
  todoListId: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeCreateTodoListArgs {
  groupId: Scalars['ID'];
  title: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeCreateUserArgs {
  email: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeDeleteAccountArgs {
  password?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['ID']>;
}


/** Root Mutation */
export interface RootMutationTypeDeleteCommentArgs {
  commentId: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeDeleteDiscussionArgs {
  discussionId: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeDeleteEventArgs {
  eventId: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeDeleteFeedTokenArgs {
  token: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeDeleteGroupArgs {
  groupId: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeDeletePersonArgs {
  id: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeDeletePostArgs {
  id: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeDeleteReportNoteArgs {
  noteId: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeDeleteResourceArgs {
  id: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeExportEventParticipantsArgs {
  eventId: Scalars['ID'];
  format?: InputMaybe<ExportFormatEnum>;
  roles?: InputMaybe<Array<InputMaybe<ParticipantRoleEnum>>>;
}


/** Root Mutation */
export interface RootMutationTypeFollowGroupArgs {
  groupId: Scalars['ID'];
  notify?: InputMaybe<Scalars['Boolean']>;
}


/** Root Mutation */
export interface RootMutationTypeInviteMemberArgs {
  groupId: Scalars['ID'];
  targetActorUsername: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeJoinEventArgs {
  actorId: Scalars['ID'];
  email?: InputMaybe<Scalars['String']>;
  eventId: Scalars['ID'];
  locale?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
  timezone?: InputMaybe<Scalars['String']>;
}


/** Root Mutation */
export interface RootMutationTypeJoinGroupArgs {
  groupId: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeLeaveEventArgs {
  actorId: Scalars['ID'];
  eventId: Scalars['ID'];
  token?: InputMaybe<Scalars['String']>;
}


/** Root Mutation */
export interface RootMutationTypeLeaveGroupArgs {
  groupId: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeLoginArgs {
  email: Scalars['String'];
  password: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeLogoutArgs {
  refreshToken: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypePreviewResourceLinkArgs {
  resourceUrl: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeRefreshProfileArgs {
  id: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeRefreshTokenArgs {
  refreshToken: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeRegisterPersonArgs {
  avatar?: InputMaybe<MediaInput>;
  banner?: InputMaybe<MediaInput>;
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  preferredUsername: Scalars['String'];
  summary?: InputMaybe<Scalars['String']>;
}


/** Root Mutation */
export interface RootMutationTypeRegisterPushArgs {
  auth: Scalars['String'];
  endpoint: Scalars['String'];
  p256dh: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeRejectInvitationArgs {
  id: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeRejectMemberArgs {
  memberId: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeRejectRelayArgs {
  address: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeRemoveMediaArgs {
  id: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeRemoveMemberArgs {
  exclude?: InputMaybe<Scalars['Boolean']>;
  memberId: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeRemoveRelayArgs {
  address: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeReplyToDiscussionArgs {
  discussionId: Scalars['ID'];
  text: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeResendConfirmationEmailArgs {
  email: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
}


/** Root Mutation */
export interface RootMutationTypeResetPasswordArgs {
  locale?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  token: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeSaveAdminSettingsArgs {
  contact?: InputMaybe<Scalars['String']>;
  instanceDescription?: InputMaybe<Scalars['String']>;
  instanceLanguages?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  instanceLongDescription?: InputMaybe<Scalars['String']>;
  instanceName?: InputMaybe<Scalars['String']>;
  instancePrivacyPolicy?: InputMaybe<Scalars['String']>;
  instancePrivacyPolicyType?: InputMaybe<InstancePrivacyType>;
  instancePrivacyPolicyUrl?: InputMaybe<Scalars['String']>;
  instanceRules?: InputMaybe<Scalars['String']>;
  instanceSlogan?: InputMaybe<Scalars['String']>;
  instanceTerms?: InputMaybe<Scalars['String']>;
  instanceTermsType?: InputMaybe<InstanceTermsType>;
  instanceTermsUrl?: InputMaybe<Scalars['String']>;
  registrationsOpen?: InputMaybe<Scalars['Boolean']>;
}


/** Root Mutation */
export interface RootMutationTypeSendResetPasswordArgs {
  email: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
}


/** Root Mutation */
export interface RootMutationTypeSetUserSettingsArgs {
  groupNotifications?: InputMaybe<NotificationPendingEnum>;
  location?: InputMaybe<LocationInput>;
  notificationBeforeEvent?: InputMaybe<Scalars['Boolean']>;
  notificationEachWeek?: InputMaybe<Scalars['Boolean']>;
  notificationOnDay?: InputMaybe<Scalars['Boolean']>;
  notificationPendingMembership?: InputMaybe<NotificationPendingEnum>;
  notificationPendingParticipation?: InputMaybe<NotificationPendingEnum>;
  timezone?: InputMaybe<Scalars['String']>;
}


/** Root Mutation */
export interface RootMutationTypeSuspendProfileArgs {
  id: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeUnfollowGroupArgs {
  groupId: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeUnregisterPushArgs {
  endpoint: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeUnsuspendProfileArgs {
  id: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeUpdateActivitySettingArgs {
  enabled: Scalars['Boolean'];
  key: Scalars['String'];
  method: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeUpdateCommentArgs {
  commentId: Scalars['ID'];
  isAnnouncement?: InputMaybe<Scalars['Boolean']>;
  language?: InputMaybe<Scalars['String']>;
  text: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeUpdateDiscussionArgs {
  discussionId: Scalars['ID'];
  title: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeUpdateEventArgs {
  attributedToId?: InputMaybe<Scalars['ID']>;
  beginsOn?: InputMaybe<Scalars['DateTime']>;
  category?: InputMaybe<EventCategory>;
  contacts?: InputMaybe<Array<InputMaybe<Contact>>>;
  description?: InputMaybe<Scalars['String']>;
  draft?: InputMaybe<Scalars['Boolean']>;
  endsOn?: InputMaybe<Scalars['DateTime']>;
  eventId: Scalars['ID'];
  joinOptions?: InputMaybe<EventJoinOptions>;
  language?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Array<InputMaybe<EventMetadataInput>>>;
  onlineAddress?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<EventOptionsInput>;
  organizerActorId?: InputMaybe<Scalars['ID']>;
  phoneAddress?: InputMaybe<Scalars['String']>;
  physicalAddress?: InputMaybe<AddressInput>;
  picture?: InputMaybe<MediaInput>;
  status?: InputMaybe<EventStatus>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title?: InputMaybe<Scalars['String']>;
  visibility?: InputMaybe<EventVisibility>;
}


/** Root Mutation */
export interface RootMutationTypeUpdateFollowerArgs {
  approved: Scalars['Boolean'];
  id: Scalars['ID'];
}


/** Root Mutation */
export interface RootMutationTypeUpdateGroupArgs {
  avatar?: InputMaybe<MediaInput>;
  banner?: InputMaybe<MediaInput>;
  id: Scalars['ID'];
  manuallyApprovesFollowers?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  openness?: InputMaybe<Openness>;
  physicalAddress?: InputMaybe<AddressInput>;
  summary?: InputMaybe<Scalars['String']>;
  visibility?: InputMaybe<GroupVisibility>;
}


/** Root Mutation */
export interface RootMutationTypeUpdateGroupFollowArgs {
  followId: Scalars['ID'];
  notify?: InputMaybe<Scalars['Boolean']>;
}


/** Root Mutation */
export interface RootMutationTypeUpdateLocaleArgs {
  locale?: InputMaybe<Scalars['String']>;
}


/** Root Mutation */
export interface RootMutationTypeUpdateMemberArgs {
  memberId: Scalars['ID'];
  role: MemberRoleEnum;
}


/** Root Mutation */
export interface RootMutationTypeUpdateParticipationArgs {
  id: Scalars['ID'];
  role: ParticipantRoleEnum;
}


/** Root Mutation */
export interface RootMutationTypeUpdatePersonArgs {
  avatar?: InputMaybe<MediaInput>;
  banner?: InputMaybe<MediaInput>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  summary?: InputMaybe<Scalars['String']>;
}


/** Root Mutation */
export interface RootMutationTypeUpdatePostArgs {
  attributedToId?: InputMaybe<Scalars['ID']>;
  body?: InputMaybe<Scalars['String']>;
  draft?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  language?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<MediaInput>;
  publishAt?: InputMaybe<Scalars['DateTime']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title?: InputMaybe<Scalars['String']>;
  visibility?: InputMaybe<PostVisibility>;
}


/** Root Mutation */
export interface RootMutationTypeUpdateReportStatusArgs {
  reportId: Scalars['ID'];
  status: ReportStatus;
}


/** Root Mutation */
export interface RootMutationTypeUpdateResourceArgs {
  id: Scalars['ID'];
  parentId?: InputMaybe<Scalars['ID']>;
  resourceUrl?: InputMaybe<Scalars['String']>;
  summary?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
}


/** Root Mutation */
export interface RootMutationTypeUpdateTodoArgs {
  assignedToId?: InputMaybe<Scalars['ID']>;
  dueDate?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  status?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
  todoListId?: InputMaybe<Scalars['ID']>;
}


/** Root Mutation */
export interface RootMutationTypeUploadMediaArgs {
  alt?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  name: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeValidateEmailArgs {
  token: Scalars['String'];
}


/** Root Mutation */
export interface RootMutationTypeValidateUserArgs {
  token: Scalars['String'];
}

/** A event contact */
export interface Contact {
  /** The Contact Actor ID */
  id?: InputMaybe<Scalars['String']>;
}

export interface EventMetadataInput {
  /** The key for the metadata */
  key: Scalars['String'];
  /** The title for the metadata */
  title?: InputMaybe<Scalars['String']>;
  /** The metadata type */
  type?: InputMaybe<EventMetadataType>;
  /** The value for the metadata */
  value: Scalars['String'];
}

/** Event options */
export interface EventOptionsInput {
  /** Whether or not to allow anonymous participation (if the server allows it) */
  anonymousParticipation?: InputMaybe<Scalars['Boolean']>;
  /** The list of special attendees */
  attendees?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** The policy on public comment moderation under the event */
  commentModeration?: InputMaybe<EventCommentModeration>;
  /** Whether to show or hide the person organizer when event is organized by a group */
  hideOrganizerWhenGroupEvent?: InputMaybe<Scalars['Boolean']>;
  /** Whether the event is fully online */
  isOnline?: InputMaybe<Scalars['Boolean']>;
  /** The maximum attendee capacity for this event */
  maximumAttendeeCapacity?: InputMaybe<Scalars['Int']>;
  /** The list of offers to show for this event */
  offers?: InputMaybe<Array<InputMaybe<EventOfferInput>>>;
  /** The list of participation conditions to accept to join this event */
  participationConditions?: InputMaybe<Array<InputMaybe<EventParticipationConditionInput>>>;
  /** The list of the event */
  program?: InputMaybe<Scalars['String']>;
  /** The number of remaining seats for this event */
  remainingAttendeeCapacity?: InputMaybe<Scalars['Int']>;
  /** Show event end time */
  showEndTime?: InputMaybe<Scalars['Boolean']>;
  /** Whether or not to show the participation price */
  showParticipationPrice?: InputMaybe<Scalars['Boolean']>;
  /** Whether or not to show the number of remaining seats for this event */
  showRemainingAttendeeCapacity?: InputMaybe<Scalars['Boolean']>;
  /** Show event start time */
  showStartTime?: InputMaybe<Scalars['Boolean']>;
  /** The event's timezone */
  timezone?: InputMaybe<Scalars['String']>;
}

/** An event offer */
export interface EventOfferInput {
  /** The price amount for this offer */
  price?: InputMaybe<Scalars['Float']>;
  /** The currency for this price offer */
  priceCurrency?: InputMaybe<Scalars['String']>;
  /** The URL to access to this offer */
  url?: InputMaybe<Scalars['String']>;
}

/** An event participation condition */
export interface EventParticipationConditionInput {
  /** The content for this condition */
  content?: InputMaybe<Scalars['String']>;
  /** The title for this condition */
  title?: InputMaybe<Scalars['String']>;
  /** The URL to access this condition */
  url?: InputMaybe<Scalars['String']>;
}

/** An address input */
export interface AddressInput {
  /** The address's country */
  country?: InputMaybe<Scalars['String']>;
  /** The address's description */
  description?: InputMaybe<Scalars['String']>;
  /** The geocoordinates for the point where this address is */
  geom?: InputMaybe<Scalars['Point']>;
  /** The address's ID */
  id?: InputMaybe<Scalars['ID']>;
  /** The address's locality */
  locality?: InputMaybe<Scalars['String']>;
  /** The address's original ID from the provider */
  originId?: InputMaybe<Scalars['String']>;
  /** The address's postal code */
  postalCode?: InputMaybe<Scalars['String']>;
  /** The address's region */
  region?: InputMaybe<Scalars['String']>;
  /** The address's street name (with number) */
  street?: InputMaybe<Scalars['String']>;
  /** The (estimated) timezone of the location */
  timezone?: InputMaybe<Scalars['String']>;
  /** The address's type */
  type?: InputMaybe<Scalars['String']>;
  /** The address's URL */
  url?: InputMaybe<Scalars['String']>;
}

/** An attached media or a link to a media */
export interface MediaInput {
  /** A full media attached */
  media?: InputMaybe<MediaInputObject>;
  /** The ID of an existing media */
  mediaId?: InputMaybe<Scalars['ID']>;
}

/** An attached media */
export interface MediaInputObject {
  /** The media owner */
  actorId?: InputMaybe<Scalars['ID']>;
  /** The media's alternative text */
  alt?: InputMaybe<Scalars['String']>;
  /** The media file */
  file: Scalars['Upload'];
  /** The media's name */
  name: Scalars['String'];
}

/** A struct containing the id of the deleted object */
export interface DeletedObject {
  __typename?: 'DeletedObject';
  id?: Maybe<Scalars['ID']>;
}

/** Represents a deleted feed_token */
export interface DeletedFeedToken {
  __typename?: 'DeletedFeedToken';
  /** The actor that owned the deleted feed token */
  actor?: Maybe<DeletedObject>;
  /** The user that owned the deleted feed token */
  user?: Maybe<DeletedObject>;
}

export type ExportFormatEnum =
  /** CSV format */
  | 'CSV'
  /** ODS format */
  | 'ODS'
  /** PDF format */
  | 'PDF';

/** Represents a deleted participant */
export interface DeletedParticipant {
  __typename?: 'DeletedParticipant';
  /** The participant's actor */
  actor?: Maybe<DeletedObject>;
  /** The participant's event */
  event?: Maybe<DeletedObject>;
  /** The participant ID */
  id?: Maybe<Scalars['ID']>;
}

/** A JWT and the associated user ID */
export interface Login {
  __typename?: 'Login';
  /** A JWT Token for this session */
  accessToken: Scalars['String'];
  /** A JWT Token to refresh the access token */
  refreshToken: Scalars['String'];
  /** The user associated to this session */
  user: User;
}

/** Token */
export interface RefreshedToken {
  __typename?: 'RefreshedToken';
  /** Generated access token */
  accessToken: Scalars['String'];
  /** Generated refreshed token */
  refreshToken: Scalars['String'];
}

/** The set of parameters needed to input a location */
export interface LocationInput {
  /** A geohash representing the user's preferred location */
  geohash?: InputMaybe<Scalars['String']>;
  /** A string describing the user's preferred  location */
  name?: InputMaybe<Scalars['String']>;
  /** The range in kilometers the user wants to see events */
  range?: InputMaybe<Scalars['Int']>;
}

/** Root subscription */
export interface RootSubscriptionType {
  __typename?: 'RootSubscriptionType';
  /** Notify when a discussion changed */
  discussionCommentChanged?: Maybe<Discussion>;
  /** Notify when a person's participation's status changed for an event */
  eventPersonParticipationChanged?: Maybe<Person>;
  /** Notify when a person's membership's status changed for a group */
  groupMembershipChanged?: Maybe<Person>;
}


/** Root subscription */
export interface RootSubscriptionTypeDiscussionCommentChangedArgs {
  slug: Scalars['String'];
}


/** Root subscription */
export interface RootSubscriptionTypeEventPersonParticipationChangedArgs {
  personId: Scalars['ID'];
}


/** Root subscription */
export interface RootSubscriptionTypeGroupMembershipChangedArgs {
  group: Scalars['String'];
  personId: Scalars['ID'];
}

/** Represents an application */
export interface Application extends Actor {
  __typename?: 'Application';
  /** The actor's avatar media */
  avatar?: Maybe<Media>;
  /** The actor's banner media */
  banner?: Maybe<Media>;
  /** The actor's domain if (null if it's this instance) */
  domain?: Maybe<Scalars['String']>;
  /** Number of followers for this actor */
  followersCount?: Maybe<Scalars['Int']>;
  /** Number of actors following this actor */
  followingCount?: Maybe<Scalars['Int']>;
  /** Internal ID for this application */
  id?: Maybe<Scalars['ID']>;
  /** If the actor is from this instance */
  local?: Maybe<Scalars['Boolean']>;
  /** Whether the actors manually approves followers */
  manuallyApprovesFollowers?: Maybe<Scalars['Boolean']>;
  /** The total size of the media from this actor */
  mediaSize?: Maybe<Scalars['Int']>;
  /** The actor's displayed name */
  name?: Maybe<Scalars['String']>;
  /** The actor's preferred username */
  preferredUsername?: Maybe<Scalars['String']>;
  /** The actor's summary */
  summary?: Maybe<Scalars['String']>;
  /** If the actor is suspended */
  suspended?: Maybe<Scalars['Boolean']>;
  /** The type of Actor (Person, Group,…) */
  type?: Maybe<ActorType>;
  /** The ActivityPub actor's URL */
  url?: Maybe<Scalars['String']>;
}
