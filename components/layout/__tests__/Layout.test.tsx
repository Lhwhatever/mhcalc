import { ThemeProvider, IconButton } from '@material-ui/core'
import { createMount } from '@material-ui/core/test-utils'
import React, { useCallback } from 'react'
import theme from '../../../theme'
import Layout from '../Layout'
import Navbar from '../Navbar'
import NavDrawer from '../NavDrawer'
import { act } from 'react-dom/test-utils'

jest.mock('next/router', () => ({
    useRouter() {
        return { route: '/', pathname: '', query: '', asPath: '' }
    }
}))

describe('Layout test', () => {
    let mount
    let wrapper

    beforeAll(() => {
        mount = createMount()
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: useCallback,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn()
            }))
        })
    })

    beforeEach(() => {
        wrapper = mount(
            <ThemeProvider theme={theme}>
                <Layout />
            </ThemeProvider>
        )
    })

    afterAll(() => {
        mount.cleanUp()
    })

    it('should have a Navbar and NavDrawer', () => {
        expect(wrapper.find(Navbar)).toHaveLength(1)
        expect(wrapper.find(NavDrawer)).toHaveLength(1)
    })

    it('should render children', () => {
        const mockedChild = <div id="mock-child" />
        wrapper.setProps({ children: mockedChild })
        expect(wrapper.containsMatchingElement(mockedChild)).toBeTruthy()
    })

    it('should open the drawer when clicked', () => {
        expect(wrapper.find(NavDrawer).prop('open')).toBeFalsy()
        wrapper.find(Navbar).find(IconButton).invoke('onClick')()
        expect(wrapper.find(NavDrawer).prop('open')).toBeTruthy()
    })

    it('should not open/close when a Tab or Shift keydown event is given', () => {
        expect(wrapper.find(NavDrawer).prop('open')).toBeFalsy()

        wrapper.find(NavDrawer).invoke('onOpen')({ type: 'keydown', key: 'Tab' })
        expect(wrapper.find(NavDrawer).prop('open')).toBeFalsy()
        wrapper.find(NavDrawer).invoke('onOpen')({ type: 'keydown', key: 'Shift' })
        expect(wrapper.find(NavDrawer).prop('open')).toBeFalsy()

        wrapper.find(NavDrawer).invoke('onClose')({ type: 'keydown', key: 'Tab' })
        expect(wrapper.find(NavDrawer).prop('open')).toBeFalsy()
        wrapper.find(NavDrawer).invoke('onClose')({ type: 'keydown', key: 'Shift' })
        expect(wrapper.find(NavDrawer).prop('open')).toBeFalsy()
    })
})
