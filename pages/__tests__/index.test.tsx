import React from 'react'
import IndexPage from '../index'
import { createShallow } from '@material-ui/core/test-utils'
import Layout from '../../components/layout/Layout'

describe('/ tests', () => {
    let shallow

    beforeAll(() => {
        shallow = createShallow()
    })

    it('should use Layout', () => {
        const wrapper = shallow(<IndexPage />)
        expect(wrapper.find(Layout)).toHaveLength(1)
    })
})
