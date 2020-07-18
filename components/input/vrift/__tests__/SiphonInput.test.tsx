import React from 'react'
import { openMuiSelect, selectMuiSelectOption } from '../../../../utils/testing/other'
import { render, screen } from '../../../../utils/testing/test'
import SiphonInput from '../SiphonInput'

describe('SpeedInput test', () => {
    const getSelectField = () => screen.getByLabelText(/siphon/i)
    const handleChange = jest.fn()

    beforeEach(() => {
        render(<SiphonInput id="siphon-input" value={20} onChange={handleChange} />)
    })

    it('should be a select field and have a label', () => {
        const selectField = getSelectField()
        expect(selectField).toBeInTheDocument()
    })

    it('should have all 5 options', async () => {
        const selectField = getSelectField()
        await openMuiSelect(selectField)

        for (let i = 1; i <= 5; ++i) {
            const matcher = new RegExp(`\\bLvl. ${i}\\b`, 'i')
            const siphon = (i * 5).toString()
            const option = screen.getByRole('option', { name: new RegExp(`\\b${siphon} siphon\\b`, 'i') })

            expect(option).toBeInTheDocument()
            expect(option).toHaveTextContent(matcher)
            expect(option).toHaveAttribute('data-value', siphon)
        }
    })

    it('should pass change events to the given handler', async () => {
        const selectField = getSelectField()
        await selectMuiSelectOption(selectField, /Lvl\. 2/i)
        expect(handleChange).toBeCalled()
        expect(handleChange).lastCalledWith(10)
    })

    it('should match snapshot', () => {
        expect(screen).toMatchSnapshot()
    })
})
