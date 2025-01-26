import SIClient, { SIError } from '../../src';
import { TEST_CLIENT_ID, TEST_CLIENT_SECRET } from '../testUtils';

describe('Client: constructor', () => {
    test('Rejects missing config', async () => {
        // @ts-expect-error: TypeScript is optional, so users could ts-ignore or be using JS
        expect(() => new SIClient()).toThrow(
            expect.objectContaining({
                name: SIError.name,
                message: 'Failed to create client: missing config',
            }),
        );
    });

    test('Rejects non object config', async () => {
        // @ts-expect-error: TypeScript is optional, so users could ts-ignore or be using JS
        expect(() => new SIClient(TEST_CLIENT_ID)).toThrow(
            expect.objectContaining({
                name: SIError.name,
                message: 'Failed to create client: config is not of type object',
            }),
        );
    });

    test('Rejects missing clientId', async () => {
        expect(
            () =>
                new SIClient({
                    // @ts-expect-error: TypeScript is optional, so users could ts-ignore or be using JS
                    clientId: undefined,
                    clientSecret: TEST_CLIENT_SECRET,
                }),
        ).toThrow(
            expect.objectContaining({
                name: SIError.name,
                message: 'Failed to create client: missing clientId',
            }),
        );
    });

    test('Rejects non string clientId', async () => {
        expect(
            () =>
                new SIClient({
                    // @ts-expect-error: TypeScript is optional, so users could ts-ignore or be using JS
                    clientId: 1234,
                    clientSecret: TEST_CLIENT_SECRET,
                }),
        ).toThrow(
            expect.objectContaining({
                name: SIError.name,
                message: 'Failed to create client: clientId is not of type string',
            }),
        );
    });

    test('Rejects non UUID format clientId', async () => {
        expect(
            () =>
                new SIClient({
                    clientId: 'not-a-valid-uuid',
                    clientSecret: TEST_CLIENT_SECRET,
                }),
        ).toThrow(
            expect.objectContaining({
                name: SIError.name,
                message: 'Failed to create client: clientId is not a valid UUID string',
            }),
        );
    });

    test('Rejects missing clientSecret', async () => {
        expect(
            () =>
                new SIClient({
                    clientId: TEST_CLIENT_ID,
                    // @ts-expect-error: TypeScript is optional, so users could ts-ignore or be using JS
                    clientSecret: undefined,
                }),
        ).toThrow(
            expect.objectContaining({
                name: SIError.name,
                message: 'Failed to create client: missing clientSecret',
            }),
        );
    });

    test('Rejects non string clientSecret', async () => {
        expect(
            () =>
                new SIClient({
                    clientId: TEST_CLIENT_ID,
                    // @ts-expect-error: TypeScript is optional, so users could ts-ignore or be using JS
                    clientSecret: 1234,
                }),
        ).toThrow(
            expect.objectContaining({
                name: SIError.name,
                message: 'Failed to create client: clientSecret is not of type string',
            }),
        );
    });

    test('Can construct Client with valid config', async () => {
        expect(
            () =>
                new SIClient({
                    clientId: TEST_CLIENT_ID,
                    clientSecret: TEST_CLIENT_SECRET,
                }),
        ).not.toThrow();
    });
});
