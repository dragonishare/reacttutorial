# React + Electron 搭建一个桌面应用

## Electron简介

在 Electron 中, 把 package.json 中设定的 main 脚本的所在进程称为 主进程。

快速体验

```
# github上有一个 electron-quick-start 仓库克隆下来
git clone https://github.com/electron/electron-quick-start
# 进入文件夹
cd electron-quick-start
# 安装依赖包并运行
npm install && npm start

```

main.js 是你的启动文件，index.html 是你的入口文件

## Electron 结合 React

### 创建一个React项目

使用`create-react-app`

```
# 安装 create-react-app 命令
npm install -g create-react-app
# 创建 react-electron1 项目
create-react-app react-electron1
# 启动项目
cd react-electron1 && yarn start

```
### Electron 添加及配置

在`react-electron1`项目添加`electron`包

```
yarn add electron
```

**配置 main.js**

根目录`react-electron1`下新建`main.js`文件，参考`electron-quick-start`项目中的`main.js`文件

```
// 引入electron并创建一个Browserwindow
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow

function createWindow () {
//创建浏览器窗口,宽高自定义
mainWindow = new BrowserWindow({width: 800, height: 600})

  /*
   * 加载应用-----  electron-quick-start中默认的加载入口
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
  */
  // 加载应用----适用于 react 项目
  mainWindow.loadURL('http://localhost:3000/');

  // 打开开发者工具，默认不打开
  // mainWindow.webContents.openDevTools()

  // 关闭window时触发下列事件.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow)

// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
   // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
  if (mainWindow === null) {
    createWindow()
  }
})

// 你可以在这个脚本中续写或者使用require引入独立的js文件.


```

**配置`package.json`文件**

```
{
  "name": "react-electron1",
  "version": "0.1.0",
  "private": true,
  "main": "main.js",//配置启动文件
  "homepage": ".",
  "dependencies": {
    "electron": "^2.0.7",
    "react": "^16.4.2",
    "react-dom": "^16.4.2",
    "react-scripts": "1.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
    "startapp": "electron ."//配置electron的start，区别于web端的start
  }
}
```

**注意**

* 添加main.js，主进程文件
* `"startapp": "electron ."`运行electron app的脚本
* `"homepage": "."`打包的时候，资源相对路径问题


### 运行项目

```
# 启动react项目，默认地址：http://localhost:3000/
yarn start

# 启动electron
yarn run startapp
```

### 遇到的问题

1.通过`electron-quick-start`项目拷过来的`main.js`中，加载入口文件时，代码如下：

`mainWindow.loadFile('index.html')`

修改为：
`mainWindow.loadURL('http://localhost:3000')`


运行不起来，最后发现，是加载方法的问题，如果加载的是url，需要**`loadURL`**；
`electron-quick-start`项目的`main.js`中加载的是本地的资源，所以使用的是**`loadFile`**

## 打包 `electron`

打包工具[electron-builder](https://github.com/electron-userland/electron-builder)

### 安装 `electron-builder`

`yarn add electron-builder --dev`

### 配置

* 修改 name，verison，description，author字段
* 在 ./public文件夹中放入 icon.png 文件
* 将 main.js 重命名为 electron.js，让如根目录./public 目录下。同时修改 package.json
* 由于electron-builder中不能使用dependencies，所以务必将所有的dependencies加入devDependencies。
* 最终的 package.json文件：

```
{
  "name": "react-electron1",
  "version": "0.1.0",
  "description": "A Electron app with react.",
  "author": "dragonishare<dragonishare@gmail.com>",
- "main": "main.js",
+ "main": "./public/electron.js",
  "private": true,
  "homepage": "./",
-  "dependencies": {
-    "react": "^16.4.2",
-    "react-dom": "^16.4.2",
-    "react-scripts": "1.1.4"
-  },
+  "build": {
+    "mac": {
+      "category": "demo"
+    },
+    "files": [
+      {
+        "from": "./",
+        "to": "./",
+        "filter": [
+          "**/*",
+          "!node_modules"
+        ]
+      }
+    ],
+    "directories": {
+      "buildResources": "public"
+    }
+  },
  "scripts": {
    "start-electron": "NODE_ENV=development electron .",
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom",
+   "packager": "npm run build && rm -rf dist && electron-builder"
  },
  "devDependencies": {
    "electron": "^2.0.7",
    "electron-builder": "^20.27.1"
+   "react": "^16.4.2",
+   "react-dom": "^16.4.2",
+   "react-scripts": "1.1.4"
  }
}

```

## 参考地址

* [How to build an Electron app using create-react-app. No webpack configuration or “ejecting” necessary.](https://medium.freecodecamp.org/building-an-electron-application-with-create-react-app-97945861647c)
* [如何使用 Electron 和 React 构建一个 APP](https://hiyangguo.github.io/2018/03/27/build-a-app-width-electron-and-react/)
* [React + Electron 搭建一个桌面应用](https://juejin.im/post/5a6a91276fb9a01cbd58ce32)
