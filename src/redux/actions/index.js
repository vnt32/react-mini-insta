import {ADD, APPEND, LOGIN, LOGOUT, RESET, SUB} from "./actionTypes";

export function add () {
    return {
        type: ADD
    }
}
export function sub () {
    return {
        type: SUB
    }
}
export function append (value) {
    return {
        type: APPEND,
        value
    }
}
export function reset () {
    return {
        type: RESET
    }
}
export function appendAsync (number) {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(append(number))
        }, 3000)
    }
}
export function login () {
    return {
        type: LOGIN
    }
}
export function logout () {
    return {
        type: LOGOUT
    }
}
