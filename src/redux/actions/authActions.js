import {SET_USER, SET_USER_FOLLOWED} from "./actionTypes";
import {getCookie, setCookie} from 'react-use-cookie'
import api from "../../api";
import {setGlobalLoader} from "./globalActions";


export function auth () {
    return (dispatch) => {
        if(getCookie('token')){
            dispatch(setGlobalLoader(true))
            api.profile.me()
                .then(({data})=>dispatch(setUser(data)))
                .catch(()=>dispatch(setUser(null)))
                .finally(()=>dispatch(setGlobalLoader(false)))
        }else{
            dispatch(setGlobalLoader(false))
        }
    }
}

export function setUser (value = null){
    return {
        type: SET_USER,
        payload: value
    }
}

export function setUserFollowed(value = false){
    return {
        type: SET_USER_FOLLOWED,
        payload: value
    }
}


export function logout () {
    return (dispatch) => {
        setCookie('token', '')
        dispatch(setUser())
    }
}
