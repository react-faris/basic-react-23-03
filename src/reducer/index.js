import { combineReducers } from 'redux'
import counterReducer from './counter'
import articles from './articles'
import selectors from './selectors'

export default combineReducers({
    counter: counterReducer,
    articles,
    selectors
})