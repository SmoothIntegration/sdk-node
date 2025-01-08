import SIClient from '../../src';
import { TEST_CLIENT_ID, TEST_CLIENT_SECRET, mockFetch } from '../testUtils';

const SUCCESS_RESPONSE_BODY = {
    last_event_id: '123456789012345678',
    events: [
        {
            company_id: 'a5c8d02c-f8dd-45ee-9495-53c1781501b7',
            data_source_id: '0730d67d-7d48-4a3a-8a72-04c0a4666fd0',
            event_id: '123456789012345678',
            document_id: 'efeeb0a2-e59b-4e17-bc9d-07dab01d17ca',
            document_type: 'xero.account',
            document_status: 'active',
            document: { foo: 'bar' },
        },
    ],
};

describe('CDC: get', () => {
    test('can retrieve CDC events', async () => {
        mockFetch({
            method: 'GET',
            url: '/cdc?from=0&structure=raw',
            response: SUCCESS_RESPONSE_BODY,
            status: 200,
        });

        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        const response = await client.cdc.get({
            structure: 'raw',
        });
        expect(response).toEqual(SUCCESS_RESPONSE_BODY);
    });

    test('can use all parameters', async () => {
        mockFetch({
            method: 'GET',
            // Ensure all parameters are passed correctly
            url:
                '/cdc' +
                '?from=123456789012345678' +
                '&structure=raw' +
                '&limit=678' +
                '&document_type=xero.invoice%2Cquickbooks.balances' +
                '&company=a5c8d02c-f8dd-45ee-9495-53c1781501b7' +
                '&data_source=0730d67d-7d48-4a3a-8a72-04c0a4666fd0' +
                '&meta=include',
            response: SUCCESS_RESPONSE_BODY,
            status: 200,
        });

        const client = new SIClient(TEST_CLIENT_ID, TEST_CLIENT_SECRET);
        const response = await client.cdc.get({
            structure: 'raw',
            from: '123456789012345678',
            limit: 678,
            document_type: ['xero.invoice', 'quickbooks.balances'],
            company: 'a5c8d02c-f8dd-45ee-9495-53c1781501b7',
            data_source: '0730d67d-7d48-4a3a-8a72-04c0a4666fd0',
            meta: 'include',
        });
        expect(response).toEqual(SUCCESS_RESPONSE_BODY);
    });
});
