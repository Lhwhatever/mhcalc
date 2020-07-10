import { combineReducers } from 'redux'
import { simInputReducer } from './simInput'

export default combineReducers({
    simInput: simInputReducer
})
