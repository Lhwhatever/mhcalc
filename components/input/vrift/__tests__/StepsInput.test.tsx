import React from 'react'
import { render, screen } from '../../../../utils/testing/test'
import StepsInput from '../StepsInput'

describe('StepsInput test', () => {
    beforeEach(() => {
        render(<StepsInput id="steps" />)
    })

    it('should be labelled "steps"', () => {
        const input = screen.getByLabelText(/steps/i)
        expect(input).toBeInTheDocument()
    })

    it('should match snapshot', () => {
        expect(screen).toMatchSnapshot()
    })
})
