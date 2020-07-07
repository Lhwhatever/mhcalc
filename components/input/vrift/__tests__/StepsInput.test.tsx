import { TextField } from '@material-ui/core'
import { createShallow } from '@material-ui/core/test-utils'
import React from 'react'
import StepsInput from '../StepsInput'
import IntegerInput from '../../IntegerInput'

describe('StepsInput test', () => {
    let shallow
    let wrapper

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
