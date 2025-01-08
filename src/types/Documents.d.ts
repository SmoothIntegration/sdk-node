import { DateTime, Id } from './index';

/**
 * Represents the status of a document.
 * - `active`: The document is currently active, meaning it was recently created or updated in the external system.
 * - `archived`: The document has been soft-deleted from the external system.
 * - `deleted`: The document has been hard-deleted from the external system.
 */
export type DocumentStatus = 'active' | 'archived' | 'deleted';

/**
 * Represents the id of a document. This ID is globally unique and is used to identify a document in the external system.
 * NOTE: This ID is not the same as the identifier used in the external system. So it cannot be used to directly query the external system.
 * This ID is consistent over time and will not change if the document is updated, deleted, or restored, so it can be used to track the full life cycle of data.
 */
export type DocumentId = Id;

/**
 * The type of document this event describes.
 * @example "quickbooks.invoice", "xero.balances"
 */
export type DocumentType = string;

/**
 * The data retrieved from the external system. It will be represented differently based on the requested 'structure'.
 */
export type Document = object;

/**
 * Special document type used to represent the state of document types in the Smooth Integration system.
 * These are always prefixed with "meta." and are used to track how up-to-date the Smooth Integration system is with the external system.
 * @example "meta.quickbooks.invoice", "meta.xero.balances"
 */
export type MetaDocumentType = string;

/**
 * Represents a meta event document that describes the state of a document type in the Smooth Integration system.
 */
export type MetaEventDocument = {
    /**
     * ISO8601 UTC DateTime string in milliseconds representing up to what date the events regarding the
     * document_type are up-to-date to if you've consumed all events up to this event_id.
     * @example "2024-03-22T04:44:01.721Z"
     */
    up_to_date: DateTime;

    /**
     * The type of document this event describes, this will be the same as event.document_type.
     */
    document_type: DocumentType;
};
