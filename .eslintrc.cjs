const productionErrorDevWarn = process.env.NODE_ENV === 'production' ? 'error' : 'warn';

module.exports = {
  extends: [
    '@antfu',
  ],

  overrides: [
    {
      files: ['*.ts', '*.js', '*.mjs', '*.cjs', '*.vue'],
      rules: {
        'no-console': productionErrorDevWarn,
        'no-useless-call': 'off',
        'curly': ['error', 'all'],
        'padding-line-between-statements': [
          'error',
          { blankLine: 'always', prev: '*', next: 'multiline-block-like' },
          { blankLine: 'always', prev: '*', next: 'return' },
          { blankLine: 'always', prev: '*', next: 'if' },
          { blankLine: 'always', prev: 'if', next: '*' },
          // Sequence of variable declarations
          // { blankLine: 'always', prev: '*', next: ['const', 'let'] },
          // { blankLine: 'always', prev: ['const', 'let'], next: '*' },
          { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
        ],
        'vue/attribute-hyphenation': ['error', 'never', { ignore: [] }],
        'vue/v-on-event-hyphenation': ['error', 'never', { ignore: [] }],
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/brace-style': ['error', '1tbs'],
        '@typescript-eslint/member-delimiter-style': ['error', {
          multiline: {
            delimiter: 'semi',
            requireLast: true,
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false,
          },
        }],
        '@typescript-eslint/space-before-function-paren': ['error', {
          anonymous: 'always',
          named: 'always',
          asyncArrow: 'always',
        }],
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/no-unused-vars': productionErrorDevWarn,
        // for @ts-ignore
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/prefer-ts-expect-error': 'off',
      },
    },
  ],
};

