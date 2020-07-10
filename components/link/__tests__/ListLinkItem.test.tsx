import { ListItem, ListItemText } from '@material-ui/core'
import { createMount, createShallow } from '@material-ui/core/test-utils'
import { ReactWrapper, ShallowWrapper } from 'enzyme'
import NextLink from 'next/link'
import React from 'react'
import ListLinkItem, { ListLinkItemProps } from '../ListLinkItem'

describe('ListLinkItem test', () => {
    let shallow: ReturnType<typeof createShallow>
    let wrapper: ShallowWrapper<ListLinkItemProps>

    beforeAll(() => {
        shallow = createShallow()
    })

    beforeEach(() => {
        wrapper = shallow(<ListLinkItem href="#">a</ListLinkItem>)
    })

    it('should use NextLink[passHref]', () => {
        expect(wrapper.find(NextLink)).toHaveLength(1)
        expect(wrapper.find(NextLink).prop('passHref')).toBeTruthy()
    })

    it('should use the given href', () => {
        wrapper.setProps({ href: '/' })
        expect(wrapper.find(NextLink).first().prop('href')).toEqual('/')

        wrapper.setProps({ href: '/foo' })
        expect(wrapper.find(NextLink).first().prop('href')).toEqual('/foo')
    })
})

describe('mount ListLinkItem', () => {
    let mount: ReturnType<typeof createMount>
    let wrapper: ReactWrapper<ListLinkItemProps>

    beforeAll(() => {
        mount = createMount()
    })

    beforeEach(() => {
        wrapper = mount(<ListLinkItem href="#">a</ListLinkItem>)
    })

    it('should use NextLink[passHref], which wraps a ListItem[button], which wraps a ListItemText', () => {
        expect(wrapper.find(NextLink).find(ListItem)).toHaveLength(1)

        const ListItemWrapper = wrapper.find(ListItem)
        expect(ListItemWrapper.find(ListItemText)).toHaveLength(1)
        expect(ListItemWrapper.prop('button')).toBeTruthy()
    })

    it('should render the given child string', () => {
        wrapper.setProps({ children: 'foo' })
        expect(wrapper.text()).toEqual('foo')

        wrapper.setProps({ children: 'bar' })
        expect(wrapper.text()).toEqual('bar')
    })

    it('should pass the given className and styles object down to ListItem', () => {
        const styles = { width: '100%' }
        wrapper.setProps({ className: 'foo', styles })

        const ListItemWrapper = wrapper.find(ListItem).first()
        expect(ListItemWrapper.prop('className')).toEqual('foo')
        expect(ListItemWrapper.prop('styles')).toEqual(styles)
    })

    it('should have the active className if and only if active prop is supplied', () => {
        expect(wrapper.find(ListItem).hasClass(/active/)).toBeFalsy()
        wrapper.setProps({ active: false })
        expect(wrapper.find(ListItem).hasClass(/active/)).toBeFalsy()
        wrapper.setProps({ active: true })
        expect(wrapper.find(ListItem).hasClass(/active/)).toBeTruthy()
    })
})
