import {observable, action} from 'mobx';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class Todo {
    id = Math.random();
    text = "";
}

export default class Todos {
    @observable
    data: Array<Todo> = [];

    @action
    async addTodo(text: string): Promise<void> {
        await sleep(1000);
        const todo = new Todo();
        todo.text = text;
        this.data.push(todo);
    }
}
