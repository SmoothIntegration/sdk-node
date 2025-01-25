import CDC from './CDC';
import FreeAgent from './FreeAgent';
import HTTP from './HTTP';
import MYOB from './MYOB';
import QuickBooks from './QuickBooks';
import Request from './Request';
import Xero from './Xero';
import { ClientConfig } from './types/Client';

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
     */
    constructor(config: ClientConfig) {
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
