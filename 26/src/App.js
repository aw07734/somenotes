import React, {useState} from "react";
import FormCreate from "./Form";
import './App.css';

function App({form}) {
    return (
        <div className="App">
            <input {...form.getFieldsProps('username', {
                validator: [
                    {
                        required: true,
                        message: 'username 为必填项'
                    },
                    {
                        min: 2,
                        max: 20,
                        message: 'username 必须为 2-20 长度'
                    }
                ]
            })} />
            <div {...form.getFieldsError('username')} />
            <br/>
            <input {...form.getFieldsProps('password', {
                disabled(data) {
                    console.log(data);
                    return data.username === '123';
                }
            })} />
            <br/>
            <button onClick={e => console.log(form.getFieldsValue())}>
                提交
            </button>
        </div>
    );
}

export default FormCreate(App);
