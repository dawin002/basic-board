module.exports = {
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'eslint:recommended', //
        'plugin:prettier/recommended',
    ],
    rules: {
        'prettier/prettier': ['error'],
        'no-unused-vars': 'warn',
        'no-console': 'off',
    },
};
