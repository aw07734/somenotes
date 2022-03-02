# webpack 原理与实战

## JS 中的模块化(内容同02的模块化)

[02模块化](../02模块化,浏览器内置对象,事件)

## 如何处理打包

### 参考 Node.js 源码来熟悉 CommonJS 的处理方式

我们可以参考 CommonJS 模块的处理方式来处理一个 CommonJS 模块. 在 Node.js 中, 所有的 CommonJS 模块都会被包裹在一个函数中, 然后在 Node.js 中使用 vm 来运行它, 最终达到一个模块化导入和导出的目的.

最终的效果:

```js
/*
1. fs 读取文件
2. 包裹为一个函数 `(function() {` + `})`
3. 基于 VM 执行字符串
4. 基于对象引用, 获取导出值
*/
var map = {
    './moduleA': function (module) {
        module.exports = new Date().getTime();
    }
};

function require(id) {
    const module = map[id];
    var exportModule = {exports: {}};
    module(exportModule);
    return exportModule.exports;
}

const a = require('./moduleA');
console.log(a);
```

**简易实现**:

生成的文件 index.bundle.js

```js
/*
- src
  - index.js 模拟处理器bundler脚本, 具体打包逻辑
- test
  - index.js 需要被打包的js
  - moduleA.js 需要被打包的js所依赖的js
  - test.js 执行打包的er
 */
/* src\index.js */
#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

/* 获取执行脚本的当前目录 */
const root = path.resolve(require.main.path);

/* 根据模块路径补全 .js 后缀 */
const getFilePath = modulePath => [modulePath, `${modulePath}.js`].find(fs.existsSync);

const funcWrapper = [
    'function (module) {',
    '}'
];

/* 存放 模块文件绝对路径 : 自执行函数 的对象  */
const absolutePathToModuleStr = {};
/* 存放 依赖模块 : 自执行函数 的对象  */
const requiredIdToModule = {};

const template = `
var map = @@map;
function require(id) {
    var moduleFunc = map[id];
    var exportModule = {exports: {}};
    moduleFunc(exportModule);
    return exportModule.exports;
}
`;

function main(id, isFirstComponent = true) {
    const pathToModule = getFilePath(path.resolve(root, id));
    console.log(pathToModule);
    const content = fs.readFileSync(pathToModule, 'utf-8');
    const modulePathMatcher = /require\(["'`](.+?)["'`]\)/g;
    let match = null;
    while (match = modulePathMatcher.exec(content)) {
        const [, childModule] = match;
        const childPath = getFilePath(path.resolve(path.dirname(pathToModule), childModule));
        if (requiredIdToModule[childPath]) {
            continue;
        }
        main(childPath, false);
        requiredIdToModule[childModule] = absolutePathToModuleStr[childPath];
    }
    absolutePathToModuleStr[pathToModule] = `${funcWrapper[0]}\n${content}\n${funcWrapper[1]}`;
    const tpl = template.replace('@@map',
        /* requiredIdToModule 中的 functionStr => function */
        JSON.stringify(requiredIdToModule).replace(/(:)"(.+?)"/g, "$1$2")
            .replace(/\\r\\n/g, '\r\n')
            .replace(/\\n/g, '\n')
    );
    return isFirstComponent ? `
    ${tpl}
    ${content}
    ` : tpl;
}

module.exports = main;

/* test\index.js */
const a = require('./moduleA');
require('./moduleA.js');
console.log(a);

/* test\moduleA.js */
module.exports = new Date().getTime();

/* test.js */
const bundler = require('../src');
const fs = require('fs');
const path = require('path');

const content = bundler('./index');
fs.writeFileSync(path.resolve(__dirname, './index.bundle.js'), content, 'utf-8');
```

### 浏览器中对 CommonJS 处理

我们在浏览器中也可以按照相同的思路来进行处理, 我们在打包阶段将每个模块包裹上一层函数字符串, 然后放置到浏览器中去执行它.

同时我们实现一个简单版本的 require 函数和 module对象, 来处理运行时加载的问题.

这样一个基本的流程就做好了, 接下来我们要处理的就是运行时的依赖关系, 我们需要运行时明白模块之间的依赖关系, 所以我们需要自己维护一个配置, 运行时来进行查找.

有了查找关系之后, 我们就可以在运行时注入这部分内容, 获取内容的时候通过这部分配置来拿到模块之间的映射关系.

### 异步组件打包

上面我们说到的都是同步组件的打包, 最终所有的组件都同步的打包进同一个文件当中, 但有的时候我们需要将组件进行异步加载, 异步加载的过程中, 我们的组件需要不在主包当中, 而在其他的子包文件当中.

这时候, 我们就需要使用另外的异步策略来处理, 我们这里采用 jsonp 的原理来执行.

### HMR 原理

明白了同步打包和异步打包之后, 我们的工具基本上就已经覆盖了大部分功能, 那我们如何进行 hot module reload 呢? 这里简单给大家讲解一下核心的原理.

hot module reload 就是当我们对文件内容有改动的时候, 就会重新触发编译, 同时也会重新触发 UI 的更新, 达到了我们无需重新更新打包就能更新我们的应用.

我们只需要清楚我们函数内部的缓存和模块的代码, 这样不刷新页面的情况下, 只需要重新加载组件就能达到效果.

### 面向切面的插件设计

我们可以面向整个流程的切面来实现编译的效果, 例如引入 babel之后, 在读取了文件之后对其中的内容进行编译, 达到引入 ES5 文件的效果.
