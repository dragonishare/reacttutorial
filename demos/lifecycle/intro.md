### 暴露配置

`yarn run eject`

### 添加`prettier`,`eslint-plugin-prettier`,`eslint-config-prettier`插件

`yarn add prettier eslint-plugin-prettier eslint-config-prettier --dev`

- prettier: 代码风格格式化插件
- eslint-plugin-prettier: 把 prettier 作为 eslint 的一条规则来执行的关联插件
- eslint-config-prettier: 解决 eslint 和 prettier 规则冲突的，如果出现冲突，可以通过这个插件关闭一些规则

### 项目中配置 eslint 和 prettier

可以单独新建`.eslintrc`文件配置，也可以在 package.json 中配置，本项目在 package.json 中配置

把 prettier 作为 eslint 的一条规则来执行，配置如下：

```json
"eslintConfig": {
  "extends": "react-app",
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

To integrate this plugin with `eslint-config-prettier`, you can use the `"recommended"`configuration:

Then you need to add `plugin:prettier/recommended` as the last extension in your `.eslintrc.json`:

```
{
  "extends": [
    "plugin:prettier/recommended"
  ]
}
```

This does three things:

- Enables `eslint-plugin-prettier`.
- Sets the `prettier/prettier` rule to `"error"`.
- Extends the `eslint-config-prettier` configuration.

You can then set Prettier's own options inside a `.prettierrc` file.

最简单的`.prettierrc`配置

```
{
  "tabWidth":2,
  "semi":true,
  "singleQuote":true,
  "proseWrap":"preserve"
}
```

### 自动格式化代码配置 formatting-code-automatically

```
 yarn add husky lint-staged prettier --dev
```

在 package.json 中配置

```
"scripts": {
  "start": "node scripts/start.js",
  "build": "node scripts/build.js",
  "test": "node scripts/test.js --env=jsdom",
  "precommit": "lint-staged"
},
"lint-staged": {
  "*.{js,jsx,json,css}": [
    "prettier --write",
    "git add"
  ]
},
```

### vs code 编辑器配置 eslint 和 prettier

安装插件`eslint`,`Prettier - Code formatter`

User Settings 设置

```
"editor.formatOnSave": true,
"[javascript]": {
  "editor.formatOnSave": false
},
"eslint.autoFixOnSave": true,
"eslint.alwaysShowStatus": true,
```
