import {SET_GLOBAL_LOADER, SET_TOP_LOADER} from "../actions/actionTypes";

const initState = {
    gLoader: true,
    topLoader: false
}

export default function counterReducer(state = initState, action){
    switch (action.type){
        case SET_GLOBAL_LOADER:
            return ({gLoader: action.payload})
        case SET_TOP_LOADER:
            return ({counter: action.payload})
        default:
            return state
    }
}
