import React from 'react'
import ValourRiftSimPage from '../index'
import { createShallow } from '@material-ui/core/test-utils'
import CurrentProgressInputGroup from '../../../components/input/vrift/CurrentProgressInputGroup'

describe('ValourRiftSimPage test', () => {
    let shallow
    let wrapper

    beforeAll(() => {
        shallow = createShallow()
    })

    beforeEach(() => {
        wrapper = shallow(<ValourRiftSimPage />)
    })

    it('should contain the required simulator input groups', () => {
        expect(wrapper.find(CurrentProgressInputGroup)).toHaveLength(1)
    })
})
