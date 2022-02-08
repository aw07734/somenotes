import {combineReducers} from 'redux';
import {reducer as todoReducer} from './todo';

export const rootReducer = combineReducers({
    todos: todoReducer
});
