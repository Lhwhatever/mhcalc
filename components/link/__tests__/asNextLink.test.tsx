import { createShallow } from '@material-ui/core/test-utils'
import { ShallowWrapper } from 'enzyme'
import NextLink from 'next/link'
import React from 'react'
import asNextLink from '../asNextLink'

describe('asNextLink tests', () => {
    let shallow: ReturnType<typeof createShallow>
    let wrapper: ShallowWrapper
    let MockedComponent: React.ComponentType
    let AsNextLinkComponent: ReturnType<typeof asNextLink>

    beforeAll(() => {
        shallow = createShallow()
    })

    beforeEach(() => {
        MockedComponent = jest.fn()
        AsNextLinkComponent = asNextLink(MockedComponent)
        wrapper = shallow(<AsNextLinkComponent />)
    })

    it('should use component, nested within NextLink', () => {
        expect(wrapper.find(NextLink)).toHaveLength(1)
        expect(wrapper.find(NextLink).find(MockedComponent)).toHaveLength(1)
    })

    it('should give NextLink the correct props', () => {
        expect(wrapper.find(NextLink).prop('passHref')).toBeTruthy()

        wrapper.setProps({ href: '/' })
        expect(wrapper.find(NextLink).prop('href')).toBe('/')

        wrapper.setProps({ href: '/foo' })
        expect(wrapper.find(NextLink).prop('href')).toBe('/foo')
    })

    it('should give Component the other props', () => {
        const props = { foo: 1, bar: false, [3]: [-5, null, 4.2] }
        wrapper.setProps(props)
        expect(wrapper.find(MockedComponent).props()).toStrictEqual(props)
    })
})
