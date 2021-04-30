import {SET_FEED, SET_FEED_ERROR,} from "../actions/actionTypes";

const initFeedState = {
    feed: [null,null,null],
    page: 1,
    last_page: 1,
    error: false
}

export default function feedReducer(state = initFeedState, action){
    switch (action.type){
        case SET_FEED:
            return ({...state,feed: state.feed.concat(action.payload.data).filter(e => e != null), page: action.payload.page, last_page: action.payload.last_page})
        case SET_FEED_ERROR:
            return ({...state, error: action.payload })
        default:
            return state
    }
}


