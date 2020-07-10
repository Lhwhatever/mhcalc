import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InitialSync } from '../../../components/input/vrift/InitialSyncInput'

export interface Augments {
    sigilHunter?: boolean
    secretResearch?: boolean
    superSiphon?: boolean
    ultimateUmbra?: boolean
    stringStepping?: boolean
}

export interface SimInputsState {
    initialSync: InitialSync
    huntsLeft: number
    steps: number
    augments: Augments
}

export const initialState: SimInputsState = {
    initialSync: 100,
    huntsLeft: 100,
    steps: 0,
    augments: {}
}

interface UpdateAugmentActionPayload {
    target: keyof Augments
    state: boolean
}

const simInputsSlice = createSlice({
    name: 'simInputs',
    initialState,
    reducers: {
        updateInitialSync(state, action: PayloadAction<InitialSync>) {
            state.initialSync = action.payload
        },
        updateHuntsLeft(state, action: PayloadAction<number>) {
            state.huntsLeft = action.payload
        },
        updateSteps(state, action: PayloadAction<number>) {
            state.steps = action.payload
        },
        updateAugment(state, action: PayloadAction<UpdateAugmentActionPayload>) {
            state.augments[action.payload.target] = action.payload.state
        }
    }
})

export const { updateInitialSync, updateHuntsLeft, updateSteps, updateAugment } = simInputsSlice.actions

const simInputReducer = simInputsSlice.reducer

export default simInputReducer