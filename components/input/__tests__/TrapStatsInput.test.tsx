import React from 'react'
import { render, screen } from '../../../utils/testing/test'
import { PowerInput, LuckInput, AttBonusInput } from '../TrapStatsInput'

describe('PowerInput test', () => {
    beforeEach(() => {
        render(<PowerInput id="power-input" />)
    })

    it('should be labelled "power"', () => {
        const input = screen.getByLabelText(/power/i)
        expect(input).toBeInTheDocument()
    })

    it('should match snapshot', () => {
        expect(screen).toMatchSnapshot()
    })
})

describe('LuckInput test', () => {
    beforeEach(() => {
        render(<LuckInput id="luck-input" />)
    })

    it('should be labelled "luck"', () => {
        const input = screen.getByLabelText(/luck/i)
        expect(input).toBeInTheDocument()
    })

    it('should match snapshot', () => {
        expect(screen).toMatchSnapshot()
    })
})

describe('Attraction Bonus test', () => {
    beforeEach(() => {
        render(<AttBonusInput id="att-bonus-input" />)
    })

    it('should be labelled "attraction bonus"', () => {
        const input = screen.getByLabelText(/attraction bonus/i)
        expect(input).toBeInTheDocument()
    })

    it('should have a % adornment', () => {
        const adornment = screen.getByText(/%/)
        expect(adornment).toBeInTheDocument()
    })

    it('should match snapshot', () => {
        expect(screen).toMatchSnapshot()
    })
})
