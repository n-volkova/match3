/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-multiple-empty-lines': 'error',
    'no-multi-spaces': 'error',
    'quotes': ['error', 'single'],
    'semi': 'error',
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1
      }
    ],
    'vue/html-indent': [
      'error',
      2
    ],
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': [
      'error',
      {
        'html': {
          'void': 'always',
          'normal': 'always',
          'component': 'always'
        }
      }
    ],
  }
};
