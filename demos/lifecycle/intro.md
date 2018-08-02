### 暴露配置
`yarn run eject`

### 添加`prettier`,`eslint-plugin-prettier`,`eslint-config-prettier`插件

`yarn add prettier eslint-plugin-prettier eslint-config-prettier --dev`

* prettier: 代码风格格式化插件
* eslint-plugin-prettier: 把prettier作为eslint的一条规则来执行的关联插件
* eslint-config-prettier: 解决eslint和prettier规则冲突的，如果出现冲突，可以通过这个插件关闭一些规则

### 项目中配置eslint和prettier
可以单独新建`.eslintrc`文件配置，也可以在package.json中配置，本项目在package.json中配置

把prettier作为eslint的一条规则来执行，配置如下：
```json
"eslintConfig": {
  "extends": "react-app",
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

To integrate this plugin with `eslint-config-prettier`, you can use the `"recommended" `configuration:

Then you need to add `plugin:prettier/recommended` as the last extension in your `.eslintrc.json`:
```
{
  "extends": [
    "plugin:prettier/recommended"
  ]
}
```
This does three things:

* Enables `eslint-plugin-prettier`.
* Sets the `prettier/prettier` rule to `"error"`.
* Extends the `eslint-config-prettier` configuration.

You can then set Prettier's own options inside a `.prettierrc` file.

### 自动格式化代码配置 formatting-code-automatically

```
 yarn add husky lint-staged prettier --dev
 ```

在package.json中配置
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

