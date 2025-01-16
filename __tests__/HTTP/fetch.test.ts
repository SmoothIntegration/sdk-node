import fetchMock from 'jest-fetch-mock';
import { createHmac } from 'node:crypto';

import SIClient, { SIError } from '../../src';
import { TEST_CLIENT_ID, TEST_CLIENT_SECRET } from '../testUtils';

jest.useFakeTimers().setSystemTime(new Date('2025-01-01T00:00:00.000Z'));

describe('HTTP: fetch', () => {
    test('Sets all required Headers on request', async () => {
        fetchMock.mockResponseOnce((req) => {
            // Verify we have a valid X-Timestamp header
            const timestamp = req.headers.get('X-Timestamp');
            if (!timestamp) {
                return Promise.reject(new Error('Missing X-Timestamp Header'));
            }
            if (timestamp !== '2025-01-01T00:00:00.000Z') {
                return Promise.reject(new Error('Timestamp must be an ISO8601 UTC millisecond date string'));
            }

            // Verify the X-Organisation is passed
            const organisation = req.headers.get('X-Organisation');
            if (!organisation) {
                return Promise.reject(new Error('Missing X-Organisation Header'));
            }
            if (organisation !== TEST_CLIENT_ID) {
                return Promise.reject(new Error('Organisation ID mismatch'));
            }

            // Verify the Content-Type is set to application/json; charset=utf-8
            const contentType = req.headers.get('Content-Type');
            if (!contentType) {
                return Promise.reject(new Error('Missing Content-Type Header'));
            }
            if (contentType !== 'application/json; charset=utf-8') {
                return Promise.reject(new Error('Invalid Content-Type'));
            }

            // Verify the X-Signature is generated properly
            const signature = req.headers.get('X-Signature');
            if (!signature) {
                return Promise.reject(new Error('Missing X-Signature Header'));
            }
            const expectedSignature = createHmac('sha256', 'clientSecret');
            expectedSignature.update(`clientIdGEThttps://api.smooth-integration.com/test2025-01-01T00:00:00.000Z`);
            if (signature !== expectedSignature.digest('hex')) {
                return Promise.reject(new Error('Invalid X-Signature'));
            }

            // All good, pass the test
            return Promise.resolve({
                body: JSON.stringify({ success: true }),
                status: 200,
            });
        });
        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        const response = await client.http.fetch('/test');
        expect(response).toEqual({ success: true });
    });

    test('Generates Correct HMAC for GET with query params', async () => {
        const expectedSignature = createHmac('sha256', 'clientSecret');
        expectedSignature.update(
            `clientIdGEThttps://api.smooth-integration.com/test?query=param2025-01-01T00:00:00.000Z`,
        );
        const expectedSignatureDigest = expectedSignature.digest('hex');

        fetchMock.mockResponseOnce((req) => {
            if (req.headers.get('X-Signature') !== expectedSignatureDigest) {
                return Promise.reject(new Error('Invalid X-Signature'));
            } else {
                return Promise.resolve({
                    body: JSON.stringify({ success: true }),
                    status: 200,
                });
            }
        });
        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        const response = await client.http.fetch('/test?query=param');
        expect(response).toEqual({ success: true });
    });

    test('Generates Correct HMAC for POST with body', async () => {
        const expectedSignature = createHmac('sha256', 'clientSecret');
        // Note: The body needs to be serialized once, as JSON.stringify does not guarantee a specific ordering of keys when serializing.
        // by serializing once, we ensure the string representation is consistent.
        const body: string = JSON.stringify({ foo: 'bar', baz: 'qux' });
        expectedSignature.update('clientIdPOSThttps://api.smooth-integration.com/test2025-01-01T00:00:00.000Z' + body);
        const expectedSignatureDigest = expectedSignature.digest('hex');

        fetchMock.mockResponseOnce((req) => {
            if (req.headers.get('X-Signature') !== expectedSignatureDigest) {
                return Promise.reject(new Error('Invalid X-Signature'));
            } else {
                return Promise.resolve({
                    body: JSON.stringify({ success: true }),
                    status: 200,
                });
            }
        });
        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        const response = await client.http.fetch('/test', {
            method: 'POST',
            body: body,
        });
        expect(response).toEqual({ success: true });
    });

    test('Forwards any provided headers', async () => {
        fetchMock.mockResponseOnce((req) => {
            // Should contain all default headers and the custom header as well
            if (
                !req.headers.get('X-Timestamp') ||
                !req.headers.get('X-Organisation') ||
                !req.headers.get('X-Signature')
            ) {
                return Promise.reject(new Error('Missing required headers'));
            }
            if (req.headers.get('X-Custom-Header') !== 'foo') {
                return Promise.reject(new Error('Custom header not forwarded'));
            }
            // All good, pass the test
            return Promise.resolve({
                body: JSON.stringify({ success: true }),
                status: 200,
            });
        });
        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        const response = await client.http.fetch('/test', {
            headers: {
                'X-Custom-Header': 'foo',
            },
        });
        expect(response).toEqual({ success: true });
    });

    test('Handles Networking Errors', async () => {
        fetchMock.mockResponseOnce(() => {
            return Promise.reject(new Error('Network Error'));
        });
        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        await expect(client.http.fetch('/test?query=param')).rejects.toThrow(
            expect.objectContaining({
                name: SIError.name,
                message: 'Network Error',
            }),
        );
    });

    test('Handles unparsable response bodies', async () => {
        fetchMock.mockResponseOnce(() => {
            return Promise.resolve({
                body: '<not-a-valid-json-string>',
                status: 200,
            });
        });
        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        await expect(client.http.fetch('/test?query=param')).rejects.toThrow(
            expect.objectContaining({
                name: SIError.name,
                message: 'Invalid JSON Received',
            }),
        );
    });
});
