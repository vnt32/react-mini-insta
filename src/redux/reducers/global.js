import {SET_GLOBAL_LOADER, SET_TOP_LOADER, SET_BACKGROUND_TASK} from "../actions/actionTypes";

const initState = {
    gLoader: true,
    topLoader: false,
    background: null,
}

export default function counterReducer(state = initState, action){
    switch (action.type){
        case SET_GLOBAL_LOADER:
            return ({...state, gLoader: action.payload})
        case SET_TOP_LOADER:
            return ({...state, topLoader: action.payload})
        case SET_BACKGROUND_TASK:
            return ({...state, background: action.payload})
        default:
            return state
    }
}
