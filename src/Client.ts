import CDC from './CDC';
import { SIError } from './Errors';
import FreeAgent from './FreeAgent';
import HTTP from './HTTP';
import MYOB from './MYOB';
import QuickBooks from './QuickBooks';
import Request from './Request';
import Xero from './Xero';
import type { ClientConfig } from './types';

const UUID_REGEX: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/**
 * The main client class that provides access to all the Smooth Integration APIs.
 */
export default class Client {
    public clientId: string;
    public clientSecret: string;
    public apiUrl: string;

    public http: HTTP;

    public cdc: CDC;
    public request: Request;

    public xero: Xero;
    public quickBooks: QuickBooks;
    public freeAgent: FreeAgent;
    public myob: MYOB;

    /**
     * Create a new Smooth Integration client.
     * @param { ClientConfig } config - Required, the client configuration.
     * @param { string } config.clientId - Required, your Smooth Integration client ID.
     * @param { string } config.clientSecret - Required, your Smooth Integration client Secret.
     *
     * @throws {SIError} If the configuration provided is invalid.
     *
     * @example
     * ```typescript
     * const client = new Client({
     *    clientId: 'your_client_id',
     *    clientSecret: 'your_client_secret',
     * });
     */
    constructor(config: ClientConfig) {
        if (!config) {
            throw new SIError('Failed to create client: missing config');
        }
        // noinspection SuspiciousTypeOfGuard
        if (typeof config !== 'object') {
            throw new SIError('Failed to create client: config is not of type object');
        }
        if (!config.clientId) {
            throw new SIError('Failed to create client: missing clientId');
        }
        // noinspection SuspiciousTypeOfGuard
        if (typeof config.clientId !== 'string') {
            throw new SIError('Failed to create client: clientId is not of type string');
        }
        if (!config.clientId.match(UUID_REGEX)) {
            throw new SIError('Failed to create client: clientId is not a valid UUID string');
        }
        if (!config.clientSecret) {
            throw new SIError('Failed to create client: missing clientSecret');
        }
        // noinspection SuspiciousTypeOfGuard
        if (typeof config.clientSecret !== 'string') {
            throw new SIError('Failed to create client: clientSecret is not of type string');
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Only for debugging purposes, will be deleted without any warning in the near future. Do not use!
        if (config.apiUrl) {
            console.log(
                "Warning! You're providing a apiUrl in your client initialization. This is only for debugging purposes and will be removed in the near future. Do not use!",
            );
        }

        this.clientId = config.clientId;
        this.clientSecret = config.clientSecret;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Only for debugging purposes, will be deleted without any warning in the near future. Do not use!
        this.apiUrl = config.apiUrl || 'https://api.smooth-integration.com';

        this.http = new HTTP(this);

        this.cdc = new CDC(this);
        this.request = new Request(this);

        this.xero = new Xero(this);
        this.quickBooks = new QuickBooks(this);
        this.freeAgent = new FreeAgent(this);
        this.myob = new MYOB(this);
    }
}
