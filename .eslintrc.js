const path = require('path');

module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'prettier/@typescript-eslint',
    'prettier/react',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:jest/recommended',
    'plugin:react/jsx-runtime',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'react-hooks', 'jsx-a11y'],
  rules: {
    'no-console': ['error', { allow: ['warn'] }],
    'react/sort-comp': [
      1,
      {
        order: [
          'type-annotations',
          'static-methods',
          'instance-variables',
          'lifecycle',
          'everything-else',
          'render',
        ],
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // 'arrow-parens': ['error', 'as-needed'],
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'prettier/prettier': ['error', { applyParens: 'avoid' }],
        '@typescript-eslint/no-useless-constructor': 'error',
        'no-unused-vars': 'off',
        'no-useless-constructor': 'off',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/no-throw-literal': 'off', //Handled in getErrorFromCatch.ts
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-promise-executor-return': 'off',
        'no-redeclare': 'off',
        'prefer-regex-literals': 'off',
        'react/default-props-match-prop-types': 'off',
        'react/no-unstable-nested-components': 'off',
        'react/jsx-fragments': 'off',
        'react/jsx-no-bind': 'off',
        'react/jsx-no-useless-fragment': 'off',
        'react/require-default-props': 'off',
        '@typescript-eslint/comma-dangle': ['error', 'only-multiline'],
        'import/no-import-module-exports': [
          'error',
          {
            exceptions: [`${__dirname}/src/configureStore.ts`],
          },
        ],
        'no-restricted-exports': [
          'error',
          {
            restrictedNamedExports: [''],
          },
        ],
        'react/function-component-definition': [
          'error',
          {
            namedComponents: ['function-declaration', 'arrow-function'],
            unnamedComponents: ['arrow-function'],
          },
        ],
        'react/jsx-props-no-spreading': [
          'error',
          {
            html: 'ignore',
            custom: 'ignore',
            explicitSpread: 'ignore',
            exceptions: [''],
          },
        ],
        'react/no-unused-prop-types': [
          'error',
          {
            ignore: [
              'className',
              'errorMessage',
              'errors',
              'handleBack',
              'handleBlur',
              'handleChange',
              'handleClose',
              'hasDeclined',
              'hasError',
              'header',
              'id',
              'isLoading',
              'isSubmitting',
              'onSubmit',
              'setFieldTouched',
              'setFieldValue',
              'steps',
              'touched',
              'validateForm',
            ],
          },
        ],
      },
    },
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      env: {
        jest: true,
      },
      plugins: ['@typescript-eslint', 'prettier', 'jest'],
      rules: {
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
      },
    },
  ],
};
