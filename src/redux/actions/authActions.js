import {SET_USER} from "./actionTypes";
import {getCookie, setCookie} from 'react-use-cookie'
import axios from "../../axios";
import {setGlobalLoader} from "./globalActions";


export function auth () {
    return (dispatch) => {
        if(getCookie('token')){
            dispatch(setGlobalLoader(true))
            axios.get('me')
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


export function logout () {
    return (dispatch) => {
        setCookie('token', null)
        dispatch(setUser())
    }
}
