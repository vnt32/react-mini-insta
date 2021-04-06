import {SET_USER} from "../actions/actionTypes";

const initState = {
    user: null
}

export default function authReducer(state = initState, action){
    switch (action.type){
        case SET_USER:
            return {...state,user: action.payload}
        default: return state
    }
}
