import fetchMock, { MockResponseInit } from 'jest-fetch-mock';
import { createHmac } from 'node:crypto';

export const TEST_CLIENT_ID = '5f95d989-8da6-4dfc-9cf6-35e873c75d36';
export const TEST_CLIENT_SECRET = 'O5B5r_KEKs9UTIvpfaeNPpwfwXcNkvIH2vv1X74IzTU';
export const TEST_COMPANY_ID = 'a5c8d02c-f8dd-45ee-9495-53c1781501b7';
export const TEST_CONNECTION_ID = '0730d67d-7d48-4a3a-8a72-04c0a4666fd0';

type FetchMock = {
    request: {
        method: string;
        url: string;
        body?: string;
        hmacPayload?: string;
        headers?: Record<string, string>;
    };
    response: MockResponseInit;
};

export const mockFetch = ({
    request: {
        method: expectedRequestMethod,
        url: expectedRequestUrl,
        body: expectedRequestBody,
        hmacPayload: expectedRequestHmacPayload,
        headers: expectedRequestHeaders,
    },
    response,
}: FetchMock) => {
    fetchMock.mockResponseOnce(async (req) => {
        const receivedRequestUrl = req.url;
        if (receivedRequestUrl !== expectedRequestUrl) {
            return Promise.reject(
                new Error(
                    `Fetch Mock missed, URL mismatch. Got:\n${receivedRequestUrl}\nexpected,\n${expectedRequestUrl}`,
                ),
            );
        }

        const receivedRequestMethod = req.method;
        if (receivedRequestMethod !== expectedRequestMethod) {
            return Promise.reject(
                new Error(
                    `Fetch Mock missed, Method mismatch. Got:\n${receivedRequestMethod}\nexpected,\n${expectedRequestMethod}`,
                ),
            );
        }

        // The SmoothIntegration API requires HMAC authentication, so we ensure every request made has the correct headers
        const signature = req.headers.get('X-Signature');
        if (!signature) {
            return Promise.reject(new Error('Fetch Mock missed, missing X-Signature header'));
        }
        if (expectedRequestHmacPayload) {
            const expectedRequestHmac = createHmac('sha256', TEST_CLIENT_SECRET)
                .update(expectedRequestHmacPayload)
                .digest('hex');
            if (signature !== expectedRequestHmac) {
                return Promise.reject(new Error('Fetch Mock missed, X-Signature header mismatch'));
            }
        }

        const organisation = req.headers.get('X-Organisation');
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

        const timestamp = req.headers.get('X-Timestamp');
        if (!timestamp) {
            return Promise.reject(new Error('Fetch Mock missed, missing X-Timestamp header'));
        }
        if (isNaN(Date.parse(timestamp))) {
            return Promise.reject(new Error('Fetch Mock missed, invalid X-Timestamp header'));
        }

        if (expectedRequestBody) {
            const receivedRequestBody: string = await req.text();
            if (!receivedRequestBody) {
                return Promise.reject(new Error('Fetch Mock missed, missing body'));
            }
            if (receivedRequestBody !== expectedRequestBody) {
                return Promise.reject(new Error('Fetch Mock missed, body mismatch'));
            }
        }

        if (expectedRequestHeaders) {
            for (const [expectedRequestHeaderKey, expectedRequestHeaderValue] of Object.entries(
                expectedRequestHeaders,
            )) {
                const header = req.headers.get(expectedRequestHeaderKey);
                if (!header) {
                    return Promise.reject(new Error(`Fetch Mock missed, missing ${expectedRequestHeaderKey} header`));
                }
                if (header !== expectedRequestHeaderValue) {
                    return Promise.reject(new Error(`Fetch Mock missed, ${expectedRequestHeaderKey} header mismatch`));
                }
            }
        }

        return Promise.resolve(response);
    });
};
