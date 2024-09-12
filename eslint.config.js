const globals = require('globals');
const js = require('@eslint/js');
const eslintPluginVue = require('eslint-plugin-vue');
const babelParser = require("@babel/eslint-parser");

module.exports = [
    {
      ignores: ["config/*","eslint.config.js","babel.config.js","postcss.config.js"]
    },
    ...eslintPluginVue.configs["flat/vue2-recommended"],
    ...eslintPluginVue.configs["flat/vue2-essential"],
    {
      ...js.configs.recommended,
      files: ["src/**/*.{vue,js}"],
      languageOptions: {
          sourceType: "module",
          // globals: {
          //     ...globals.node,
          //     ...globals.browser
          // },
          parserOptions: {
            parser: babelParser
          }
      },
      rules: {
        'vue/no-unused-vars': 'error'
      }
    }
]
/* 
  通过vue cli创建的项目
  会包含如下有关eslint的包
  @babel/eslint-parser
  @vue/cli-plugin-eslint
  eslint-plugin-vue

  * @babel/eslint-parser
  eslint默认解析器和核心规则仅支持ES标准,不支持babel提供的实验特性(如新语法)和非标准语法(ts或flow)
  这个解析器允许eslint在由babel转换的源代码上运行
  当使用babel时,babel解析器将代码转换为ast,该解析器将ast转换为eslint可以理解的estree
  * @vue/cli-plugin-eslint
  它主要负责两件事
  vue-cli-service lint命令
  添加lintOnSave功能
  * eslint-plugin-vue
  提供对vue文件检测功能
*/


/* 
awesome vue 
https://awesomejs.dev/login
https://github.com/vuejs/awesome-vue?tab=readme-ov-file#official-resources

eslint-plugin-vue
https://eslint.vuejs.ac.cn/user-guide/
*/

/* 
配置中的files不是仅针对配置的范围生效,具体看chatgpt
.eslintignore文件不再支持,配置全局忽略文件,需要单独配置一个对象,且不包含除ignores之外的其他属性
*/

// eslint-plugin-vue 中文文档
// https://eslint.vuejs.ac.cn/user-guide/