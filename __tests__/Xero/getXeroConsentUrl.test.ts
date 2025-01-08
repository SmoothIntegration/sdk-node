import SIClient, { SIError } from '../../src';
import { TEST_CLIENT_ID, TEST_CLIENT_SECRET, TEST_COMPANY_ID, mockFetch } from '../testUtils';

describe('Xero: getConsentUrl', () => {
    test('Returns Consent Url on 200 Response', async () => {
        mockFetch({
            method: 'GET',
            url: '/xero/connect?company_id=a5c8d02c-f8dd-45ee-9495-53c1781501b7',
            response: {
                message: 'Created Consent Url',
                result: {
                    consentUrl: 'the-consent-url',
                },
            },
            status: 200,
        });

        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        const response = await client.xero.getConsentUrl(TEST_COMPANY_ID);
        expect(response).toBe('the-consent-url');
    });

    test('Raises SIError: Bad Request on 400 Response', async () => {
        mockFetch({
            method: 'GET',
            url: '/xero/connect?company_id=a5c8d02c-f8dd-45ee-9495-53c1781501b7',
            response: { message: 'Xero is not configured for this organisation' },
            status: 400,
        });

        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        await expect(client.xero.getConsentUrl(TEST_COMPANY_ID)).rejects.toThrow(
            expect.objectContaining({
                name: SIError.name,
                message: 'Bad Request: Xero is not configured for this organisation',
            }),
        );
    });

    test('Raises SIError: Unauthorized on 401 Response', async () => {
        mockFetch({
            method: 'GET',
            url: '/xero/connect?company_id=invalid-company-id',
            response: { message: "Invalid 'X-Organisation' header" },
            status: 401,
        });

        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        await expect(client.xero.getConsentUrl('invalid-company-id')).rejects.toThrow(
            expect.objectContaining({
                name: SIError.name,
                message: "Unauthorized: Invalid 'X-Organisation' header",
            }),
        );
    });

    test('Raises SIError: Internal Server Error on 5xx Response', async () => {
        mockFetch({
            method: 'GET',
            url: '/xero/connect?company_id=a5c8d02c-f8dd-45ee-9495-53c1781501b7',
            response: {},
            status: 500,
        });

        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        await expect(client.xero.getConsentUrl(TEST_COMPANY_ID)).rejects.toThrow(
            expect.objectContaining({
                name: SIError.name,
                message: 'Internal Server Error',
            }),
        );
    });
});
