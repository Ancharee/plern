module.exports = {
  "env": {
    "browser": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": 'module',
    "ecmaVersion": 6
  },
  "rules": {
    "indent": ['error', 2],
    "linebreak-style": ['error', 'unix'],
    "quotes": ['error', 'single', { allowTemplateLiterals: true }],
    "semi": ['error', 'always'],
    "no-console": 0,
    "no-useless-escape": 0
  },
  globals: {
    'document': false,
    'body': false,
    'jquery': true,
    'fullpage_api': true
  }
};
