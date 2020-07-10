import React from 'react'
import { createShallow } from '@material-ui/core/test-utils'
import { TextField } from '@material-ui/core'
import IntegerInput, { IntegerInputProps } from '../IntegerInput'
import { coerceToRange } from '../../../utils/number'
import { ShallowWrapper } from 'enzyme'
import { InputChangeEvent, InputFocusEvent } from '../types'

jest.mock('../../../utils/number', () => ({
    coerceToRange: jest.fn()
}))

describe('IntegerInput test', () => {
    let shallow: ReturnType<typeof createShallow>
    let wrapper: ShallowWrapper<IntegerInputProps>

    const onChange = jest.fn()

    beforeAll(() => {
        shallow = createShallow()
    })

    beforeEach(() => {
        wrapper = shallow(<IntegerInput onChange={onChange} />)
    })

    it('should use TextField[type="number"]', () => {
        expect(wrapper.find(TextField)).toHaveLength(1)
        expect(wrapper.find(TextField).prop('type')).toStrictEqual('number')
    })

    it('should only accept numeric input or empty input', () => {
        const invokeChange = (value: string) =>
            wrapper.find(TextField).invoke('onChange')!({ type: 'change', target: { value } } as InputChangeEvent)

        invokeChange('1a')
        expect(onChange).not.toBeCalled()

        invokeChange('1')
        expect(onChange).toBeCalledWith(1)

        invokeChange('20')
        expect(onChange).toBeCalledWith(20)

        invokeChange('-15')
        expect(onChange).toBeCalledWith(-15)

        invokeChange('')
        expect(onChange).toBeCalledWith(undefined)
    })

    it('should pass min and max props to the input field underneath', () => {
        wrapper.setProps({ min: -42, max: 9001 })

        const inputProps = wrapper.find(TextField).prop('inputProps')
        expect(inputProps).toBeDefined()
        expect(inputProps!.min).toBe(-42)
        expect(inputProps!.max).toBe(9001)
    })

    it('should, on unfocus, coerce undefined to zero and all values to the given min/max range', () => {
        const invokeUnfocus = () => wrapper.find(TextField).invoke('onBlur')!({} as InputFocusEvent)

        wrapper.setProps({ value: 5, min: 1, max: undefined })
        invokeUnfocus()
        expect(onChange).not.toBeCalled()

        wrapper.setProps({ value: 5, min: undefined, max: 10 })
        invokeUnfocus()
        expect(onChange).not.toBeCalled()

        wrapper.setProps({ value: undefined, min: undefined, max: undefined })
        invokeUnfocus()
        expect(onChange).toBeCalled()
        expect(coerceToRange).toBeCalled()
        expect(coerceToRange).toBeCalledWith(0, -Infinity, +Infinity)

        wrapper.setProps({ value: undefined, min: 1, max: 10 })
        invokeUnfocus()
        expect(coerceToRange).toBeCalledWith(0, 1, 10)
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
