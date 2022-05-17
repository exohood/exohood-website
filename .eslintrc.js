module.exports = {
    extends: ['@Exohood', 'plugin:jsdoc/recommended', 'plugin:compat/recommended'],
    env: {
      browser: true,
    },
    settings: {
      polyfills: ['Promise', 'fetch'],
    },
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: [
        './packages/components/tsconfig.json',
        './packages/dynamic-flows/tsconfig.json',
        './packages/docs/tsconfig.json',
      ],
    },
    rules: {
      'jsdoc/require-jsdoc': 0,
      'jsdoc/require-param': 0,
      'jsdoc/require-returns': 0,
      'react/jsx-uses-react': 0,
      'react/react-in-jsx-scope': 0,
      'react/destructuring-assignment': [0, 'never'],
      'react/function-component-definition': 0,
      'jsx-a11y/label-has-for': [
        1,
        {
          required: {
            some: ['nesting', 'id'],
          },
        },
      ],
      'react/sort-comp': 0,
      'react/no-unused-state': 0,
      'import/no-cycle': 0,
      'fp/no-mutation': 0,
      // https://github.com/benmosher/eslint-plugin-import/issues/1615#issuecomment-577500405
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'react/jsx-props-no-spreading': 0,
      'import/no-extraneous-dependencies': [
        0,
        {
          devDependencies: ['src/**/*.story.js', '.storybook/*.js'],
        },
      ],
      'react/prop-types': [
        'error',
        {
          ignore: ['intl'],
        },
      ],
      'jest/unbound-method': 0,
      // Allow .js extensions for jsx
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
      'no-restricted-imports': [
        1,
        {
          name: 'enzyme',
          message: 'Use @testing-library/react instead',
        },
        {
          name: 'react',
          importNames: ['FC', 'FunctionComponent'],
          message:
            'Type props and return ReactNode instead: https://github.com/facebook/create-react-app/pull/8177',
        },
      ],
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandFirst: false,
          shorthandLast: false,
          ignoreCase: false,
          noSortAlphabetically: true,
          reservedFirst: true,
        },
      ],
      // Disable this rule as it raises warning for CSS class names
      'sonarjs/no-duplicate-string': 0,
      // TODO: Overriding the following rules to be a warning instead of an error to fix them later
      '@typescript-eslint/explicit-module-boundary-types': 0,
      'jsx-a11y/anchor-is-valid': 1,
      'jsx-a11y/no-noninteractive-element-interactions': 1,
      'jsx-a11y/no-noninteractive-element-to-interactive-role': 1,
      'jsx-a11y/no-noninteractive-tabindex': 1,
      'jsx-a11y/no-static-element-interactions': 1,
      'react/forbid-dom-props': 1,
      'react/jsx-max-depth': 1,
      'react/jsx-no-constructed-context-values': 1,
      'sonarjs/no-nested-template-literals': 1,
      'sonarjs/cognitive-complexity': 1,
      'sonarjs/no-collapsible-if': 1,
      // Testing
      'jest/max-nested-describe': 1,
      'jest/no-conditional-expect': 1,
      'jest/no-if': 1,
      'jest/no-test-return-statement': 1,
      'jest/valid-expect': 1,
      'testing-library/no-container': 1,
      'testing-library/no-node-access': 1,
      'testing-library/no-render-in-setup': 1,
      // end TODO
    },
    overrides: [
      {
        files: ['packages/dynamic-flows/**/*'],
        rules: {
          'compat/compat': 0,
        },
      },
      {
        files: ['*{spec,test}.{js,jsx,ts,tsx}'],
        rules: {
          'compat/compat': 0,
          'jest/unbound-method': 2,
          'react/prop-types': 0,
          'sonarjs/no-identical-functions': 0,
        },
      },
      {
        files: ['*.story.*'],
        rules: {
          'no-console': 0,
          'no-alert': 0,
          'react/prop-types': 0,
        },
      },
      {
        files: ['*.ts{,x}'],
        rules: {
          'react/require-default-props': 0,
          'no-undef': 0,
          'react/prop-types': 0,
          'no-shadow': 0,
          'no-unused-vars': 0,
        },
      },
    ],
  };
