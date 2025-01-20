import { includeIgnoreFile } from '@eslint/compat';
import pluginJs from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default [
    includeIgnoreFile(gitignorePath),
    {
        files: ['**/*.{js,mjs,cjs,ts,astro}'],
        ignores: ['.husky/'],
    },
    // {languageOptions: { globals: globals.browser }},
    pluginJs.configs.recommended,
    ...eslintPluginAstro.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{js,mjs,cjs,ts,astro}'],
        rules: {
            'import/no-useless-path-segments': 'off',
        },
    },
];
