import { Box, IconButton, SwipeableDrawer } from '@material-ui/core'
import { createShallow } from '@material-ui/core/test-utils'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import React from 'react'
import ListLinkItem from '../../link/ListLinkItem'
import DrawerSubList from '../DrawerSubList'
import NavDrawer, { NavDrawerEndpoints } from '../NavDrawer'

const endpoints: NavDrawerEndpoints = {
    calculators: [
        { name: 'foo', path: '/foo' },
        { name: 'bar', path: '/bar' }
    ]
}

describe('NavDrawer test', () => {
    let shallow
    let wrapper

    beforeAll(() => {
        shallow = createShallow()
    })

    beforeEach(() => {
        wrapper = shallow(<NavDrawer endpoints={endpoints} open={true} onOpen={jest.fn()} onClose={jest.fn()} />)
    })

    it('should use SwipeableDrawer', () => {
        expect(wrapper.find(SwipeableDrawer)).toHaveLength(1)
    })

    it('should have a close button', () => {
        expect(
            wrapper
                .find(Box)
                .at(0)
                .containsMatchingElement(
                    <IconButton>
                        <ChevronLeftIcon />
                    </IconButton>
                )
        ).toBe(true)
    })

    it('should pass the current prop to DrawerSubLists', () => {
        const current = '/foo'
        wrapper.setProps({ current })
        expect(wrapper.find(DrawerSubList).every({ current })).toBeTruthy()
    })

    it('should ensure ListLinkItem have active props wherever appropriate', () => {
        const current = '/foo'
        wrapper.setProps({ current })
        expect(wrapper.find('UngroupedEndpoint')).toHaveLength(1)
        wrapper.find('UngroupedEndpoint').forEach((node) => {
            const linkItem = node.dive()
            expect(linkItem.find(ListLinkItem)).toHaveLength(1)

            const active = linkItem.prop('active')
            if (current === node.prop('href')) {
                expect(active).toBeTruthy()
            } else {
                expect(active).toBeFalsy()
            }
        })
    })

    it('should render correctly', () => {
        wrapper.setProps({ endpoints })
        expect(wrapper).toMatchSnapshot()
    })
})
