import { CompanyId, ConnectionId, DocumentType, Event, EventId } from './index';

export type Structure = 'domain' | 'normalised' | 'raw';

export type Meta = 'include' | 'exclude' | 'only';

export type CDCConfig = {
    /**
     * Specifies the structure of the documents in the retrieved events.
     * - `domain`: Documents are transformed into their domain model representation. This is the recommended structure as it easily allows you to work with all integrations without additional transformation logic.
     * - `normalised`: Documents are transformed into a highly consistent convention to remove edge cases and improve usability.
     * - `raw`: Documents are returned unmodified, as they are retrieved from the external source.
     */
    structure: Structure;

    /**
     * The event ID to start retrieving events from.
     * This is exclusive, so when requesting from '123', you will receive event '124' and onwards.
     * If omitted, defaults to '0'.
     */
    from?: EventId;

    /**
     * Maximum number of events to retrieve in a single request.
     * If omitted, defaults to '100'.
     * The maximum value is '1000' inclusive.
     * The minimum value is '10' inclusive.
     */
    limit?: number;

    /**
     * Only retrieve events for one or more specific document types.
     * Meta Events cannot be specified here, to include or exclude meta events, use the `meta` option.
     * If omitted, events for all document types are included.
     */
    document_type?: DocumentType | DocumentType[];

    /**
     * Only retrieve events from a specific company by its ID.
     * If omitted, events from all companies are included.
     */
    company?: CompanyId;

    /**
     * Only retrieve events from a specific data source by its ID.
     * If omitted, events from all data sources are included.
     */
    connection?: ConnectionId;

    /**
     * Whether to include or exclude meta events or not.
     * Meta events contain information such as how up-to-date the events are.
     * if omitted, defaults to 'include' all meta events.
     */
    meta?: Meta;
};

export type EventHandler = (event: Event) => Promise<void>;

export type FailureHandler = (error: unknown) => Promise<void>;

export type CDCStreamConfig = CDCConfig & {
    onEvent: EventHandler;
    onFailure?: 'log' | 'ignore' | 'throw' | FailureHandler;
};

export type CDCResponse = {
    last_event_id: Event['event_id'];
    events: Event[];
};
