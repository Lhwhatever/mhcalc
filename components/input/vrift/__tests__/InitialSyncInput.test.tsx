import React from 'react'
import { setupMuiSelectTest } from '../../../../utils/testing/other'
import { fireEvent, render, screen } from '../../../../utils/testing/test'
import InitialSyncInput from '../InitialSyncInput'

describe('InitialSyncInput test', () => {
    const getSelectField = () => screen.getByLabelText(/sync/i)
    const handleChange = jest.fn()

    beforeEach(() => {
        render(<InitialSyncInput id="sync-input" value={100} onChange={handleChange} />)
    })

    it('should be a select field and have a label', () => {
        const selectField = getSelectField()
        expect(selectField).toBeInTheDocument()
    })

    it('should have all 7 options', async () => {
        const selectField = getSelectField()
        await setupMuiSelectTest(selectField, async () => screen.findAllByText(/Lvl\./i))

        for (let i = 1; i <= 7; ++i) {
            const matcher = new RegExp('Lvl. ' + i, 'i')
            const sync = (i * 10 + 30).toString()
            const option = screen.getByRole('option', { name: new RegExp(sync) })

            expect(option).toBeInTheDocument()
            expect(option).toHaveTextContent(matcher)
            expect(option).toHaveAttribute('data-value', sync)
        }
    })

    it('should pass change events to the given handler', async () => {
        const selectField = getSelectField()
        await setupMuiSelectTest(selectField, async () => screen.findAllByText(/Lvl\./i))

        fireEvent.click(screen.getByText(/Lvl\. 2/i))
        expect(handleChange).toBeCalled()
        expect(handleChange).lastCalledWith(50)
    })

    it('should match snapshot', () => {
        expect(screen).toMatchSnapshot()
    })
})
