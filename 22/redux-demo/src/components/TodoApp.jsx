import React, {useState, useCallback} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {addTodo} from "../redux/actions/todo";

const TodoApp = () => {
    const [text, setText] = useState("");
    const todos = useSelector(store => store.todos);

    const onChangeTextInput = useCallback((e) => {
        const newText = e.currentTarget.value;
        setText(newText);
    }, [text]);

    const dispatch = useDispatch();
    const onClickAdd = () => {
        dispatch(addTodo(text));
        setText("");
    };

    return (
        <div>
            <div>
                <input type="text" value={text} onChange={onChangeTextInput}/>
                <button onClick={onClickAdd}>增加</button>
            </div>
            <ul>
                {
                    todos.map(todo => {
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

export default TodoApp;
