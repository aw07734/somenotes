## vue 组件库设计问题总结

### 样式设计

样式设计主要体现在整体风格, 结构上的美观. 例如颜色的统一, 风格样式的统一(扁平化、圆角)等等内容, 文字编码规范等等.

颜色的统一可以使用我们进行通用的封装和提取, 将所有的变量写为 js 变量或者 less/scss 等预处理框架的变量结果, 方便我们进行依赖提取.

风格统一同理, 大部分对于样式来说, 我们都能够进行通用性的提取和使用.

文字编码规范主要是针对于组件库内部一些文字内容, 需要符合一些标准的规范, 比如中英文之间的空格, 数字与文字之间的空格等等内容.

同时对于组件的设计来说, 需要满足这么一些要求: (以 element 为例:)

- 一致性 Consistency

    - **与现实生活一致**: 与现实生活的流程、逻辑保持一致, 遵循用户习惯的语言和概念;

    - **在界面中一致**: 所有的元素和结构需保持一致, 比如: 设计样式、图标和文本、元素的位置等.

- 反馈 Feedback

    - **控制反馈**: 通过界面样式和交互动效让用户可以清晰的感知自己的操作;

    - **页面反馈**: 操作后, 通过页面元素的变化清晰地展现当前状态.

- 效率 Efficiency

    - **简化流程**: 设计简洁直观的操作流程;

    - **清晰明确**: 语言表达清晰且表意明确, 让用户快速理解进而作出决策;

    - **帮助用户识别**: 界面简单直白, 让用户快速识别而非回忆, 减少用户记忆负担.

- 可控 Controllability

    - **用户决策**: 根据场景可给予用户操作建议或安全提示, 但不能代替用户进行决策;

    - **结果可控**: 用户可以自由的进行操作, 包括撤销、回退和终止当前操作等.

### 架构依赖

以社区常见两个组件库为例, 介绍一下组件库的依赖:

#### element

运行时依赖有: async-validator, babel-helper-vue-jsx-merge-props, deepmerge, normalize-wheel, resize-observer-polyfill,
throttle-debounce

事实上对于 element 来说, 有些依赖位置明显不正确, 运行时和静态依赖没有处理好, 但实际上独具这种编译型的项目来说具体依赖放置的位置不那么重要.

常见的静态脚手架工具:

eslint、webpack、babel 等

- eslint 作为静态校验的工具, 主要使用一些内置的 preset 规范, 来约束我们的代码行为

- webpack 作为打包工具, 主要处理我们代码中通用的如模块化、编译等等的问题

- babel 作为一个编译和 polyfill 处理工具, 来处理我们代码中的编译相关问题

在组件库中, 有一个常见的 babel 插件, 做组件分割, 在 element 中叫 babel-plugin-component. 它的作用是在使用时, 即便不开启 tree-shaking, 也能够手动的简化加载的模块内容.

```js
import {Button} from 'components'

var button = require('components/lib/button')
require('components/lib/button/style.css')
```

这样我们在使用组件时, 就不需要加载所有的组件内容, 打包结果也是按需进行加载.

基本上来说, 写一个组件库和写一个具体项目没有什么太大的出入, 技术栈整体类似, 有条件的最终可以提供一个 .d.ts 文件来方便使用人的书写.

### 复杂功能设计

#### 国际化(i18n)

国际化一般是将所有需要国际化的部分, 提前预制为变量的形式, 通过这种形式进行替换.

```
<div>{{text}}</div>

data: {
  text: '中文'
}
```

例如在这个例子当中, 我们通过切换当前组件中 text 的结果, 就可以更改组件中 i18n 部分的值.

万变不离其宗, 核心原理其实就是这样, 将组件内部的结果设置为一个变量, 从而通过运行时的切换来决定最终使用哪个值从而更改组件 i18n 的结果

当然我们可以基于一些核心库, 来对内容进行通用性的封装:

- 静态阶段提取需要翻译的源文件 key 内容

- 运行时通过方法或者全局 store 获取国际化 key-value 结果

我们也可以使用一些社区封装好的库来进行国际化书写, 对于国际化文案来说, 能够做到例如文字 fallback, 更换国际化等等内容.

#### 主题

主题一般来讲, 有很多种实现方式, 不过最终无外乎就是通过一个变量来控制样式的设置

- 通过 less/scss 等 css 预处理框架变量, 最终通过 less/scss 变量覆盖达到的样式覆盖

- 通过 js props 进行注入达到的样式覆盖

```html

<div :style="{backgroung: color_text_primary}"></div>
```

例如这个例子当中, 使用变量传入 style 当中, 即可通过控制 color_text_primary 的值, 来进行组件样式的切换.

### 复杂组件设计

#### 表单

表单使用 async validator 做校验, 使用 async validator 可以免去很多通用校验的规则.

async validator 是一个异步校验库, 使用它我们可以很轻松的进行同步或者异步校验, 通过一定的 schema 规则来进行校验.

我们只需要定义好一个 schema 结构, 通过传入数据即可对该结构进行校验.

```js
var obj = {
    name: {
        type: "string",
        required: true,
        validator: (rule, value) => value === 'muji'
    },
    age: {
        type: "number",
        asyncValidator: (rule, value) => {
            return new Promise((resolve, reject) => {
                if (value < 18) {
                    reject('too young');
                } else {
                    resolve();
                }
            });
        }
    }
}
```

我们对 name 使用同步的校验, 对 number 使用异步的校验, 异步校验可以返回一个 promise, 这样我们还可以通过发送请求的形式来获取结果.

对于 form 来说, 我们需要设计我们的 props, 这也是最关键的一步. 对于 form 来说, 我们的结构分为

```html
<form>
    <form-item>
        <input />
    </form-item>
    <form-item>
        <select />
    </form-item>
</form>
```

最外层的 form 来处理所有的数据和提交等信息, form-item 为每一个具体表单元素外层内容, input select 为具体表单内容.

### 详细代码可参见 仓库 folder 14
