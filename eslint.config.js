const globals = require('globals');
const js = require('@eslint/js');
const eslintPluginVue = require('eslint-plugin-vue');
const babelParser = require("@babel/eslint-parser");

module.exports = [
    ...eslintPluginVue.configs["flat/vue2-recommended"],
    {
      ...js.configs.recommended,
      files: ["src/**/*.{vue,js}"],
      languageOptions: {
          sourceType: "module",
          globals: {
              ...globals.node,
              ...globals.browser
          },
          parserOptions: {
            parser: babelParser
          }
      }
    },
    {
      ignores: ["config/*","eslint.config.js","babel.config.js","postcss.config.js"]
    },
]