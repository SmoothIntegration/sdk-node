import SIClient from '../../src';
import { TEST_CLIENT_ID, TEST_CLIENT_SECRET, TEST_CONNECTION_ID, mockFetch } from '../testUtils';

jest.useFakeTimers().setSystemTime(new Date('2025-01-01T00:00:00.000Z'));

describe('Request: do request', () => {
    test('Can make HTTP GET request', async () => {
        mockFetch({
            request: {
                method: 'GET',
                url: 'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test',
                hmacPayload:
                    '5f95d989-8da6-4dfc-9cf6-35e873c75d36' +
                    'GET' +
                    'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test' +
                    '2025-01-01T00:00:00.000Z',
            },
            response: {
                status: 200,
                body: JSON.stringify({ message: 'success' }),
            },
        });

        const client = new SIClient({
            clientId: TEST_CLIENT_ID,
            clientSecret: TEST_CLIENT_SECRET,
        });
        const response = await client.request.get(TEST_CONNECTION_ID, '/tests/test');
        expect(response).toEqual({ message: 'success' });
    });

    test('Can make HTTP GET request with additional headers', async () => {
        mockFetch({
            request: {
                method: 'GET',
                url: 'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test',
                hmacPayload:
                    '5f95d989-8da6-4dfc-9cf6-35e873c75d36' +
                    'GET' +
                    'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test' +
                    '2025-01-01T00:00:00.000Z',
                headers: {
                    'X-Idempotency-Key': '1234',
                },
            },
            response: {
                status: 200,
                body: JSON.stringify({ message: 'success' }),
            },
        });

        const client = new SIClient({
            clientId: TEST_CLIENT_ID,
            clientSecret: TEST_CLIENT_SECRET,
        });
        const response = await client.request.get(TEST_CONNECTION_ID, '/tests/test', {
            headers: {
                'X-Idempotency-Key': '1234',
            },
        });
        expect(response).toEqual({ message: 'success' });
    });

    test('Can make HTTP POST request', async () => {
        mockFetch({
            request: {
                method: 'POST',
                url: 'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test',
                hmacPayload:
                    '5f95d989-8da6-4dfc-9cf6-35e873c75d36' +
                    'POST' +
                    'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test' +
                    '2025-01-01T00:00:00.000Z',
            },
            response: {
                status: 200,
                body: JSON.stringify({ message: 'success' }),
            },
        });

        const client = new SIClient({
            clientId: TEST_CLIENT_ID,
            clientSecret: TEST_CLIENT_SECRET,
        });
        const response = await client.request.post(TEST_CONNECTION_ID, '/tests/test');
        expect(response).toEqual({ message: 'success' });
    });

    test('Can make HTTP POST request with body', async () => {
        mockFetch({
            request: {
                method: 'POST',
                url: 'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test',
                body: '{"request":"body"}',
                hmacPayload:
                    '5f95d989-8da6-4dfc-9cf6-35e873c75d36' +
                    'POST' +
                    'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test' +
                    '2025-01-01T00:00:00.000Z' +
                    '{"request":"body"}',
            },
            response: {
                status: 200,
                body: JSON.stringify({ message: 'success' }),
            },
        });

        const client = new SIClient({
            clientId: TEST_CLIENT_ID,
            clientSecret: TEST_CLIENT_SECRET,
        });
        const response = await client.request.post(TEST_CONNECTION_ID, '/tests/test', {
            body: '{"request":"body"}',
        });
        expect(response).toEqual({ message: 'success' });
    });

    test('Can make HTTP POST request with additional headers', async () => {
        mockFetch({
            request: {
                method: 'POST',
                url: 'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test',
                hmacPayload:
                    '5f95d989-8da6-4dfc-9cf6-35e873c75d36' +
                    'POST' +
                    'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test' +
                    '2025-01-01T00:00:00.000Z' +
                    '{"request":"body"}',
                headers: {
                    'X-Idempotency-Key': '1234',
                },
            },
            response: {
                status: 200,
                body: JSON.stringify({ message: 'success' }),
            },
        });

        const client = new SIClient({
            clientId: TEST_CLIENT_ID,
            clientSecret: TEST_CLIENT_SECRET,
        });
        const response = await client.request.post(TEST_CONNECTION_ID, '/tests/test', {
            body: '{"request":"body"}',
            headers: {
                'X-Idempotency-Key': '1234',
            },
        });
        expect(response).toEqual({ message: 'success' });
    });

    test('Can make HTTP PUT request', async () => {
        mockFetch({
            request: {
                method: 'PUT',
                url: 'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test',
                hmacPayload:
                    '5f95d989-8da6-4dfc-9cf6-35e873c75d36' +
                    'PUT' +
                    'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test' +
                    '2025-01-01T00:00:00.000Z',
            },
            response: {
                status: 200,
                body: JSON.stringify({ message: 'success' }),
            },
        });

        const client = new SIClient({
            clientId: TEST_CLIENT_ID,
            clientSecret: TEST_CLIENT_SECRET,
        });
        const response = await client.request.put(TEST_CONNECTION_ID, '/tests/test');
        expect(response).toEqual({ message: 'success' });
    });

    test('Can make HTTP PUT request with body', async () => {
        mockFetch({
            request: {
                method: 'PUT',
                url: 'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test',
                body: '{"request":"body"}',
                hmacPayload:
                    '5f95d989-8da6-4dfc-9cf6-35e873c75d36' +
                    'PUT' +
                    'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test' +
                    '2025-01-01T00:00:00.000Z' +
                    '{"request":"body"}',
            },
            response: {
                status: 200,
                body: JSON.stringify({ message: 'success' }),
            },
        });

        const client = new SIClient({
            clientId: TEST_CLIENT_ID,
            clientSecret: TEST_CLIENT_SECRET,
        });
        const response = await client.request.put(TEST_CONNECTION_ID, '/tests/test', {
            body: '{"request":"body"}',
        });
        expect(response).toEqual({ message: 'success' });
    });

    test('Can make HTTP PUT request with additional headers', async () => {
        mockFetch({
            request: {
                method: 'PUT',
                url: 'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test',
                body: '{"request":"body"}',
                hmacPayload:
                    '5f95d989-8da6-4dfc-9cf6-35e873c75d36' +
                    'PUT' +
                    'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test' +
                    '2025-01-01T00:00:00.000Z' +
                    '{"request":"body"}',
                headers: {
                    'X-Idempotency-Key': '1234',
                },
            },
            response: {
                status: 200,
                body: JSON.stringify({ message: 'success' }),
            },
        });

        const client = new SIClient({
            clientId: TEST_CLIENT_ID,
            clientSecret: TEST_CLIENT_SECRET,
        });
        const response = await client.request.put(TEST_CONNECTION_ID, '/tests/test', {
            body: '{"request":"body"}',
            headers: {
                'X-Idempotency-Key': '1234',
            },
        });
        expect(response).toEqual({ message: 'success' });
    });

    test('Can make HTTP PATCH request', async () => {
        mockFetch({
            request: {
                method: 'PATCH',
                url: 'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test',
                hmacPayload:
                    '5f95d989-8da6-4dfc-9cf6-35e873c75d36' +
                    'PATCH' +
                    'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test' +
                    '2025-01-01T00:00:00.000Z',
            },
            response: {
                status: 200,
                body: JSON.stringify({ message: 'success' }),
            },
        });

        const client = new SIClient({
            clientId: TEST_CLIENT_ID,
            clientSecret: TEST_CLIENT_SECRET,
        });
        const response = await client.request.patch(TEST_CONNECTION_ID, '/tests/test');
        expect(response).toEqual({ message: 'success' });
    });

    test('Can make HTTP PATCH request with body', async () => {
        mockFetch({
            request: {
                method: 'PATCH',
                url: 'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test',
                body: '{"request":"body"}',
                hmacPayload:
                    '5f95d989-8da6-4dfc-9cf6-35e873c75d36' +
                    'PATCH' +
                    'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test' +
                    '2025-01-01T00:00:00.000Z' +
                    '{"request":"body"}',
            },
            response: {
                status: 200,
                body: JSON.stringify({ message: 'success' }),
            },
        });

        const client = new SIClient({
            clientId: TEST_CLIENT_ID,
            clientSecret: TEST_CLIENT_SECRET,
        });
        const response = await client.request.patch(TEST_CONNECTION_ID, '/tests/test', {
            body: '{"request":"body"}',
        });
        expect(response).toEqual({ message: 'success' });
    });

    test('Can make HTTP PATCH request with additional headers', async () => {
        mockFetch({
            request: {
                method: 'PATCH',
                url: 'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test',
                body: '{"request":"body"}',
                hmacPayload:
                    '5f95d989-8da6-4dfc-9cf6-35e873c75d36' +
                    'PATCH' +
                    'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test' +
                    '2025-01-01T00:00:00.000Z' +
                    '{"request":"body"}',
                headers: {
                    'X-Idempotency-Key': '1234',
                },
            },
            response: {
                status: 200,
                body: JSON.stringify({ message: 'success' }),
            },
        });

        const client = new SIClient({
            clientId: TEST_CLIENT_ID,
            clientSecret: TEST_CLIENT_SECRET,
        });
        const response = await client.request.patch(TEST_CONNECTION_ID, '/tests/test', {
            body: '{"request":"body"}',
            headers: {
                'X-Idempotency-Key': '1234',
            },
        });
        expect(response).toEqual({ message: 'success' });
    });

    test('Can make HTTP DELETE request', async () => {
        mockFetch({
            request: {
                method: 'DELETE',
                url: 'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test',
                hmacPayload:
                    '5f95d989-8da6-4dfc-9cf6-35e873c75d36' +
                    'DELETE' +
                    'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test' +
                    '2025-01-01T00:00:00.000Z',
            },
            response: {
                status: 200,
                body: JSON.stringify({ message: 'success' }),
            },
        });

        const client = new SIClient({
            clientId: TEST_CLIENT_ID,
            clientSecret: TEST_CLIENT_SECRET,
        });
        const response = await client.request.delete(TEST_CONNECTION_ID, '/tests/test');
        expect(response).toEqual({ message: 'success' });
    });

    test('Can make HTTP DELETE request with body', async () => {
        mockFetch({
            request: {
                method: 'DELETE',
                url: 'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test',
                body: '{"request":"body"}',
                hmacPayload:
                    '5f95d989-8da6-4dfc-9cf6-35e873c75d36' +
                    'DELETE' +
                    'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test' +
                    '2025-01-01T00:00:00.000Z' +
                    '{"request":"body"}',
            },
            response: {
                status: 200,
                body: JSON.stringify({ message: 'success' }),
            },
        });

        const client = new SIClient({
            clientId: TEST_CLIENT_ID,
            clientSecret: TEST_CLIENT_SECRET,
        });
        const response = await client.request.delete(TEST_CONNECTION_ID, '/tests/test', {
            body: '{"request":"body"}',
        });
        expect(response).toEqual({ message: 'success' });
    });

    test('Can make HTTP DELETE request with additional headers', async () => {
        mockFetch({
            request: {
                method: 'DELETE',
                url: 'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test',
                hmacPayload:
                    '5f95d989-8da6-4dfc-9cf6-35e873c75d36' +
                    'DELETE' +
                    'https://api.smooth-integration.com/v1/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test' +
                    '2025-01-01T00:00:00.000Z',
                headers: {
                    'X-Idempotency-Key': '1234',
                },
            },
            response: {
                status: 200,
                body: JSON.stringify({ message: 'success' }),
            },
        });

        const client = new SIClient({
            clientId: TEST_CLIENT_ID,
            clientSecret: TEST_CLIENT_SECRET,
        });
        const response = await client.request.delete(TEST_CONNECTION_ID, '/tests/test', {
            headers: {
                'X-Idempotency-Key': '1234',
            },
        });
        expect(response).toEqual({ message: 'success' });
    });
});
