import { Checkbox, Avatar } from '@material-ui/core'
import { createShallow } from '@material-ui/core/test-utils'
import React from 'react'
import AugmentSwitch, { AugmentSwitchProps } from '../AugmentSwitch'

describe('AugmentSwitch test', () => {
    let shallow
    let wrapper
    let props: AugmentSwitchProps

    beforeAll(() => {
        shallow = createShallow()
        props = {
            label: 'foo bar',
            iconUri: '/foo',
            onChange: jest.fn()
        }
    })

    beforeEach(() => {
        wrapper = shallow(<AugmentSwitch {...props} />)
    })

    it('should use a Checkbox', () => {
        expect(wrapper.find(Checkbox)).toHaveLength(1)
    })

    it('should have an ARIA label', () => {
        expect(wrapper.find(Checkbox).prop('inputProps')).toHaveProperty('aria-labelledby')

        const labelledBy = '#' + wrapper.find(Checkbox).prop('inputProps')['aria-labelledby']
        expect(wrapper.find(labelledBy)).toHaveLength(1)
        expect(wrapper.find(labelledBy).text()).toMatch(/foo bar/i)
    })

    it('should use an Avatar with the given icon', () => {
        expect(wrapper.find(Avatar)).toHaveLength(1)
        expect(wrapper.find(Avatar).prop('src')).toStrictEqual('/foo')
    })

    it('should handle the onChange event of Checkbox', () => {
        const invokeOnChange = (state: boolean) =>
            wrapper.find(Checkbox).invoke('onChange')({ type: 'change', target: { checked: state } })

        invokeOnChange(true)
        expect(props.onChange).toBeCalled()
        expect(props.onChange).lastCalledWith(true)

        invokeOnChange(false)
        expect(props.onChange).lastCalledWith(false)
    })
})
