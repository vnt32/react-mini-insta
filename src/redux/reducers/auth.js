import {LOGIN, LOGOUT} from "../actions/actionTypes";

const initState = {
    // loggedIn: localStorage.getItem('loggedIn') === 'true'
    loggedIn: false
}

export default function authReducer(state = initState, action){
    switch (action.type){
        case LOGIN:
            localStorage.setItem('loggedIn', 'true')
            return {loggedIn: true}
        case LOGOUT:
            localStorage.setItem('loggedIn', 'false')
            return {loggedIn: false}
        default: return state
    }
}
