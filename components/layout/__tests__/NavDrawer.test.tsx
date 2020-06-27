import { Box, IconButton, SwipeableDrawer } from '@material-ui/core'
import { createShallow } from '@material-ui/core/test-utils'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import React from 'react'
import endpoints from '../../../endpoints'
import NavDrawer from '../NavDrawer'

const noOp = () => undefined

describe('NavDrawer test', () => {
    let shallow
    let wrapper

    beforeAll(() => {
        shallow = createShallow()
    })

    beforeEach(() => {
        wrapper = shallow(<NavDrawer endpoints={{}} open={true} onOpen={noOp} onClose={noOp} />)
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

    it('should render correctly', () => {
        wrapper.setProps({ endpoints })
        expect(wrapper).toMatchSnapshot()
    })
})
