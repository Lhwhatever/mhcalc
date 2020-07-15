import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Siphon, Speed } from './stats'

export interface BaseSetupState {
    power?: number
    luck?: number
    champFire?: boolean
    speed: Speed
}

export type RegularSetupState = BaseSetupState

export type EclipseSetupState = BaseSetupState & {
    siphon: Siphon
}

export interface SetupState {
    eclipse: Record<number, EclipseSetupState>
    regular: Record<number, RegularSetupState>
}

export const initialState: SetupState = {
    eclipse: { [1]: { champFire: true, speed: 10, siphon: 5 } },
    regular: {
        [1]: { speed: 10 },
        [9]: { speed: 10 },
        [17]: { speed: 10 },
        [25]: { speed: 10 }
    }
}

type Action<V> = {
    type: keyof SetupState
    level: number
    value: V
}

const prepareFunc = <T extends keyof SetupState, V>(type: T, value: V, level: number) => ({
    payload: { type, level, value }
})

const createReducer = <S extends keyof BaseSetupState>(stat: S) => (
    state: SetupState,
    action: PayloadAction<Action<BaseSetupState[S]>>
) => {
    const { type, value, level } = action.payload
    state[type][level] = { ...state[type][level], [stat]: value }
}

const create = <S extends keyof BaseSetupState>(stat: S) => ({
    reducer: createReducer(stat),
    prepare: prepareFunc
})

const setupsSlice = createSlice({
    name: 'simSetup',
    initialState,
    reducers: {
        updatePower: create('power'),
        updateLuck: create('luck'),
        updateChampFire: create('champFire'),
        updateSpeed: create('speed'),
        updateSiphon: {
            reducer: (state, action: PayloadAction<{ level: number; value: Siphon }>) => {
                const { level, value } = action.payload
                state.eclipse[level].siphon = value
            },
            prepare: (value: Siphon, level = 1) => ({
                payload: { level, value }
            })
        }
    }
})

export const { updatePower, updateLuck, updateChampFire, updateSpeed, updateSiphon } = setupsSlice.actions

const setupsReducer = setupsSlice.reducer

export default setupsReducer
