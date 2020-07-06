import { MenuItem, TextField } from '@material-ui/core'
import { createShallow } from '@material-ui/core/test-utils'
import { ShallowWrapper } from 'enzyme'
import React from 'react'
import InitialSyncInput from '../InitialSyncInput'

describe('SyncInput test', () => {
    let shallow
    let wrapper

    beforeAll(() => {
        shallow = createShallow()
    })

    beforeEach(() => {
        wrapper = shallow(<InitialSyncInput />)
    })

    it('should use TextField[select][label=Sync]', () => {
        expect(wrapper.find(TextField)).toHaveLength(1)
        expect(wrapper.find(TextField).filter('[select][label="Sync"]')).toHaveLength(1)
    })

    it('should have options for Lvl. 1-7 (40-100 Sync)', () => {
        expect(wrapper.find(MenuItem)).toHaveLength(7)
        wrapper.find(MenuItem).forEach((option: ShallowWrapper, i: number) => {
            const sync = i * 10 + 40
            expect(option.prop('value')).toStrictEqual(sync)
            expect(option.text()).toMatch(`Lvl. ${i + 1}`)
            expect(option.text()).toMatch(`${sync} Sync`)
        })
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
