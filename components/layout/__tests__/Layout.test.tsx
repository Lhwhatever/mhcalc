import { IconButton, ThemeProvider } from '@material-ui/core'
import { createMount } from '@material-ui/core/test-utils'
import { ReactWrapper } from 'enzyme'
import React, { useCallback, SyntheticEvent } from 'react'
import theme from '../../../theme'
import Layout, { LayoutProps } from '../Layout'
import Navbar from '../Navbar'
import NavDrawer from '../NavDrawer'

jest.mock('next/router', () => ({
    useRouter() {
        return { route: '/', pathname: '', query: '', asPath: '' }
    }
}))

describe('Layout test', () => {
    let mount: ReturnType<typeof createMount>
    let wrapper: ReactWrapper<LayoutProps>

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
        wrapper.find(Navbar).find(IconButton).invoke('onClick')!({} as React.MouseEvent<HTMLButtonElement>)
        expect(wrapper.find(NavDrawer).prop('open')).toBeTruthy()
    })

    it('should not open/close when a Tab or Shift keydown event is given', () => {
        expect(wrapper.find(NavDrawer).prop('open')).toBeFalsy()

        wrapper.find(NavDrawer).invoke('onOpen')({ type: 'keydown', key: 'Tab' } as React.KeyboardEvent<unknown>)
        expect(wrapper.find(NavDrawer).prop('open')).toBeFalsy()
        wrapper.find(NavDrawer).invoke('onOpen')({ type: 'keydown', key: 'Shift' } as React.KeyboardEvent<unknown>)
        expect(wrapper.find(NavDrawer).prop('open')).toBeFalsy()

        wrapper.find(NavDrawer).invoke('onClose')({ type: 'keydown', key: 'Tab' } as React.KeyboardEvent<unknown>)
        expect(wrapper.find(NavDrawer).prop('open')).toBeFalsy()
        wrapper.find(NavDrawer).invoke('onClose')({ type: 'keydown', key: 'Shift' } as React.KeyboardEvent<unknown>)
        expect(wrapper.find(NavDrawer).prop('open')).toBeFalsy()
    })
})
