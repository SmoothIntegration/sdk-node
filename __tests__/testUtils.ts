import fetchMock from 'jest-fetch-mock';
import { createHmac } from 'node:crypto';

import SIClient from '../src';

export const TEST_CLIENT_ID = 'clientId';
export const TEST_CLIENT_SECRET = 'clientSecret';
export const TEST_COMPANY_ID = 'a5c8d02c-f8dd-45ee-9495-53c1781501b7';
export const TEST_DATASOURCE_ID = '0730d67d-7d48-4a3a-8a72-04c0a4666fd0';

export default new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);

type FetchMock = {
    method: string;
    url: string;
    response: object;
    status: number;
    hmacPayload?: string;
};

export const mockFetch = ({ method, url, response, status, hmacPayload }: FetchMock) => {
    fetchMock.mockResponseOnce((req) => {
        const receivedUrl = req.url;
        const expectedUrl = 'https://api.smooth-integration.com' + url;
        if (receivedUrl !== expectedUrl) {
            return Promise.reject(
                new Error(`Fetch Mock missed, URL mismatch. Got:\n${receivedUrl}\nexpected,\n${expectedUrl}`),
            );
        }

        const receivedMethod = req.method;
        const expectedMethod = method;
        if (receivedMethod !== expectedMethod) {
            return Promise.reject(
                new Error(`Fetch Mock missed, Method mismatch. Got:\n${receivedMethod}\nexpected,\n${expectedMethod}`),
            );
        }

        // The SmoothIntegration API requires HMAC authentication, so we ensure every request made has the correct headers
        const headers = req.headers;
        const signature = headers.get('X-Signature');
        if (!signature) {
            return Promise.reject(new Error('Fetch Mock missed, missing X-Signature header'));
        }
        if (hmacPayload && signature !== createHmac('sha256', TEST_CLIENT_SECRET).update(hmacPayload).digest('hex')) {
            return Promise.reject(new Error('Fetch Mock missed, X-Signature header mismatch'));
        }

        const organisation = headers.get('X-Organisation');
        if (!organisation) {
            return Promise.reject(new Error('Fetch Mock missed, missing X-Organisation header'));
        }
        if (organisation !== TEST_CLIENT_ID) {
            return Promise.reject(
                new Error(
                    'Fetch Mock missed, X-Organisation header mismatch. Got:\n' +
                        organisation +
                        '\nexpected,\n' +
                        TEST_CLIENT_ID,
                ),
            );
        }

        const timestamp = headers.get('X-Timestamp');
        if (!timestamp) {
            return Promise.reject(new Error('Fetch Mock missed, missing X-Timestamp header'));
        }
        if (isNaN(Date.parse(timestamp))) {
            return Promise.reject(new Error('Fetch Mock missed, invalid X-Timestamp header'));
        }

        return Promise.resolve({
            body: JSON.stringify(response),
            status: status,
        });
    });
};
