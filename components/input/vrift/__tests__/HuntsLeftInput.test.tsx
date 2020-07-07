import { createShallow } from '@material-ui/core/test-utils'
import React from 'react'
import IntegerInput from '../../IntegerInput'
import HuntsLeftInput from '../HuntsLeftInput'

describe('HuntsLeftInput test', () => {
    let shallow
    let wrapper

    beforeAll(() => {
        shallow = createShallow()
    })

    beforeEach(() => {
        wrapper = shallow(<HuntsLeftInput onChange={jest.fn()} />)
    })

    it('should use IntegerInput[label="Hunts Left"]', () => {
        expect(wrapper.find(IntegerInput)).toHaveLength(1)
        expect(wrapper.find(IntegerInput).prop('label')).toMatch(/hunts left/i)
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
