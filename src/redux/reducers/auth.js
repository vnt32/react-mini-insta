import {SET_USER, SET_USER_FOLLOWED} from "../actions/actionTypes";

const initState = {
    user: null
}

export default function authReducer(state = initState, action){
    switch (action.type){
        case SET_USER:
            return {...state,user: action.payload}
        case SET_USER_FOLLOWED: 
            return {user:{...state.user, followed_count: action.payload ? state.user.followed_count + 1 : state.user.followed_count - 1} } 
        default: return state
    }
}
