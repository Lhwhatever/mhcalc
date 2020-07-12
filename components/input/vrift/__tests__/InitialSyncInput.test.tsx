import React from 'react'
import { fireEvent, render, screen } from '../../../../utils/test'
import InitialSyncInput from '../InitialSyncInput'

describe('InitialSyncInput test', () => {
    const getSelectField = () => screen.getByLabelText(/sync/i)

    beforeEach(() => {
        render(<InitialSyncInput id="sync-input" />)
    })

    it('should be a select field and have a label', () => {
        const selectField = getSelectField()
        expect(selectField).toBeInTheDocument()
    })

    it('should have all 7 options', async () => {
        const selectField = getSelectField()
        fireEvent.keyDown(selectField, { key: 'ArrowDown' })
        await screen.findAllByText(/Lvl\./i)

        for (let i = 1; i <= 7; ++i) {
            const matcher = new RegExp('Lvl. ' + i, 'i')
            const sync = (i * 10 + 30).toString()

            expect(screen.getByText(matcher)).toBeInTheDocument()
            expect(screen.getByText(matcher)).toHaveTextContent(new RegExp(sync))
            expect(screen.getByText(matcher)).toHaveAttribute('data-value', sync)
        }
    })

    it('should match snapshot', () => {
        expect(screen).toMatchSnapshot()
    })
})
