import { Button, TextField } from '@material-ui/core'
import { createMount } from '@material-ui/core/test-utils'
import { ReactWrapper } from 'enzyme'
import React from 'react'
import { updateHuntsLeft, updateInitialSync, updateSteps } from '../../../../redux/ducks/vrift/simInput'
import store from '../../../../redux/store'
import { InputChangeEvent, InputFocusEvent } from '../../types'
import CurrentProgressInputGroup from '../CurrentProgressInputGroup'
import HuntsLeftInput from '../HuntsLeftInput'
import InitialSyncInput from '../InitialSyncInput'
import StepsInput from '../StepsInput'
import { Provider } from 'react-redux'

describe('CurrentProgressInputGroup integration test', () => {
    let mount: ReturnType<typeof createMount>
    let wrapper: ReactWrapper

    const invokeHuntsLeftOnChange = (newHuntsLeft: string) =>
        wrapper.find(HuntsLeftInput).find(TextField).invoke('onChange')!({
            target: { value: newHuntsLeft }
        } as InputChangeEvent)

    const invokeStepsOnChange = (newSteps: string) =>
        wrapper.find(StepsInput).find(TextField).invoke('onChange')!({
            target: { value: newSteps }
        } as InputChangeEvent)

    beforeAll(() => {
        mount = createMount()
    })

    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}>
                <CurrentProgressInputGroup />
            </Provider>
        )
    })

    it('should handle input from InitialSyncInput', () => {
        wrapper.find(InitialSyncInput).invoke('onChange')!({ target: { value: '70' } } as InputChangeEvent)
        expect(store.getState().vrift.simInput.initialSync).toBe(70)
    })

    it('should only allow empty input or input of natural numbers in HuntsLeftInput', () => {
        invokeHuntsLeftOnChange('10a')
        expect(store.getState().vrift.simInput.huntsLeft).toBe(100)

        invokeHuntsLeftOnChange('-10')
        expect(store.getState().vrift.simInput.huntsLeft).toBe(-10)

        invokeHuntsLeftOnChange('25')
        expect(store.getState().vrift.simInput.huntsLeft).toBe(25)

        invokeHuntsLeftOnChange('')
        expect(store.getState().vrift.simInput.huntsLeft).toBe(undefined)
    })

    it('should reset empty input or non-positive input to HuntsLeftInput to 1', () => {
        const invokeHuntsLeftOnChange = (newHuntsLeft: string) =>
            wrapper.find(HuntsLeftInput).find(TextField).invoke('onChange')!({
                target: { value: newHuntsLeft }
            } as InputChangeEvent)
        const invokeOnBlur = () => wrapper.find(HuntsLeftInput).find(TextField).invoke('onBlur')!({} as InputFocusEvent)

        invokeHuntsLeftOnChange('50')
        invokeOnBlur()
        expect(store.getState().vrift.simInput.huntsLeft).toBe(50)

        invokeHuntsLeftOnChange('1')
        invokeOnBlur()
        expect(store.getState().vrift.simInput.huntsLeft).toBe(1)

        invokeHuntsLeftOnChange('-10')
        invokeOnBlur()
        expect(store.getState().vrift.simInput.huntsLeft).toBe(1)

        invokeHuntsLeftOnChange('')
        invokeOnBlur()
        expect(store.getState().vrift.simInput.huntsLeft).toBe(1)
    })

    it('should only allow empty input or input of natural numbers in StepsInput', () => {
        invokeStepsOnChange('10a')
        expect(store.getState().vrift.simInput.steps).toBe(0)

        invokeStepsOnChange('10')
        expect(store.getState().vrift.simInput.steps).toBe(10)

        invokeStepsOnChange('')
        expect(store.getState().vrift.simInput.steps).toBe(undefined)

        invokeStepsOnChange('-10')
        expect(store.getState().vrift.simInput.steps).toBe(-10)

        invokeStepsOnChange('0')
        expect(store.getState().vrift.simInput.steps).toBe(0)
    })

    it('should reset empty input or negative input to StepsInput to 1', () => {
        const invokeOnBlur = () => wrapper.find(StepsInput).find(TextField).invoke('onBlur')!({} as InputFocusEvent)

        invokeStepsOnChange('50')
        invokeOnBlur()
        expect(store.getState().vrift.simInput.steps).toBe(50)

        invokeStepsOnChange('0')
        invokeOnBlur()
        expect(store.getState().vrift.simInput.steps).toBe(0)

        invokeStepsOnChange('-10')
        invokeOnBlur()
        expect(store.getState().vrift.simInput.steps).toBe(0)

        invokeStepsOnChange('')
        invokeOnBlur()
        expect(store.getState().vrift.simInput.steps).toBe(0)
    })

    it('should be able to reset to start of run', () => {
        store.dispatch(updateInitialSync(70))
        store.dispatch(updateSteps(15))

        wrapper.find(Button).filter('#btn-reset-run').invoke('onClick')!({} as React.MouseEvent<HTMLButtonElement>)

        expect(store.getState().vrift.simInput.huntsLeft).toBe(70)
        expect(store.getState().vrift.simInput.steps).toBe(0)
    })
})
