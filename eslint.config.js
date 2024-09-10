const globals = require('globals');

module.exports = [
    {
        files: ["src/**/js"],
        languageOptions: {
            sourceType: "module",
            globals: {
                ...globals.node,
                ...globals.browser
            }
        }
    }
]