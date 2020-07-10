import { createShallow } from '@material-ui/core/test-utils'
import React from 'react'
import { Augments, updateAugment } from '../../../../redux/ducks/vrift/simInput'
import AugmentInputGroup from '../AugmentInputGroup'
import AugmentSwitch from '../AugmentSwitch'

const dispatch = jest.fn()

jest.mock('react-redux', () => ({
    useSelector: jest.fn((): Augments => ({})),
    useDispatch: jest.fn(() => dispatch)
}))

describe('AugmentInputGroup test', () => {
    let shallow: ReturnType<typeof createShallow>
    let wrapper

    beforeAll(() => {
        shallow = createShallow()
    })

    beforeEach(() => {
        wrapper = shallow(<AugmentInputGroup />)
    })

    it('should have a header', () => {
        expect(wrapper.text()).toMatch(/augments/i)
    })

    const augmentNames = [/sigil hunter/i, /secret research/i, /super siphon/i, /ultimate umbra/i, /string stepping/i]

    it(`should have ${augmentNames.length} AugmentSwitchGroups`, () => {
        expect(wrapper.find(AugmentSwitch)).toHaveLength(5)
        augmentNames.forEach((augment) => {
            expect(
                wrapper.find(AugmentSwitch).filterWhere((wrapper) => wrapper.prop('label').match(augment))
            ).toHaveLength(1)
        })
    })

    it('should create correct augment state handlers', () => {
        wrapper.find(AugmentSwitch).filter({ label: 'Sigil Hunter' }).invoke('onChange')(true)
        expect(dispatch).toBeCalled()
        expect(dispatch).toBeCalledWith({ type: updateAugment.type, payload: { target: 'sigilHunter', state: true } })
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
