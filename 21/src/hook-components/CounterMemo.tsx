import React, {useState, useMemo} from "react";

function SubCounter(props: { onClick: () => void; data: { value: number}}) {
    console.log("子组件渲染");
    const {onClick, data} = props;
    return (
        <button onClick={onClick}>{data.value}</button>
    );
}

export default function MemoCounter() {
    console.log("父组件渲染");
    const [name, setName] = useState<string>("计数器");
    const [count, setCount] = useState(0);

    const data = {value: count};

    const addClick = () => setCount(count + 1);

    /* useMemo 使子组件只在 data.value 改变的时候重新渲染 */
    /* 这里第一个参数可以不直接返回组件, 可以返回其他 */
    const MemoSubCounter = useMemo(
        () => (<SubCounter data={data} onClick={addClick} />),
        [count]
    );

    return (
        <div>
            <input type="text" value={name}
                   onChange={(e) => setName(e.target.value)}/>
            <p>{data.value}</p>
            {MemoSubCounter}
        </div>
    )
}
