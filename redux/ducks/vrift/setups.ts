import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Siphon, Speed } from './stats'

export interface BaseSetupState {
    power: Record<number, number | undefined>
    luck: Record<number, number | undefined>
    champFire: Record<number, boolean>
}

export interface SetupState {
    speed: Record<number, Speed>
    siphon: Record<number, Siphon>
    regular: BaseSetupState
    eclipse: BaseSetupState
}

export const initialState: SetupState = {
    speed: { [1]: 10 },
    siphon: { [1]: 25 },
    regular: { power: { [1]: undefined }, luck: { [1]: undefined }, champFire: { [1]: false } },
    eclipse: { power: { [1]: undefined }, luck: { [1]: undefined }, champFire: { [1]: true } }
}

interface UpdateSharedStatPayload<T> {
    floor: number
    value: T
}

interface UpdateStatPayload<T> {
    floor: number
    target: 'regular' | 'eclipse'
    value: T
}

interface DeleteSharedStatPayload {
    floor: number
}

interface DeleteStatPayload {
    floor: number
    target: 'regular' | 'eclipse'
}

const updateSharedStat = <T>(statRecord: Record<number, T>, payload: UpdateSharedStatPayload<T>) => {
    const { floor, value } = payload

    Object.keys(statRecord).forEach((key) => {
        const floorInRecord = parseInt(key, 10)
        if (floorInRecord <= floor) return
        if (statRecord[floorInRecord] <= value) delete statRecord[floorInRecord]
    })

    statRecord[floor] = value
}

const deleteSharedStatFactory = <T extends 'speed' | 'siphon'>(stat: T) => ({
    reducer: (state: SetupState, action: PayloadAction<DeleteSharedStatPayload>) => {
        if (action.payload.floor > 1) delete state[stat][action.payload.floor]
    },
    prepare: (floor: number) => ({ payload: { floor } })
})

const deleteStatFactory = <T extends keyof BaseSetupState>(stat: T) => ({
    prepare: (target: 'eclipse' | 'regular', floor: number) => ({ payload: { target, floor } }),
    reducer: (state: SetupState, action: PayloadAction<DeleteStatPayload>) => {
        const { target, floor } = action.payload
        if (floor > 1) delete state[target][stat][floor]
    }
})

const setupsSlice = createSlice({
    name: 'simSetup',
    initialState,
    reducers: {
        updateSpeed(state, action: PayloadAction<UpdateSharedStatPayload<Speed>>) {
            updateSharedStat(state.speed, action.payload)
        },
        updateSiphon(state, action: PayloadAction<UpdateSharedStatPayload<Siphon>>) {
            updateSharedStat(state.siphon, action.payload)
        },
        updatePower(state, action: PayloadAction<UpdateStatPayload<number | undefined>>) {
            const { floor, target, value } = action.payload
            state[target].power[floor] = value
        },
        updateLuck(state, action: PayloadAction<UpdateStatPayload<number | undefined>>) {
            const { floor, target, value } = action.payload
            state[target].luck[floor] = value
        },
        updateChampFire(state, action: PayloadAction<UpdateStatPayload<boolean>>) {
            const { floor, target, value } = action.payload
            state[target].champFire[floor] = value
        },
        deleteSpeed: deleteSharedStatFactory('speed'),
        deleteSiphon: deleteSharedStatFactory('siphon'),
        deletePower: deleteStatFactory('power'),
        deleteLuck: deleteStatFactory('luck'),
        deleteChampFire: deleteStatFactory('champFire')
    }
})

export const { updateSpeed, updateSiphon, updatePower, updateLuck, updateChampFire } = setupsSlice.actions
export const { deleteSpeed, deleteSiphon, deletePower, deleteLuck, deleteChampFire } = setupsSlice.actions

const setupsReducer = setupsSlice.reducer

export default setupsReducer
