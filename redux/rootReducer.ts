import { combineReducers } from 'redux'
import vriftReducer from './ducks/vrift/vrift'

const rootReducer = combineReducers({
    vrift: vriftReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
