/*
* createState`s simple-implement
*/
export function createStore(reducer) {
    let state;

    function getState() {
        return state;
    }

    function dispatch(action) {
        state = reducer(state, action);
        return action;
    }

    dispatch({type: '@@init'});

    return {
        getState,
        dispatch
    };
}
