import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Siphon, Speed } from './stats'

type SharedStat = 'speed' | 'siphon'

export interface BaseSetupState {
    power: Record<number, number | undefined>
    luck: Record<number, number | undefined>
    champFire: Record<number, boolean>
}

type FloorType = 'regular' | 'eclipse'

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
    target: FloorType
    value: T
}

interface DeleteSharedStatPayload {
    floor: number
}

interface DeleteStatPayload {
    floor: number
    target: FloorType
}

interface ChangeSharedStatFloorPayload {
    stat: SharedStat
    oldFloor: number
    newFloor: number
}

interface ChangeStatFloorPayload {
    stat: keyof BaseSetupState
    target: FloorType
    oldFloor: number
    newFloor: number
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

const createReducerDeleteSharedStat = <T extends SharedStat>(stat: T) => ({
    reducer: (state: SetupState, action: PayloadAction<DeleteSharedStatPayload>) => {
        if (action.payload.floor > 1) delete state[stat][action.payload.floor]
    },
    prepare: (floor: number) => ({ payload: { floor } })
})

const createReducerDeleteStat = <T extends keyof BaseSetupState>(stat: T) => ({
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
        deleteSpeed: createReducerDeleteSharedStat('speed'),
        deleteSiphon: createReducerDeleteSharedStat('siphon'),
        deletePower: createReducerDeleteStat('power'),
        deleteLuck: createReducerDeleteStat('luck'),
        deleteChampFire: createReducerDeleteStat('champFire'),
        changeFloorSharedStat(state, action: PayloadAction<ChangeSharedStatFloorPayload>) {
            const { stat, oldFloor, newFloor } = action.payload
            state[stat][newFloor] = state[stat][oldFloor]
            delete state[stat][oldFloor]
        },
        changeFloorStat(state, action: PayloadAction<ChangeStatFloorPayload>) {
            const { stat, oldFloor, target, newFloor } = action.payload
            state[target][stat][newFloor] = state[target][stat][oldFloor]
            delete state[target][stat][oldFloor]
        }
    }
})

export function changeFloorOfStat(payload: ChangeStatFloorPayload): PayloadAction<ChangeStatFloorPayload>
export function changeFloorOfStat(payload: ChangeSharedStatFloorPayload): PayloadAction<ChangeSharedStatFloorPayload>
export function changeFloorOfStat(
    payload: ChangeSharedStatFloorPayload | ChangeStatFloorPayload
): PayloadAction<ChangeStatFloorPayload> | PayloadAction<ChangeSharedStatFloorPayload> {
    if ('target' in payload) {
        return setupsSlice.actions.changeFloorStat(payload)
    } else {
        return setupsSlice.actions.changeFloorSharedStat(payload)
    }
}

export const { updateSpeed, updateSiphon, updatePower, updateLuck, updateChampFire } = setupsSlice.actions
export const { deleteSpeed, deleteSiphon, deletePower, deleteLuck, deleteChampFire } = setupsSlice.actions

const setupsReducer = setupsSlice.reducer

export default setupsReducer
