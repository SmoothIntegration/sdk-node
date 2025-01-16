import SIClient, { SIError } from '../../src';
import { TEST_CLIENT_ID, TEST_CLIENT_SECRET, TEST_COMPANY_ID, mockFetch } from '../testUtils';

describe('MYOB: getConsentUrl', () => {
    test('Returns Consent Url on 200 Response', async () => {
        mockFetch({
            request: {
                method: 'GET',
                url: 'https://api.smooth-integration.com/myob/connect?company_id=a5c8d02c-f8dd-45ee-9495-53c1781501b7',
            },
            response: {
                status: 200,
                body: JSON.stringify({
                    message: 'Created Consent Url',
                    result: {
                        consentUrl: 'the-consent-url',
                    },
                }),
            },
        });

        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        const response = await client.myob.getConsentUrl(TEST_COMPANY_ID);
        expect(response).toBe('the-consent-url');
    });

    test('Raises SIError: Bad Request on 400 Response', async () => {
        mockFetch({
            request: {
                method: 'GET',
                url: 'https://api.smooth-integration.com/myob/connect?company_id=a5c8d02c-f8dd-45ee-9495-53c1781501b7',
            },
            response: {
                status: 400,
                body: JSON.stringify({ message: 'MYOB is not configured for this organisation' }),
            },
        });

        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        await expect(client.myob.getConsentUrl(TEST_COMPANY_ID)).rejects.toThrow(
            expect.objectContaining({
                name: SIError.name,
                message: 'Bad Request: MYOB is not configured for this organisation',
            }),
        );
    });

    test('Raises SIError: Unauthorized on 401 Response', async () => {
        mockFetch({
            request: {
                method: 'GET',
                url: 'https://api.smooth-integration.com/myob/connect?company_id=invalid-company-id',
            },
            response: {
                status: 401,
                body: JSON.stringify({ message: "Invalid 'X-Organisation' header" }),
            },
        });

        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        await expect(client.myob.getConsentUrl('invalid-company-id')).rejects.toThrow(
            expect.objectContaining({
                name: SIError.name,
                message: "Unauthorized: Invalid 'X-Organisation' header",
            }),
        );
    });

    test('Raises SIError: Internal Server Error on 5xx Response', async () => {
        mockFetch({
            request: {
                method: 'GET',
                url: 'https://api.smooth-integration.com/myob/connect?company_id=a5c8d02c-f8dd-45ee-9495-53c1781501b7',
            },
            response: {
                status: 500,
                body: JSON.stringify({ message: 'Internal Server Error' }),
            },
        });

        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        await expect(client.myob.getConsentUrl(TEST_COMPANY_ID)).rejects.toThrow(
            expect.objectContaining({
                name: SIError.name,
                message: 'Internal Server Error',
            }),
        );
    });
});
