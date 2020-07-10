import { Box } from '@material-ui/core'
import { createMount, createShallow } from '@material-ui/core/test-utils'
import { ReactWrapper, ShallowWrapper } from 'enzyme'
import React from 'react'
import Layout from '../../components/layout/Layout'
import IndexPage, { IndexButtons, MenuButton } from '../index'

describe('/ tests', () => {
    let shallow: ReturnType<typeof createShallow>
    let wrapper: ShallowWrapper

    beforeAll(() => {
        shallow = createShallow()
    })

    beforeEach(() => {
        wrapper = shallow(<IndexPage />)
    })

    it('should use Layout', () => {
        expect(wrapper.find(Layout)).toHaveLength(1)
    })

    it('should use IndexButtons', () => {
        expect(wrapper.containsMatchingElement(<IndexButtons />)).toBe(true)
    })

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
})

describe('IndexButtons test', () => {
    let shallow: ReturnType<typeof createShallow>
    let wrapper: ShallowWrapper

    beforeAll(() => {
        shallow = createShallow()
    })

    beforeEach(() => {
        wrapper = shallow(<IndexButtons />)
    })

    const numOfButtons = 1

    it('should use a Box', () => {
        expect(wrapper.find(Box)).toHaveLength(1)
    })

    it('should show the correct number of buttons', () => {
        expect(wrapper.find(MenuButton)).toHaveLength(numOfButtons)
    })
})

describe('mounted IndexButtons', () => {
    let mount: ReturnType<typeof createMount>
    let wrapper: ReactWrapper

    beforeAll(() => {
        mount = createMount()
    })

    beforeEach(() => {
        wrapper = mount(<IndexButtons />)
    })

    it('should render all buttons', () => {
        expect(
            wrapper.containsMatchingElement(
                <MenuButton href="/vrift" variant="outlined">
                    Valour Rift Simulator
                </MenuButton>
            )
        ).toBe(true)
    })

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
