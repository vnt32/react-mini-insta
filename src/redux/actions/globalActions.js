import {SET_GLOBAL_LOADER, SET_TOP_LOADER} from "./actionTypes";

export function setGlobalLoader(value){
    return {
        type: SET_GLOBAL_LOADER,
        payload: value
    }
}
export function setTopLoader(value){
    return {
        type: SET_TOP_LOADER,
        payload: value
    }
}
