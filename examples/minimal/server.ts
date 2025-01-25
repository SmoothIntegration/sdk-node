import express, { Request, Response } from 'express';

import Client, { Event } from '@smooth-integration/sdk-node';

// Create an express server, can be any server
const app = express();

// Create a SmoothIntegration client, make sure read the client secret from a safe place like a .env file
const client: Client = new Client({
    clientId: '<your_client_id>',
    clientSecret: '<your_client_secret>',
});

// Replace with the companyId you registered for this user on SmoothIntegration
const demoCompanyId = '<your_company_id>';

// Create a route to connect QuickBooks
app.get('/connect-quickbooks', async (_: Request, res: Response) => {
    const consentUrl = await client.quickBooks.getConsentUrl(demoCompanyId);
    res.redirect(consentUrl);
});

// Start the HTTP server
app.listen(8080, () => {
    console.log(`Server running, connect QuickBooks at http://localhost:8080/connect-quickbooks`);
});

// Log Events as they come in
const onEvent = async (event: Event): Promise<void> => {
    console.log('Received event', event.event_id, event.document_id, event);
};

// Start pulling in data
client.cdc.stream({
    onEvent: onEvent,
    structure: 'normalised',
    onFailure: 'log',
});
