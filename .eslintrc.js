// "off" 或者 0：关闭规则。
// "warn" 或者 1：打开规则，并且作为一个警告（不影响exit code）。
// "error" 或者 2：打开规则，并且作为一个错误（exit code将会是1）。
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },

  plugins: ['prettier'],
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended'
  ],

  // add your custom rules here
  // it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 1, // 无用声明
    'vue/multi-word-component-names': [
      0,
      {
        ignores: []
      }
    ]
  }
}
