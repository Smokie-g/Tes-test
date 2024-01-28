module.exports = {
    root: true,
    extends: ['./.eslintrc.base.json', 'plugin:jest/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
      'no-extra-boolean-cast': 'off',
      'no-console': 'off',
      'no-plusplus': 'off',
      'prettier/prettier': 'error',
      'no-void': ['error', { allowAsStatement: true }],
      'no-shadow': 'off',
    },
    overrides: [
      {
        files: ['**/*.{ts,tsx}'],
        rules: {
          '@typescript-eslint/no-unsafe-argument': 'warn',
          '@typescript-eslint/no-floating-promises': 'off',
          '@typescript-eslint/no-misused-promises': [
            'error',
            {
              checksVoidReturn: {
                arguments: false,
                attributes: false,
              },
            },
          ],
          '@typescript-eslint/interface-name-prefix': 0,
          '@typescript-eslint/no-empty-interface': 1,
          '@typescript-eslint/unbound-method': 0,
          '@typescript-eslint/no-unsafe-assignment': 0,
          '@typescript-eslint/no-unsafe-member-access': 1,
          '@typescript-eslint/restrict-template-expressions': 1,
          '@typescript-eslint/no-unsafe-call': 1,
          '@typescript-eslint/no-var-requires': 0,
          '@typescript-eslint/ban-ts-comment': 1,
          '@typescript-eslint/no-use-before-define': [
            'error',
            { variables: false },
          ],
          'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],
        },
      },
    ],
    env: {
      jest: true,
    },
  }
  