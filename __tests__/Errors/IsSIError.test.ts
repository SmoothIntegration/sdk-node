import { SIError, isSIError } from '../../src';

describe('Errors: isSIError', () => {
    test('Sets all required Headers on request', async () => {
        expect(isSIError(new SIError('Network Error'))).toBeTruthy();
        expect(isSIError(new Error('Network Error'))).toBeFalsy();
    });
});
