import { Tooltip, Button, TextField } from '@material-ui/core'
import { createMount, createShallow } from '@material-ui/core/test-utils'
import InfoIconOutlined from '@material-ui/icons/InfoOutlined'
import React from 'react'
import HuntsLeftInput from '../HuntsLeftInput'
import InitialSyncInput from '../InitialSyncInput'
import StepsInput from '../StepsInput'
import CurrentProgressInputGroup, { CurrentProgressInputGroupProps } from '../CurrentProgressInputGroup'
import { ShallowWrapper, ReactWrapper } from 'enzyme'
import { InputChangeEvent, InputFocusEvent } from '../../types'

describe('CurrentProgressInputGroup test', () => {
    let shallow: ReturnType<typeof createShallow>
    let wrapper: ShallowWrapper<CurrentProgressInputGroupProps>

    beforeAll(() => {
        shallow = createShallow()
    })

    beforeEach(() => {
        wrapper = shallow(
            <CurrentProgressInputGroup
                initialSync={100}
                onInitialSyncChange={jest.fn()}
                huntsLeft={100}
                onHuntsLeftChange={jest.fn()}
                steps={0}
                onStepsChange={jest.fn()}
            />
        )
    })

    it('should have a header', () => {
        expect(wrapper.text()).toMatch(/current progress/i)
    })

    it('should have the correct inputs', () => {
        expect(wrapper.find(InitialSyncInput)).toHaveLength(1)
        expect(wrapper.find(HuntsLeftInput)).toHaveLength(1)
        expect(wrapper.find(StepsInput)).toHaveLength(1)
    })

    it('should have a Tooltip > InfoOutlined', () => {
        const infoTooltip = wrapper.find(Tooltip).filterWhere((node) => node.contains(<InfoIconOutlined />))
        expect(infoTooltip).toHaveLength(1)
    })

    it('should have a button to reset progress', () => {
        const btn = wrapper.find(Button).filter('#btn-reset-run')
        expect(btn).toHaveLength(1)
        expect(btn.text()).toMatch(/reset progress/i)
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
})

describe('CurrentProgressInputGroup integration test', () => {
    let props: CurrentProgressInputGroupProps
    let mount: ReturnType<typeof createMount>
    let wrapper: ReactWrapper<CurrentProgressInputGroupProps>

    beforeAll(() => {
        mount = createMount()
        props = {
            initialSync: 100,
            onInitialSyncChange: jest.fn(),
            huntsLeft: 5,
            onHuntsLeftChange: jest.fn(),
            steps: 200,
            onStepsChange: jest.fn()
        }
    })

    beforeEach(() => {
        wrapper = mount(<CurrentProgressInputGroup {...props} />)
    })

    it('should handle input from InitialSyncInput', () => {
        wrapper.find(InitialSyncInput).invoke('onChange')!({
            type: 'input',
            target: { value: '70' }
        } as InputChangeEvent)
        expect(props.onInitialSyncChange).toBeCalledTimes(1)
        expect(props.onInitialSyncChange).lastCalledWith(70)
    })

    it('should only allow empty input or input of natural numbers in HuntsLeftInput', () => {
        const invokeOnChange = (newHuntsLeft: string) =>
            wrapper.find(HuntsLeftInput).find(TextField).invoke('onChange')!({
                type: 'input',
                target: { value: newHuntsLeft }
            } as InputChangeEvent)

        invokeOnChange('10a')
        expect(props.onHuntsLeftChange).not.toBeCalled()

        invokeOnChange('-10')
        expect(props.onHuntsLeftChange).toBeCalled()
        expect(props.onHuntsLeftChange).lastCalledWith(-10)

        invokeOnChange('10')
        expect(props.onHuntsLeftChange).lastCalledWith(10)

        invokeOnChange('')
        expect(props.onHuntsLeftChange).lastCalledWith(undefined)
    })

    it('should reset empty input or input of 0 to HuntsLeftInput to 1', () => {
        const invokeOnBlur = () => wrapper.find(HuntsLeftInput).find(TextField).invoke('onBlur')!({} as InputFocusEvent)

        invokeOnBlur()
        expect(props.onHuntsLeftChange).not.toBeCalled()

        wrapper.setProps({ huntsLeft: 0 })
        invokeOnBlur()
        expect(props.onHuntsLeftChange).toBeCalledTimes(1)
        expect(props.onHuntsLeftChange).lastCalledWith(1)

        wrapper.setProps({ huntsLeft: -10 })
        invokeOnBlur()
        expect(props.onHuntsLeftChange).toBeCalledTimes(2)
        expect(props.onHuntsLeftChange).lastCalledWith(1)

        wrapper.setProps({ huntsLeft: undefined })
        invokeOnBlur()
        expect(props.onHuntsLeftChange).toBeCalledTimes(3)
        expect(props.onHuntsLeftChange).lastCalledWith(1)
    })

    it('should only allow empty input or input of natural numbers in StepsInput', () => {
        const invokeOnChange = (newSteps: string) =>
            wrapper.find(StepsInput).find(TextField).invoke('onChange')!({
                type: 'input',
                target: { value: newSteps }
            } as InputChangeEvent)

        invokeOnChange('10a')
        expect(props.onStepsChange).not.toBeCalled()

        invokeOnChange('10')
        expect(props.onStepsChange).toBeCalled()
        expect(props.onStepsChange).lastCalledWith(10)

        invokeOnChange('')
        expect(props.onStepsChange).lastCalledWith(undefined)

        invokeOnChange('-10')
        expect(props.onStepsChange).lastCalledWith(-10)

        invokeOnChange('0')
        expect(props.onStepsChange).lastCalledWith(0)
    })

    it('should be able to reset to start of run', () => {
        wrapper.find(Button).filter('#btn-reset-run').invoke('onClick')!({} as React.MouseEvent<HTMLButtonElement>)

        expect(props.onHuntsLeftChange).toBeCalledTimes(1)
        expect(props.onHuntsLeftChange).lastCalledWith(props.initialSync)

        expect(props.onStepsChange).toBeCalledTimes(1)
        expect(props.onStepsChange).lastCalledWith(0)
    })
})
