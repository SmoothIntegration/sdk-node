import SIClient, { SIError } from '../../src';
import { TEST_CLIENT_ID, TEST_CLIENT_SECRET, TEST_DATASOURCE_ID, mockFetch } from '../testUtils';

describe('FreeAgent: startImport', () => {
    test('Returns void on 200 Response', async () => {
        mockFetch({
            request: {
                method: 'POST',
                url: 'https://api.smooth-integration.com/data/import/0730d67d-7d48-4a3a-8a72-04c0a4666fd0',
            },
            response: {
                status: 200,
                body: JSON.stringify({ message: 'Import Started' }),
            },
        });

        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        await client.freeAgent.startImport(TEST_DATASOURCE_ID);
    });

    test('Raises SIError: Bad Request on 400 Response', async () => {
        mockFetch({
            request: {
                method: 'POST',
                url: 'https://api.smooth-integration.com/data/import/0730d67d-7d48-4a3a-8a72-04c0a4666fd0',
            },
            response: {
                status: 400,
                body: JSON.stringify({ message: 'Invalid DataSource ID' }),
            },
        });

        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        await expect(client.freeAgent.startImport(TEST_DATASOURCE_ID)).rejects.toThrow(
            expect.objectContaining({
                name: SIError.name,
                message: 'Bad Request: Invalid DataSource ID',
            }),
        );
    });

    test('Raises SIError: Unauthorized on 401 Response', async () => {
        mockFetch({
            request: {
                method: 'POST',
                url: 'https://api.smooth-integration.com/data/import/0730d67d-7d48-4a3a-8a72-04c0a4666fd0',
            },
            response: {
                status: 401,
                body: JSON.stringify({ message: "Invalid 'X-Organisation' header" }),
            },
        });

        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        await expect(client.freeAgent.startImport(TEST_DATASOURCE_ID)).rejects.toThrow(
            expect.objectContaining({
                name: SIError.name,
                message: "Unauthorized: Invalid 'X-Organisation' header",
            }),
        );
    });

    test('Raises SIError: Internal Server Error on 5xx Response', async () => {
        mockFetch({
            request: {
                method: 'POST',
                url: 'https://api.smooth-integration.com/data/import/0730d67d-7d48-4a3a-8a72-04c0a4666fd0',
            },
            response: {
                status: 500,
                body: JSON.stringify({ message: 'Internal Server Error' }),
            },
        });

        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        await expect(client.freeAgent.startImport(TEST_DATASOURCE_ID)).rejects.toThrow(
            expect.objectContaining({
                name: SIError.name,
                message: 'Internal Server Error',
            }),
        );
    });
});
