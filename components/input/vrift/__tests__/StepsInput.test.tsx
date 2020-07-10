import { TextField } from '@material-ui/core'
import { createShallow } from '@material-ui/core/test-utils'
import React from 'react'
import StepsInput, { StepsInputProps } from '../StepsInput'
import IntegerInput from '../../IntegerInput'
import { ShallowWrapper } from 'enzyme'

describe('StepsInput test', () => {
    let shallow: ReturnType<typeof createShallow>
    let wrapper: ShallowWrapper<StepsInputProps>

    beforeAll(() => {
        shallow = createShallow()
    })

    beforeEach(() => {
        wrapper = shallow(<StepsInput onChange={jest.fn()} />)
    })

    it('should use IntegerInput[label="Steps"]', () => {
        expect(wrapper.find(IntegerInput)).toHaveLength(1)
        expect(wrapper.find(IntegerInput).prop('label')).toMatch(/steps/i)
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
