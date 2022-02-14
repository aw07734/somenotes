import {createStore, compose, applyMiddleware} from 'redux';
import {rootReducer} from "./reducer";
import ReduxThunk from 'redux-thunk';

const store = createStore(
    rootReducer,
    compose(applyMiddleware(ReduxThunk))
);

export default store;

window.store = store;
