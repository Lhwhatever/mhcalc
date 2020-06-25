import React from 'react'
import NextLink from 'next/link'
import { createShallow, createMount } from '@material-ui/core/test-utils'
import ListLinkItem from '../ListLinkItem'
import { ListItemText, ListItem } from '@material-ui/core'

describe('ListLinkItem test', () => {
    let mount
    let wrapper

    beforeAll(() => {
        mount = createMount()
    })

    beforeEach(() => {
        wrapper = mount(<ListLinkItem href="#">a</ListLinkItem>)
    })

    it('should use NextLink[passHref], which wraps a ListItem[button], which wraps a ListItemText', () => {
        expect(wrapper.find(NextLink)).toHaveLength(1)

        const NextLinkWrapper = wrapper.find(NextLink).first()
        expect(NextLinkWrapper.prop('passHref')).toBeTruthy()
        expect(NextLinkWrapper.find(ListItem)).toHaveLength(1)

        const ListItemWrapper = wrapper.find(ListItem).first()
        expect(ListItemWrapper.find(ListItemText)).toHaveLength(1)
        expect(ListItemWrapper.prop('button')).toBeTruthy()
    })

    it('should render the given child string', () => {
        wrapper.setProps({ children: 'foo' })
        expect(wrapper.text()).toEqual('foo')

        wrapper.setProps({ children: 'bar' })
        expect(wrapper.text()).toEqual('bar')
    })

    it('should use the given href', () => {
        wrapper.setProps({ href: '/' })
        expect(wrapper.find(NextLink).first().prop('href')).toEqual('/')

        wrapper.setProps({ href: '/foo' })
        expect(wrapper.find(NextLink).first().prop('href')).toEqual('/foo')
    })

    it('should pass the given className and styles object down to ListItem', () => {
        const styles = { width: '100%' }
        wrapper.setProps({ className: 'foo', styles })

        const ListItemWrapper = wrapper.find(ListItem).first()
        expect(ListItemWrapper.prop('className')).toEqual('foo')
        expect(ListItemWrapper.prop('styles')).toEqual(styles)
    })
})
