import SIClient from '../../src';
import { TEST_CLIENT_ID, TEST_CLIENT_SECRET, TEST_DATASOURCE_ID, mockFetch } from '../testUtils';

jest.useFakeTimers().setSystemTime(new Date('2025-01-01T00:00:00.000Z'));

describe('Request: do request', () => {
    test('Can make HTTP GET request', async () => {
        mockFetch({
            method: 'GET',
            url: '/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test',
            response: { message: 'success' },
            status: 200,
            hmacPayload:
                'clientId' +
                'GET' +
                'https://api.smooth-integration.com/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test' +
                '2025-01-01T00:00:00.000Z',
        });

        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        const response = await client.request.get(TEST_DATASOURCE_ID, '/tests/test');
        expect(response).toEqual({ message: 'success' });
    });

    test('Can make HTTP POST request', async () => {
        mockFetch({
            method: 'POST',
            url: '/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test',
            response: { message: 'success' },
            status: 200,
            hmacPayload:
                'clientId' +
                'POST' +
                'https://api.smooth-integration.com/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test' +
                '2025-01-01T00:00:00.000Z' +
                '{"request":"body"}',
        });

        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        const response = await client.request.post(TEST_DATASOURCE_ID, '/tests/test', {
            body: '{"request":"body"}',
        });
        expect(response).toEqual({ message: 'success' });
    });

    test('Can make HTTP PUT request', async () => {
        mockFetch({
            method: 'PUT',
            url: '/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test',
            response: { message: 'success' },
            status: 200,
            hmacPayload:
                'clientId' +
                'PUT' +
                'https://api.smooth-integration.com/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test' +
                '2025-01-01T00:00:00.000Z' +
                '{"request":"body"}',
        });

        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        const response = await client.request.put(TEST_DATASOURCE_ID, '/tests/test', {
            body: '{"request":"body"}',
        });
        expect(response).toEqual({ message: 'success' });
    });

    test('Can make HTTP PATCH request', async () => {
        mockFetch({
            method: 'PATCH',
            url: '/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test',
            response: { message: 'success' },
            status: 200,
            hmacPayload:
                'clientId' +
                'PATCH' +
                'https://api.smooth-integration.com/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test' +
                '2025-01-01T00:00:00.000Z' +
                '{"request":"body"}',
        });

        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        const response = await client.request.patch(TEST_DATASOURCE_ID, '/tests/test', {
            body: '{"request":"body"}',
        });
        expect(response).toEqual({ message: 'success' });
    });

    test('Can make HTTP DELETE request', async () => {
        mockFetch({
            method: 'DELETE',
            url: '/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test',
            response: { message: 'success' },
            status: 200,
            hmacPayload:
                'clientId' +
                'DELETE' +
                'https://api.smooth-integration.com/request/0730d67d-7d48-4a3a-8a72-04c0a4666fd0/tests/test' +
                '2025-01-01T00:00:00.000Z',
        });

        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        const response = await client.request.delete(TEST_DATASOURCE_ID, '/tests/test');
        expect(response).toEqual({ message: 'success' });
    });
});
