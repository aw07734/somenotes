export const ADD_TODO_TYPE = 'add_todo';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const addTodo = (text) => {
    return dispatch => {
        sleep(1000).then(() => dispatch({
            type: ADD_TODO_TYPE,
            payload: {
                id: new Date().getTime(),
                text
            }
        }));
    }
};
