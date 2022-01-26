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
