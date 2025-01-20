import { createHmac } from 'node:crypto';

import Client, { SIError } from './index';

export default class HTTP {
    _client: Client;

    constructor(client: Client) {
        this._client = client;
    }

    private async generateHMAC(request: Request, requestBody?: RequestInit['body']): Promise<[string, string]> {
        const timestamp: string = new Date().toISOString();
        const hmac = createHmac('sha256', this._client.clientSecret);
        hmac.update(`${this._client.clientId}${request.method}${request.url}${timestamp}`);
        if (requestBody) {
            hmac.update(requestBody.toString());
        }
        return [hmac.digest('hex'), timestamp];
    }

    /**
     * Makes an authenticated HTTP request to the Smooth Integration API.
     * @param url {string} endpoint path, @example '/cdc'
     * @param input {RequestInit} any additional request options you want to pass to the request.
     *  Required headers like Content-Type and all HMAC Auth headers do not need to be passed.
     */
    public async fetch<T>(url: string, input?: RequestInit): Promise<T> {
        const request: Request = new Request(this._client.apiUrl + url, input);

        // Sign the request with HMAC signature, Timestamp, and Organisation ID
        const [hmac, timestamp] = await this.generateHMAC(request, input?.body);
        request.headers.set('X-Signature', hmac);
        request.headers.set('X-Organisation', this._client.clientId);
        request.headers.set('X-Timestamp', timestamp);
        request.headers.set('Content-Type', 'application/json; charset=utf-8');

        let response: Response;
        try {
            response = await fetch(request);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            throw new SIError(error.message || 'Network Error', error);
        }

        let body;
        try {
            body = await response.json();
        } catch (error: unknown) {
            throw new SIError('Invalid JSON Received', error);
        }

        if (!response.ok) {
            if (response.status >= 500) {
                throw new SIError(response.statusText);
            } else {
                // TODO: check for error code, could be we receive errors like 400 from the external system when users make proxy requests, which we do not want to throw as an SIError
                throw new SIError(response.statusText + ': ' + body.message);
            }
        }

        return body;
    }
}
