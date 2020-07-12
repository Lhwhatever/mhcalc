import * as number from '../../../utils/number'
import { createSetup, fireEvent, screen } from '../../../utils/testing/test'
import { createChangeEvent } from '../../../utils/testing/event'
import IntegerInput, { IntegerInputProps } from '../IntegerInput'

describe('IntegerInput test', () => {
    const coerceToRangeSpy = jest.spyOn(number, 'coerceToRange')

    const props: IntegerInputProps = {
        label: 'foo',
        id: 'foo',
        onChange: jest.fn()
    }

    const setup = createSetup(IntegerInput, props)

    const getInput = () => screen.getByLabelText('foo')

    it('should have a label', () => {
        setup()
        const input = getInput()

        expect(input).toBeInTheDocument()
    })

    it('should use type number', () => {
        setup()
        const input = getInput()

        expect(input).toHaveProperty('type', 'number')
    })

    it('should accept integral or empty input', () => {
        setup()
        const input = getInput()

        fireEvent.change(input, createChangeEvent('42'))
        expect(props.onChange).lastCalledWith(42)

        fireEvent.change(input, createChangeEvent('-1'))
        expect(props.onChange).lastCalledWith(-1)
    })

    it('should reject non-integral input', () => {
        setup()
        const input = getInput()

        fireEvent.change(input, createChangeEvent('1a'))
        expect(props.onChange).not.toBeCalled()

        fireEvent.change(input, createChangeEvent('1.5'))
        expect(props.onChange).not.toBeCalled()
    })

    it('should pass the min and max properties to input', () => {
        const { rerender } = setup({ min: 1 })
        const input = getInput()

        expect(input).toHaveAttribute('min', '1')
        expect(input).not.toHaveAttribute('max')

        rerender({ max: 5 })
        expect(input).not.toHaveAttribute('min')
        expect(input).toHaveAttribute('max', '5')

        rerender({ min: 1, max: 5 })
        expect(input).toHaveAttribute('min', '1')
        expect(input).toHaveAttribute('max', '5')
    })

    it('should, on blur, try to coerce values into the given range', () => {
        setup({ value: -1, min: 1, max: 5 })
        const input = getInput()

        fireEvent.blur(input)
        expect(coerceToRangeSpy).lastCalledWith(-1, 1, 5)
        expect(props.onChange).toBeCalledWith(coerceToRangeSpy.getMockImplementation()(-1, 1, 5))
    })

    it('should, on blur, try to coerce undefined as zero', () => {
        setup({ value: undefined, min: -5, max: 5 })
        const input = getInput()

        fireEvent.blur(input)
        expect(coerceToRangeSpy).toBeCalledWith(0, -5, 5)
        expect(props.onChange).toBeCalledWith(coerceToRangeSpy.getMockImplementation()(0, -5, 5))
    })

    it('should be uncontrolled if no onChange is given', () => {
        setup({ onChange: undefined })
        const input = getInput()
        fireEvent.change(input, createChangeEvent('5'))
        expect(input).toHaveValue(null)
    })

    it('should match snapshot', () => {
        setup()
        expect(screen).toMatchSnapshot()
    })
})
