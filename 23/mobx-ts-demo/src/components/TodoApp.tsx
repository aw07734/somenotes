import React, {useState, useCallback} from 'react';
import {observer} from 'mobx-react';
import Todos from "../mobx/todo";

const TodoApp = ({todos}: {todos: Todos}) => {
    const [text, setText] = useState("");

    const onChangeTextInput = useCallback((e) => {
        const newText = e.currentTarget.value;
        setText(newText);
    }, [text]);

    const onClickAdd = () => {
        todos.addTodo(text).then(r => setText(""));
    };

    return (
        <div>
            <div>
                <input type="text" value={text} onChange={onChangeTextInput}/>
                <button onClick={onClickAdd}>增加</button>
            </div>
            <ul>
                {
                    todos.data.map(todo => {
                        const {id, text} = todo;
                        return (
                            <li key={id}>{text}</li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default observer(TodoApp);
