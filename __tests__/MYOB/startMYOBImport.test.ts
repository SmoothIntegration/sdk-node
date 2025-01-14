import SIClient, { SIError } from '../../src';
import { TEST_CLIENT_ID, TEST_CLIENT_SECRET, TEST_DATASOURCE_ID, mockFetch } from '../testUtils';

describe('MYOB: startImport', () => {
    test('Returns void on 200 Response', async () => {
        mockFetch({
            method: 'POST',
            url: '/data/import/0730d67d-7d48-4a3a-8a72-04c0a4666fd0',
            response: { message: 'Import Started' },
            status: 200,
        });

        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        await client.myob.startImport(TEST_DATASOURCE_ID);
    });

    test('Raises SIError: Bad Request on 400 Response', async () => {
        mockFetch({
            method: 'POST',
            url: '/data/import/0730d67d-7d48-4a3a-8a72-04c0a4666fd0',
            response: { message: 'Invalid DataSource ID' },
            status: 400,
        });

        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        await expect(client.myob.startImport(TEST_DATASOURCE_ID)).rejects.toThrow(
            expect.objectContaining({
                name: SIError.name,
                message: 'Bad Request: Invalid DataSource ID',
            }),
        );
    });

    test('Raises SIError: Unauthorized on 401 Response', async () => {
        mockFetch({
            method: 'POST',
            url: '/data/import/0730d67d-7d48-4a3a-8a72-04c0a4666fd0',
            response: { message: "Invalid 'X-Organisation' header" },
            status: 401,
        });

        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        await expect(client.myob.startImport(TEST_DATASOURCE_ID)).rejects.toThrow(
            expect.objectContaining({
                name: SIError.name,
                message: "Unauthorized: Invalid 'X-Organisation' header",
            }),
        );
    });

    test('Raises SIError: Internal Server Error on 5xx Response', async () => {
        mockFetch({
            method: 'POST',
            url: '/data/import/0730d67d-7d48-4a3a-8a72-04c0a4666fd0',
            response: {},
            status: 500,
        });

        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        await expect(client.myob.startImport(TEST_DATASOURCE_ID)).rejects.toThrow(
            expect.objectContaining({
                name: SIError.name,
                message: 'Internal Server Error',
            }),
        );
    });
});
