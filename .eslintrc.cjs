export default {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    rules: {
        // Code Quality
        'no-console': 'warn',
        'no-unused-vars': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        'prefer-arrow-callback': 'error',

        // SOLID Principles Enforcement
        'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
        'max-depth': ['error', 3],
        'complexity': ['warn', 10],

        // Code Style
        'indent': ['error', 2],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'arrow-spacing': 'error',
        'object-curly-spacing': ['error', 'always'],
    },
}
