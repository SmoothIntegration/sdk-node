export class SIError extends Error {
    constructor(message: string, originalError?: unknown) {
        super(message);
        this.name = 'SIError';

        if (originalError && originalError instanceof Error) {
            this.stack = `${this.stack}\nCaused by: ${originalError.stack}`;
        }
    }
}

export function isSIError(error: Error): error is SIError {
    return error.name === 'SIError';
}
