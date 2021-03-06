import { Box, List } from '@material-ui/core'
import { createShallow } from '@material-ui/core/test-utils'
import React from 'react'
import ListLinkItem from '../../link/ListLinkItem'
import DrawerSubList from '../DrawerSubList'

describe('DrawerSubList tests', () => {
    let shallow
    let wrapper

    beforeAll(() => {
        shallow = createShallow()
    })

    beforeEach(() => {
        wrapper = shallow(<DrawerSubList endpoints={[]} />)
    })

    it('should contain a List', () => {
        expect(wrapper.find(List)).toHaveLength(1)
    })

    const endpoints = [
        { name: 'foo', path: '/foo' },
        { name: 'bar', path: '/bar' },
        { name: 'test', path: '/test' }
    ]

    it('should render all endpoints', () => {
        wrapper.setProps({ endpoints })

        expect(wrapper.find(ListLinkItem)).toHaveLength(endpoints.length)
        expect(
            wrapper.containsAllMatchingElements([
                <ListLinkItem href={'/foo'} key={0}>
                    foo
                </ListLinkItem>,
                <ListLinkItem href={'/bar'} key={1}>
                    bar
                </ListLinkItem>
            ])
        ).toBeTruthy()
    })

    it('should set only the item corresponding to the current path to active', () => {
        const current = '/bar'
        wrapper.setProps({ current, endpoints })

        const wrapperLinkItems = wrapper.find(ListLinkItem)
        expect(wrapperLinkItems.find({ href: current }).prop('active')).toBeTruthy()
        expect(wrapperLinkItems.not({ href: current }).some({ active: true })).toBeFalsy()
    })

    it('should have a subheader with the provided label, only if it is provided', () => {
        let wrapperList = wrapper.find(List)
        expect(wrapperList.prop('subheader')).toBeUndefined()

        wrapper.setProps({ subheader: 'foo' })
        wrapperList = wrapper.find(List)
        expect(wrapperList.prop('subheader')).toBeDefined()
        const wrapperSubheader = shallow(wrapperList.prop('subheader'))
        expect(wrapperSubheader.text()).toStrictEqual('foo')
    })

    it('should have an aria-labelled-by tag connected to the subheader, if it exists', () => {
        expect(wrapper.find(List).prop('aria-labelledby')).toBeUndefined()

        wrapper.setProps({ subheader: 'foo' })
        const ariaLabelledBy = wrapper.find(List).prop('aria-labelledby')
        expect(ariaLabelledBy).toBeDefined()
        const wrapperSubheader = shallow(wrapper.find(List).prop('subheader'))
        expect(ariaLabelledBy).toStrictEqual(wrapperSubheader.prop('id'))
    })

    it('should forward the component prop to List', () => {
        expect(wrapper.find(List).prop('component')).toBeUndefined()

        wrapper.setProps({ component: 'div' })
        expect(wrapper.find(List).prop('component')).toStrictEqual('div')

        wrapper.setProps({ component: Box })
        expect(wrapper.find(List).prop('component')).toStrictEqual(Box)
    })
})
