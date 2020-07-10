import { Button, Tooltip } from '@material-ui/core'
import { createShallow } from '@material-ui/core/test-utils'
import InfoIconOutlined from '@material-ui/icons/InfoOutlined'
import { ShallowWrapper } from 'enzyme'
import React from 'react'
import { SimInputsState } from '../../../../redux/ducks/vrift/simInput'
import CurrentProgressInputGroup from '../CurrentProgressInputGroup'
import HuntsLeftInput from '../HuntsLeftInput'
import InitialSyncInput from '../InitialSyncInput'
import StepsInput from '../StepsInput'

jest.mock('react-redux', () => ({
    useDispatch: () => jest.fn(),
    useSelector: (): SimInputsState => ({
        initialSync: 100,
        huntsLeft: 100,
        steps: 0,
        augments: {}
    })
}))

describe('CurrentProgressInputGroup test', () => {
    let shallow: ReturnType<typeof createShallow>
    let wrapper: ShallowWrapper

    beforeAll(() => {
        shallow = createShallow()
    })

    beforeEach(() => {
        wrapper = shallow(<CurrentProgressInputGroup />)
    })

    it('should have a header', () => {
        expect(wrapper.text()).toMatch(/current progress/i)
    })

    it('should have the correct inputs', () => {
        expect(wrapper.find(InitialSyncInput)).toHaveLength(1)
        expect(wrapper.find(HuntsLeftInput)).toHaveLength(1)
        expect(wrapper.find(StepsInput)).toHaveLength(1)
    })

    it('should have a Tooltip > InfoOutlined', () => {
        const infoTooltip = wrapper.find(Tooltip).filterWhere((node) => node.contains(<InfoIconOutlined />))
        expect(infoTooltip).toHaveLength(1)
    })

    it('should have a button to reset progress', () => {
        const btn = wrapper.find(Button).filter('#btn-reset-run')
        expect(btn).toHaveLength(1)
        expect(btn.text()).toMatch(/reset progress/i)
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
