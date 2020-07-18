import React from 'react'
import { openMuiSelect, selectMuiSelectOption } from '../../../../utils/testing/other'
import { render, screen } from '../../../../utils/testing/test'
import SpeedInput from '../SpeedInput'

describe('SpeedInput test', () => {
    const getSelectField = () => screen.getByLabelText(/speed/i)
    const handleChange = jest.fn()

    beforeEach(() => {
        render(<SpeedInput id="speed-input" value={5} onChange={handleChange} />)
    })

    it('should be a select field and have a label', () => {
        const selectField = getSelectField()
        expect(selectField).toBeInTheDocument()
    })

    it('should have all 10 options', async () => {
        const selectField = getSelectField()
        await openMuiSelect(selectField)

        for (let i = 1; i <= 10; ++i) {
            const matcher = new RegExp(`\\bLvl. ${i}\\b`, 'i')
            const speed = i.toString()
            const option = screen.getByRole('option', { name: new RegExp(`\\b${speed} speed\\b`, 'i') })

            expect(option).toBeInTheDocument()
            expect(option).toHaveTextContent(matcher)
            expect(option).toHaveAttribute('data-value', speed)
        }
    })

    it('should pass change events to the given handler', async () => {
        const selectField = getSelectField()
        await selectMuiSelectOption(selectField, /Lvl\. 2/i)
        expect(handleChange).toBeCalled()
        expect(handleChange).lastCalledWith(2)
    })

    it('should match snapshot', () => {
        expect(screen).toMatchSnapshot()
    })
})