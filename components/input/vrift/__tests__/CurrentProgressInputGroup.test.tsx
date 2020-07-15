import React from 'react'
import { updateHuntsLeft, updateInitialSync, updateSteps } from '../../../../redux/ducks/vrift/simInput'
import { createChangeEvent } from '../../../../utils/testing/event'
import mockStore from '../../../../utils/testing/mockStore'
import { setupMuiSelectTest } from '../../../../utils/testing/other'
import { createRenderWithRedux, fireEvent, screen } from '../../../../utils/testing/test'
import CurrentProgressInputGroup from '../CurrentProgressInputGroup'

describe('CurrentProgressInputGroup test', () => {
    const store = mockStore({
        vrift: { simInput: { initialSync: 100, huntsLeft: 100, steps: 0 } }
    })

    const dispatchSpy = jest.spyOn(store, 'dispatch')

    beforeEach(() => {
        createRenderWithRedux(store)(<CurrentProgressInputGroup />)
    })

    it('should have a label', () => {
        expect(screen.getByRole('heading', { name: /current progress/i })).toBeInTheDocument()
    })

    it('should have three inputs', () => {
        expect(screen.getByLabelText(/sync/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/hunts left/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/steps/i)).toBeInTheDocument()
    })

    it('should have a tooltip', () => {
        expect(screen.getByTitle(/final sync level/i)).toBeInTheDocument()
    })

    it('should handle changes in InitialSyncInput', async () => {
        await setupMuiSelectTest(screen.getByLabelText(/^sync$/i), () => screen.findAllByText(/Lvl\. 2/))
        fireEvent.click(screen.getByText(/Lvl\. 2/))
        expect(dispatchSpy).toBeCalledWith(updateInitialSync(50))
    })

    it('should handle changes in HuntsLeftInput', () => {
        const huntsLeftInput = screen.getByLabelText(/hunts left/i)

        fireEvent.change(huntsLeftInput, createChangeEvent('20'))
        expect(dispatchSpy).toBeCalledWith(updateHuntsLeft(20))
    })

    it('should handle changes in StepsInput', () => {
        const stepsInput = screen.getByLabelText(/steps/i)

        fireEvent.change(stepsInput, createChangeEvent('15'))
        expect(dispatchSpy).toBeCalledWith(updateSteps(15))
    })

    it('should have a working reset button', () => {
        const button = screen.getByRole('button', { name: /reset progress/i })

        expect(button).toBeInTheDocument()
        fireEvent.click(button)
        expect(dispatchSpy).toBeCalledWith(updateHuntsLeft(100))
        expect(dispatchSpy).toBeCalledWith(updateSteps(0))
    })
})
