import CDC from './CDC';
import FreeAgent from './FreeAgent';
import HTTP from './HTTP';
import MYOB from './MYOB';
import QuickBooks from './QuickBooks';
import Request from './Request';
import Xero from './Xero';

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
     * @param clientId { string } - The client ID for your Smooth Integration account. Find it at https://app.smooth-integration.com/secrets
     * @param clientSecret { string } - The client secret for your Smooth Integration account. Find it at https://app.smooth-integration.com/secrets
     * @param apiUrl Do Not Use. This is for internal testing use only and will be removed soon.
     */
    constructor(clientId: string, clientSecret: string, apiUrl: string = 'https://api.smooth-integration.com') {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.apiUrl = apiUrl;

        this.http = new HTTP(this);

        this.cdc = new CDC(this);
        this.request = new Request(this);

        this.xero = new Xero(this);
        this.quickBooks = new QuickBooks(this);
        this.freeAgent = new FreeAgent(this);
        this.myob = new MYOB(this);
    }
}
