import { createShallow } from '@material-ui/core/test-utils'
import { ShallowWrapper } from 'enzyme'
import React from 'react'
import AugmentInputGroup from '../../../components/input/vrift/AugmentInputGroup'
import CurrentProgressInputGroup from '../../../components/input/vrift/CurrentProgressInputGroup'
import ValourRiftSimPage from '../index'

describe('ValourRiftSimPage test', () => {
    let shallow: ReturnType<typeof createShallow>
    let wrapper: ShallowWrapper

    beforeAll(() => {
        shallow = createShallow()
    })

    beforeEach(() => {
        wrapper = shallow(<ValourRiftSimPage />)
    })

    it('should contain the required simulator input groups', () => {
        expect(wrapper.find(CurrentProgressInputGroup)).toHaveLength(1)
        expect(wrapper.find(AugmentInputGroup)).toHaveLength(1)
    })
})
