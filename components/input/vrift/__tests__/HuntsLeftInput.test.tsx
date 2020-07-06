import { TextField } from '@material-ui/core'
import { createShallow } from '@material-ui/core/test-utils'
import React from 'react'
import HuntsLeftInput from '../HuntsLeftInput'

describe('HuntsLeftInput test', () => {
    let shallow
    let wrapper

    beforeAll(() => {
        shallow = createShallow()
    })

    beforeEach(() => {
        wrapper = shallow(<HuntsLeftInput />)
    })

    it('should use TextField[label="Hunts Left"][type=number]', () => {
        expect(wrapper.find(TextField)).toHaveLength(1)
        expect(wrapper.find(TextField).prop('type')).toStrictEqual('number')
        expect(wrapper.find(TextField).prop('label')).toMatch(/hunts left/i)
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
