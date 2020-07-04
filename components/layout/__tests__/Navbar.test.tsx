import { AppBar, IconButton, Toolbar } from '@material-ui/core'
import { createShallow } from '@material-ui/core/test-utils'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import Navbar from '../Navbar'

describe('Navbar tests', () => {
    let shallow
    let wrapper

    beforeAll(() => {
        shallow = createShallow()
    })

    beforeEach(() => {
        wrapper = shallow(<Navbar onDrawerOpen={jest.fn()} />)
    })

    it('should use AppBar and Toolbar', () => {
        expect(wrapper.find(AppBar)).toHaveLength(1)
        expect(wrapper.find(Toolbar)).toHaveLength(1)
    })

    it('should render menu button only when showDrawerIcon is true or unspecified', () => {
        const expectFindIconButtonMatchesElement = () =>
            expect(
                wrapper.find(IconButton).matchesElement(
                    <IconButton>
                        <MenuIcon />
                    </IconButton>
                )
            )

        expectFindIconButtonMatchesElement().toBe(true)

        wrapper.setProps({ showDrawerIcon: true })
        expectFindIconButtonMatchesElement().toBe(true)

        wrapper.setProps({ showDrawerIcon: false })
        expect(wrapper.find(IconButton)).toHaveLength(0)
    })

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot()

        const wrapperNoShowIcon = shallow(<Navbar showDrawerIcon={false} onDrawerOpen={jest.fn()} />)
        expect(wrapperNoShowIcon).toMatchSnapshot()
    })
})
