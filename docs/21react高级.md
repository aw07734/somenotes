## React.js 高级用法

`npx create-react-app my-app --template typescript`

### 一、高阶组件用法及封装

#### 什么是高阶组件

Hoc, High Order Component

a higher-component is a function that takes a component and returns a new component.

1. 高阶组件是一个函数

2. 入参: 是一个 react 组件

3. 出参: 是一个新的 react 组件

#### 先来写一个高阶函数

```js
function getName(name) {
    // 业务逻辑
    return name;
}

function helloWorld(name) {
    // 自己的行为
    console.log(`hello, beautiful world, my name is ${name}`);
}

function byeWorld(name) {
    // 自己的行为
    console.log(`bye, ugly world, my name is ${name}`);
}

/**
 * 入参: 函数
 * 出参: 函数
 * @param {*} wrappedFunc 
 */
const wrapWithUsername = wrappedFunc => () => {
    const name = getName('qiuku');
    wrappedFunc(name);
};

wrapWithUsername(helloWorld)();
wrapWithUsername(byeWorld)();
```

#### 怎样写一个高阶组件

```js
export const newComponent = hoc(WrappedComponent);
```

1. 普通方式

```tsx
/* hoc/index.tsx */
import React, { Component } from "react";

interface State {
    name: string;
}

export const wrapWithUserName = (WrappedComponent: any) => {
    return class extends Component<any, any> {
        public state: State = {
            name: ""
        };

        componentWillMount() {
            const username = localStorage.getItem("name");
            this.setState({
                name: username
            });
        }

        render(): React.ReactNode {
            return <WrappedComponent name={this.state.name} {...this.props} />
        }
    }
}

/* high/HelloWorld.tsx */
import React, {Component} from "react";
import { wrapWithUserName } from "../hoc";

interface Props {
    name: string;
}

class HelloWorld extends Component<Props, any> {
    render(): React.ReactNode {
        return <div>hello world, my name is {this.props.name}</div>
    }
}

export default wrapWithUserName(HelloWorld);

/* high/ByeWorld.tsx */
import React, {Component} from "react";
import { wrapWithUserName } from "../hoc";

interface Props {
    name: string;
}

class ByeWorld extends Component<Props, any> {
    render(): React.ReactNode {
        return <div>bye, ugly world, my name is {this.props.name}</div>
    }
}

export default wrapWithUserName(ByeWorld);
```

2. 装饰器

```tsx
import React, { Component } from "react";
import { wrapWithUserName } from "../hoc";

interface Props {
    name?: string;
}

@wrapWithUserName
class ByeWorld extends Component<Props, any> {
    render(): React.ReactNode {
        return <div>再见 世界, my name is {this.props.name}</div>
    }
}

export default ByeWorld;
```

3. 多个高阶函数组合

```tsx
/* hoc/index.tsx */
import React, { Component } from "react";

interface State {
    name: string;
}

export const wrapWithUserName = (WrappedComponent: any) => {
    return class extends Component<any, any> {
        public state: State = {
            name: ""
        };

        componentWillMount() {
            const username = localStorage.getItem("name");
            this.setState({
                name: username
            });
        }

        render(): React.ReactNode {
            return <WrappedComponent name={this.state.name} {...this.props} />
        }
    }
}

export const wrapWithHeight = (height?: number) => {
    return (WrappedComponent: any) => {
        return class extends Component<any, any> {
            render(): React.ReactNode {
                return (
                    <div>
                        我的身高是{height}
                        <WrappedComponent {...this.props} />
                    </div>
                )
            }
        }
    }
}

/* muti-high/HelloWorld.tsx */
import React, { Component } from "react";
import { wrapWithHeight, wrapWithUserName } from "../hoc";

interface Props {
    name?: string;
}

@wrapWithUserName
@wrapWithHeight(180)
class HelloWorld extends Component<Props, any> {
    render(): React.ReactNode {
        return <div>你好 世界, my name is {this.props.name}</div>
    }
}

export default HelloWorld;

// export default wrapWithUserName(wrapWithHeight(170)(HelloWorld));
```

#### 高阶组件能用来做什么

1. 属性代理

   1.1 操作props
   
   1.2 操作组件实例

```tsx
import React, { Component } from "react";

export const refHoc = (WrappedComponent: any) => class extends Component<any, any> {

    ref: any = null;

    componentDidMount() {
        console.log(this.ref);
        // 子组件 componentDidMount
       // 父组件 componentDidMount
    }

    render(): React.ReactNode {
        return (
            <div>
               <WrappedComponent {...this.props} ref={(instance: any) => (this.ref = instance)} />
            </div>
        );
    }
};
```

