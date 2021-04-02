import {ADD, APPEND, APPEND_ASYNC, RESET, SUB} from "../actions/actionTypes";

const initState = {
    counter: 0
}

export default function counterReducer(state = initState, action){
    switch (action.type){
        case ADD:
            return ({counter: state.counter++})
        case SUB:
            return ({counter: state.counter--})
        case APPEND:
            return ({counter: state.counter + action.value})
        case RESET:
            return ({counter: 0})
        case APPEND_ASYNC:
            return ({counter: 0})
        default:
            return state
    }
}
