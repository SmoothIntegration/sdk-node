import { type JestConfigWithTsJest, createDefaultPreset } from 'ts-jest';

const defaultPreset = createDefaultPreset();

const jestConfig: JestConfigWithTsJest = {
    ...defaultPreset,
    maxWorkers: 1,
    testEnvironment: 'node',
    automock: false,
    setupFiles: ['./jest.setup.ts'],
    roots: ['<rootDir>'],
    modulePaths: ['<rootDir>'],
    testMatch: ['**/*.test.ts'],
};

export default jestConfig;
