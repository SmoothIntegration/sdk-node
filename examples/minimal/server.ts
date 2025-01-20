import express, { Request, Response } from 'express';

import Client, { Event } from '@smooth-integration/sdk-node';

// Create an express server, can be any server
const app = express();

// Create a SmoothIntegration client, make sure read the API key from a safe place like a .env file
const client: Client = new Client(
    'b032518b-aef6-4742-a235-7ff8c784e51f',
    'ozmFguhGsi3IkHXhxyjz6wqK696FzYjnbabNqISc1u0',
);

// Replace with the companyId you registered for this user on SmoothIntegration
const demoCompanyId = 'dacbb9dd-9f27-471d-b0ce-b07d80fa8a18';

// Create a route to connect QuickBooks
app.get('/connect-xero', async (_: Request, res: Response) => {
    const consentUrl = await client.xero.getConsentUrl(demoCompanyId);
    res.redirect(consentUrl);
});

// Start the HTTP server
app.listen(8080, () => {
    console.log(`Server running, connect Xero at http://localhost:8080/connect-xero`);
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
