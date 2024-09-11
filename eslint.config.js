const globals = require('globals');
const js = require('@eslint/js');
const vueEslit = require("@vue/cli-plugin-eslint");
import babelParser from "@babel/eslint-parser";

module.exports = [
    {   
        ...js.configs.recommended,
        plugins: {
            vue: vueEslit
        },
        files: ["src/**/js"],
        languageOptions: {
            sourceType: "module",
            globals: {
                ...globals.node,
                ...globals.browser
            },
            parser: babelParser
        }
    }
]