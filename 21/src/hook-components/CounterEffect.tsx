import React, { useState } from 'react';
import ReactDOM from "react-dom";

export function CounterEffect() {
    effectCursor = 0;

    const [count, setCount] = useState(0);

    // didMount, 比如有的逻辑只需要执行一次 deps 置空
    useEffect(() => console.log(count), [count]); // 1. 回调, 2. 依赖项

    useEffect(() => console.log('只执行一次'), []);

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

    // 如果传入了依赖项
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
