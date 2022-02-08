import {ADD_TODO_TYPE} from "../actions/todo";

const initialState = [];

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO_TYPE: {
            return [...state, action.payload];
        }
        // case 'add_todo_request': {
        //     return;
        // }
        default: {
            return state;
        }
    }
};
