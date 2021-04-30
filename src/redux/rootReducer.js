import {combineReducers} from 'redux'
import auth from './reducers/auth'
import counter from './reducers/counter'
import global from './reducers/global'
import feed from './reducers/feed'

export default combineReducers({
    auth,
    counter,
    global,
    feed
})
