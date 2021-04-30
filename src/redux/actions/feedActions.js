import api from "../../api";
import {setTopLoader} from "./globalActions";
import {SET_FEED, SET_FEED_ERROR} from "./actionTypes";

export function setFeed(payload){
    return {
        type: SET_FEED,
        payload
    }
}

export function setFeedError(payload){
    return {
        type: SET_FEED_ERROR,
        payload
    }
}

export function getFeed(page){
    return async (dispatch) => {
        dispatch(setFeedError(false))
        dispatch(setTopLoader(true))
        try {
            const { data } = await api.posts.getFeed(page)
            dispatch(setFeed(data))
        } catch (e){
            dispatch(setFeedError(true))
        } finally {
            dispatch(setTopLoader(false))
        }

    }
}