2. 继承/劫持

   2.1 通过继承入参 component 的方式, 可以拿到原 component 的任意属性或者方法.

   2.2 可以任意改变 render
   
```tsx
/* hijack/index.tsx */
import React, {Component} from "react";
import {hijackHoc} from "../hoc/hijackHoc";

interface Props {
   name?: string;
}

interface State {
   weight?: number;
   height?: number;
}

@hijackHoc
class HijackComponent extends Component<Props, State> {
   constructor(p: Readonly<Props> | Props, context: State) {
      super(p);
      React.createContext(this.state);
      this.handleClick = this.handleClick.bind(this);
   }

   state: State = {
      weight: 70,
      height: 190
   };

   handleClick() {
      this.setState({
         weight: this.state.weight! + 1
      });
   }

   render(): React.ReactNode {
      return (
              <div onClick={this.handleClick}>
                 hello world, my name is {this.state.weight}
              </div>
      )
   }
}

export default HijackComponent;

/* hajackHoc.tsx */
import React from "react";

/* 注意这里继承的是注解的 class */
export function hijackHoc<T extends { new(...args: any[]): any }>(component: T) {
   return class extends component {

      // 继承 劫持
      handleClick = () => {
         super.handleClick();
         alert('你被我劫持啦!');
      }

      render() {
         const parent = super.render();

         return React.cloneElement(parent, {
            onClick: this.handleClick
         });
      }
   }
}
```

### 二、react hooks

#### 什么是 react hooks

hook -> 钩子, 16.8 新特性, 不写 class 的情况下使用 state 和其他 react 特性.

useXXX, useState, useEffect

class -> hooks

#### react hooks 有什么优势

先来看一下 class 写组件有什么不足之处吧!

1. 组件间的状态逻辑很难复用 -> 后期 react 提供了高阶组件的形式解决这个问题

2. 复杂业务的有状态组件会越来越复杂

   > 通过更改 this.state 来实现各种业务逻辑
   > 
   > 但是 class 里有很多很多的生命周期, 更改 state 的逻辑散布在四面八方
   > 
   > willMount -> timer setInterval
   > 
   > clearInterval

3. this 指向问题

```tsx
import React, { Component } from "react";

/**
 * 4 种监听事件的 this 指向方式
 */
class Test extends Component<any, any> {
    private handleClick2: OmitThisParameter<() => void>;

    constructor(props: any) {
        super(props);
        this.state = {
            num: 1,
            title: '11111'
        };
        this.handleClick2 = this.handleClick1.bind(this);
    }

    handleClick1() {
        this.setState({
            num: this.state.num + 1
        });
    }

    handleClick4 = () => this.setState({
        num: this.state.num + 1
    });

    render() {
        return (
            <div>
                {/* 由于 bind 每次都会返回新韩淑, 所以子组件永远都会随着父组件刷新 */}
                <button onClick={this.handleClick1.bind(this)}>btn1</button>
                
                {/* 不会造成性能问题 */}
                <button onClick={this.handleClick2}>btn2</button>
                
                <button onClick={() => this.handleClick1()}>btn3</button>
                
                <button onClick={this.handleClick4}>btn4</button>
            </div>
        );
    }
}
```

而 hooks 的优点, 一对比就比较明显了

1. 能优化类组件的三大问题

2. 能在无需修改组件结构的情况下复用状态逻辑(自定义 Hooks)

3. 能将组件中相互关联的部分拆分成更小的函数(比如设置订阅或请求数据)

4. 副作用的概念

   > 没有发生数据向视图转换过程中的逻辑被称为副作用.
   > 
   > ajax, 绑定/解绑时间, 订阅/取消订阅
   > 
   > useEffect 会在 全部渲染完毕之后才执行, 比如绑定/解绑事件可以聚集到一个 useEffect 里了.

#### react hooks 的注意事项

1. 只能在函数内部的最外层调用 Hook, 不要在循环、条件判断或者子函数中调用

   > react 的 useState 内部是通过单链表存储的, 必须保证顺序.

2. 只能在 React 的函数组件中调用 Hook, 不要在其它 JavaScript 函数中调用

useEffect 第二个参数传空数组, 就相当于 didMount?

#### react hooks 是怎么实现的

1. useState

简易实现

