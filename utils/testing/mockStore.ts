import configureMockStore from 'redux-mock-store'
import { getDefaultMiddleware } from '@reduxjs/toolkit'

const mockStore = configureMockStore(getDefaultMiddleware())

export default mockStore
