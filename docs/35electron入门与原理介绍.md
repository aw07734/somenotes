## Electron 入门与原理介绍

### 传统桌面应用开发

- Windows 应用 C++ / MFC
- Mac 应用 Objective-C

直接将代码编译成可执行文件, 直接调用系统 API, 这种原生的模式普遍的特点都是:

1. 性能好, 体验好
2. 开发慢, 维护难

### Electron

Electron 是由 Github 开发, 用 HTML, CSS 和 JavaScript 来构建跨平台桌面应用程序的一个开源库.

Electron 通过将 Chromium 和 Node.js 合并到同一个运行时环境中, 并将其打包为 Mac, Window 和 Linux 系统下的应用来实现这一目的.

[image]

咱们可以先来总结一波 Electron 的优点:

1. 使用 web 技术开发, 成本低, 在社区的帮助下, UI更丰富
2. 跨平台, 一套代码可以打包 windows/Mac/linux 三套平台
3. 可以直接在现有 web 应用上拓展
4. 对前端来说, 非常友好
5. 直接使用最新稳定版本 Chromium, 无需再考虑浏览器兼容性
6. 可以直接使用 Node.js, 直接使用各种前端工具比如 webpack, npm 等

VScode 就是使用 Electron 开发的, 感兴趣的同学可以去看一下 vscode 的项目, 或者打开"帮助" -> "开发者模式", 会有惊喜.

### 进程

Electron 区分了两种进程: 主进程和渲染进程

[image]

1. 主进程

   > Electron 运行 package.json 的 main 脚本的进程被称为 主进程. 一个 Electron 应用总是有且只有一个主进程.
   >
   > 职责:
   >
   > 创建渲染进程(可多个)
   >
   > 控制了应用生命周期(启动、退出 APP 以及对 APP 做一些事件监听)
   >
   > 调用系统底层功能, 调用原生资源
   >
   > 可调用的 API:
   >
   > - Node.js API
   > - Electron 提供的主进程 API(包括一些系统功能和 Electron 附加功能)

2. 渲染进程

   > 由于 Electron 使用了 Chromium 来展示 web 页面, 所以 Chromium 的多进程架构也被使用到. 每个 Electron 中的 web 页面运行在它自己的渲染进程中.
   >
   > 主进程使用 BrowserWindow 实例创建页面. 每个 BrowserWindow 实例都在自己的渲染进程里运行页面. 当一个 BrowserWindow 实例被销毁后, 相应的渲染进程也会被终止.
   >
   > 你可以把渲染进程想象成一个浏览器窗口, 它能存在多个并且相互独立, 不过和浏览器不同的是, 它能调用 Node API.
   >
   > 职责:
   >
   > 用 HTML 和 CSS 渲染界面
   >
   > 用 JavaScript 做一些界面交互
   >
   > 可调用的 API:
   >
   > - DOM API
   > - Node.js API
   > - Electron 提供的渲染进程 API

#### 小题

渲染进程和主进程能调用的 api 有什么区别?

如果渲染进程希望能够调用系统功能的话, 应该怎么操作? // browserWindow 调用系统的 dialog

### Api

[image]

### 进程间通信

ipcMain 和 ipcRenderer 都是 EventEmitter 类的一个实例. EventEmitter 类是 NodeJS 事件的基础, 它由 NodeJS 中的 events 模块导出.

EventEmitter 的核心就是事件触发与事件监听器功能的封装. 它实现了事件模型需要的接口, 包括 addListener, removeListener emit 及其他工具方法.

JavaScript 事件类似, 采用了发布/订阅(观察者)的方式, 使用内部 _events 列表来记录注册的事件处理器.

我们通过 ipcMain 和 ipcRenderer 的 on、send 进行监听和发送消息都是 EventEmitter 定义的相关接口.

[https://www.electronjs.org/docs/api/ipc-main](https://www.electronjs.org/docs/api/ipc-main)

```js
// 主进程
const { ipcMain } = require('electron');
ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg); // prints "ping"
    event.reply('asynchronous-reply', 'pong');
});

ipcMain.on('synchronous-message', (event, arg) => {
    console.log(arg); // prints "ping"
    event.returnValue = 'pong';
});

// 渲染进程
const { ipcRenderer } = require('electron');
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg); // prints "pong"
})
```

### remote 模块

[https://www.electronjs.org/docs/api/remote](https://www.electronjs.org/docs/api/remote)

Remote 模块为渲染进程和主进程通信提供了一种简单方法.

在 Electron 中, GUI 相关的模块(如 dialog、menu 等)仅在主进程中可用, 在渲染进程中不可用. 为了在渲染进程中使用它们, ipc 模块是向主进程发送进程间消息所必需的. 使用 remote 模块, 你可以调用 main 进程对象的方法, 而不必显式发送进程间消息.

```js
// 主进程
global.sharedObject = {
    someProperty: 'default value'
}

// 渲染进程1
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value';

// 渲染进程2
console.log(require('electron').remote.getGlobal('sharedObject').someProperty); // new value
```

### 不同页面间数据共享

Storage / 进程通信 / 主进程 global 变量 + remote

## 实战

[sunxiuguo/VisualClipboard: A clipboard app build with electron-react-boilerplate (github.com)](https://github.com/sunxiuguo/VisualClipboard)
