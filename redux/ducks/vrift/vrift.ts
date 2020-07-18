import { combineReducers } from 'redux'
import simInputReducer from './simInput'
import setupsReducer from './setups'

export default combineReducers({
    simInput: simInputReducer,
    setups: setupsReducer
})
