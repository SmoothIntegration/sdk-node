import SIClient, { SIError } from '../../src';
import { TEST_CLIENT_ID, TEST_CLIENT_SECRET, TEST_COMPANY_ID, mockFetch } from '../testUtils';

describe('QuickBooks: getConsentUrl', () => {
    test('Returns Consent Url on 200 Response', async () => {
        mockFetch({
            request: {
                method: 'GET',
                url: 'https://api.smooth-integration.com/v1/quickbooks/connect?company_id=a5c8d02c-f8dd-45ee-9495-53c1781501b7',
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

        const client = new SIClient({
            clientId: TEST_CLIENT_ID,
            clientSecret: TEST_CLIENT_SECRET,
        });
        const response = await client.quickbooks.getConsentUrl(TEST_COMPANY_ID);
        expect(response).toBe('the-consent-url');
    });

    test('Returns Consent Url for SandBox companies on 200 Response', async () => {
        mockFetch({
            request: {
                method: 'GET',
                url: 'https://api.smooth-integration.com/v1/quickbooks/connect?company_id=a5c8d02c-f8dd-45ee-9495-53c1781501b7&sandbox=true',
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

        const client = new SIClient({
            clientId: TEST_CLIENT_ID,
            clientSecret: TEST_CLIENT_SECRET,
        });
        const response = await client.quickbooks.getConsentUrl(TEST_COMPANY_ID, true);
        expect(response).toBe('the-consent-url');
    });

    test('Raises SIError: Bad Request on 400 Response', async () => {
        mockFetch({
            request: {
                method: 'GET',
                url: 'https://api.smooth-integration.com/v1/quickbooks/connect?company_id=a5c8d02c-f8dd-45ee-9495-53c1781501b7',
            },
            response: {
                status: 400,
                body: JSON.stringify({ message: 'QuickBooks is not configured for this organisation' }),
            },
        });

        const client = new SIClient({
            clientId: TEST_CLIENT_ID,
            clientSecret: TEST_CLIENT_SECRET,
        });
        await expect(client.quickbooks.getConsentUrl(TEST_COMPANY_ID)).rejects.toThrow(
            expect.objectContaining({
                name: SIError.name,
                message: 'Bad Request: QuickBooks is not configured for this organisation',
            }),
        );
    });

    test('Raises SIError: Unauthorized on 401 Response', async () => {
        mockFetch({
            request: {
                method: 'GET',
                url: 'https://api.smooth-integration.com/v1/quickbooks/connect?company_id=invalid-company-id',
            },
            response: {
                status: 401,
                body: JSON.stringify({ message: "Invalid 'X-Organisation' header" }),
            },
        });

        const client = new SIClient({
            clientId: TEST_CLIENT_ID,
            clientSecret: TEST_CLIENT_SECRET,
        });
        await expect(client.quickbooks.getConsentUrl('invalid-company-id')).rejects.toThrow(
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
                url: 'https://api.smooth-integration.com/v1/quickbooks/connect?company_id=a5c8d02c-f8dd-45ee-9495-53c1781501b7',
            },
            response: {
                status: 500,
                body: JSON.stringify({ message: 'Internal Server Error' }),
            },
        });

        const client = new SIClient({
            clientId: TEST_CLIENT_ID,
            clientSecret: TEST_CLIENT_SECRET,
        });
        await expect(client.quickbooks.getConsentUrl(TEST_COMPANY_ID)).rejects.toThrow(
            expect.objectContaining({
                name: SIError.name,
                message: 'Internal Server Error',
            }),
        );
    });
});
