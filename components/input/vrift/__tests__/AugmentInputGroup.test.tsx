import React from 'react'
import { Augments, updateAugment } from '../../../../redux/ducks/vrift/simInput'
import mockStore from '../../../../utils/testing/mockStore'
import { createRenderWithRedux, fireEvent, screen } from '../../../../utils/testing/test'
import AugmentInputGroup from '../AugmentInputGroup'

describe('AugmentInputGroup test', () => {
    const initialAugmentState: Augments = { superSiphon: true }
    const store = mockStore({
        vrift: { simInput: { augments: initialAugmentState } }
    })

    const dispatchSpy = jest.spyOn(store, 'dispatch')
    const augmentNames = [/sigil hunter/i, /secret research/i, /super siphon/i, /ultimate umbra/i, /string stepping/i]

    beforeEach(() => {
        createRenderWithRedux(store)(<AugmentInputGroup />)
    })

    it('should have a header', () => {
        expect(screen.getByRole('heading', { name: /augments/i })).toBeInTheDocument()
    })

    it('should have seven checkbox inputs', () => {
        augmentNames.forEach((augment) => {
            expect(screen.getByLabelText(augment)).toBeInTheDocument()
        })
    })

    it('should show the state of the checkboxes', () => {
        ;[0, 1, 3, 4].forEach((i) => {
            expect(screen.getByLabelText(augmentNames[i])).not.toBeChecked()
        })

        expect(screen.getByLabelText(augmentNames[2])).toBeChecked()
    })

    it('should dispatch changes to the redux store', () => {
        fireEvent.click(screen.getByLabelText(augmentNames[0]))
        expect(dispatchSpy).lastCalledWith(updateAugment({ target: 'sigilHunter', state: true }))

        fireEvent.click(screen.getByLabelText(augmentNames[2]))
        expect(dispatchSpy).lastCalledWith(updateAugment({ target: 'superSiphon', state: false }))
    })

    it('should match snapshot', () => {
        expect(screen).toMatchSnapshot()
    })
})
