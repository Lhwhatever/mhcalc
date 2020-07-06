import { TextField } from '@material-ui/core'
import { createShallow } from '@material-ui/core/test-utils'
import React from 'react'
import StepsInput from '../StepsInput'

describe('StepsInput test', () => {
    let shallow
    let wrapper

    beforeAll(() => {
        shallow = createShallow()
    })

    beforeEach(() => {
        wrapper = shallow(<StepsInput />)
    })

    it('should use TextField[label="Steps"][type=number]', () => {
        expect(wrapper.find(TextField)).toHaveLength(1)
        expect(wrapper.find(TextField).prop('type')).toStrictEqual('number')
        expect(wrapper.find(TextField).prop('label')).toMatch(/steps/i)
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