```tsx
import React from "react";
import ReactDOM from "react-dom";

/*
 * 1. 传入一个初始值, 返回一个状态值和一个改变状态值的方法
 *
 */
export function OriginCounter() {
    cursor = 0; // 下标归零

    const [count, setCount] = useState<number>(0);
    const [name, setName] = useState<string>('哈哈哈');

    const onClick = () => setCount(count + 1);
    const onClickName = () => setName('hahaha' + Math.random());

    return (
        <div>
            <div>{count}</div>
            <button onClick={onClick}>点击+1</button>
            <div>{name}</div>
            <button onClick={onClickName}>点击修改name</button>
        </div>
    );
}

/* 这种实现方式, 只允许调用一次 useState */
// let state: any;

/*
* 为什么 ? 只能在函数内部的最外层调用 Hook, 不要再循环、条件判断或者子函数中调用
*
* 单链表 next => state
*/

let stateArray: any[] = [];
let cursor: number = 0;

function useState<T>(initialState: T): [T, (newState: T) => void] {
    // state = state || initialState;
    // function setState(newState: T) {
    //     state = newState;
    //     render();
    // }
    // return [state, setState];

    const currentCursor = cursor;
    stateArray[currentCursor] = stateArray[currentCursor] || initialState;
    function setState(newState: T) {
        stateArray[currentCursor] = newState;
        render();
    }
    cursor++;
    return [stateArray[currentCursor], setState];
}

export function render() {
    ReactDOM.render(<OriginCounter/>, document.getElementById('root'));
}
```

2. useEffect

简易实现

```tsx
import React, { useState } from 'react';
import ReactDOM from "react-dom";

export function CounterEffect() {
    effectCursor = 0;

    const [count, setCount] = useState(0);

    // didMount, 比如有的逻辑只需要执行一次 deps 置空
    useEffect(() => console.log(count), [count]); // 1. 回调, 2. 依赖项


    useEffect(() => console.log('hahaha'), [count]);

    const onClick = () => setCount(count + 1);

    return (
        <div>
            <div>{count}</div>
            <button onClick={onClick}>点击+1</button>
        </div>
    );
}


/*
* 1. 有两个参数, 第一个是 callback, 第二个是依赖项数组
* 2. 如果依赖项为空数组, 那么只执行一次 callback
* 3. 如果依赖项存在, 那么每当它发生了变化, callback 就会执行
* 4. 如果不存在第二个参数, 那么每次渲染都会执行 callback
*/
// let _deps: any[] | undefined = undefined; // 用来记录 uesEffect 上一次的依赖项

let _allDeps: Array<any[] | undefined> = []; // 用来记录多个 uesEffect 上一次的依赖项
let effectCursor: number = 0;

function useEffect(callback: () => void, deps?: any[]) {
    if (!deps) {
        // 如果没有传入依赖项
        callback();
        // _deps = deps;
        _allDeps[effectCursor] = deps;
        effectCursor++;
        return;
    }

    const _deps = _allDeps[effectCursor]; // 当前 useEffect 上一次记录的依赖项

    const hasChangedDeps = _deps ? deps.some((current, i) => current !== _deps![i]) : true;
    if (hasChangedDeps) {
        callback();
        // _deps = deps;
        _allDeps[effectCursor] = deps;
    }
    effectCursor++;
}

export function render() {
    ReactDOM.render(<CounterEffect/>, document.getElementById('root'));
}
```

#### react hooks 用法详解

1. useState

2. useEffect

3. useMemo

   > 为了性能优化而存在的一个 hook, 把创建的函数和依赖项数组作为参数, 它仅仅会在依赖项发生改变的时候, 重新计算第一个参数的值.
   > 
   > ```tsx
   > import React, {useState, useMemo} from "react";
   > 
   > function SubCounter(props: { onClick: () => void; data: { value: number}}) {
   > console.log("子组件渲染");
   > const {onClick, data} = props;
   > return (
   > <button onClick={onClick}>{data.value}</button>
   > );
   > }
   > 
   > export default function MemoCounter() {
   > console.log("父组件渲染");
   > const [name, setName] = useState<string>("计数器");
   > const [count, setCount] = useState(0);
   > 
   >     const data = {value: count};
   > 
   >     const addClick = () => setCount(count + 1);
   > 
   >     /* useMemo 使子组件只在 data.value 改变的时候重新渲染 */
   >     /* 这里第一个参数可以不直接返回组件, 可以返回其他 */
   >     const MemoSubCounter = useMemo(
   >         () => (<SubCounter data={data} onClick={addClick} />),
   >         [count]
   >     );
   > 
   >     return (
   >         <div>
   >             <input type="text" value={name}
   >                    onChange={(e) => setName(e.target.value)}/>
   >             <p>{data.value}</p>
   >             {MemoSubCounter}
   >         </div>
   >     )
   > }
   > 
   > ```

4. useReducer

   > useReducer + useContext 讲一下模拟 useRedux, 放在 react 实战

5. useDef

6. 自定义 hook useInterval

   > react 实战

7. 自定义 redux

   > react 实战

### 详细代码可参见 仓库 folder 21

