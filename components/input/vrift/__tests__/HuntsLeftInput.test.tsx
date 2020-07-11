import React from 'react'
import { render, screen } from '../../../../utils/test'
import HuntsLeftInput from '../HuntsLeftInput'

describe('HuntsLeftInput test', () => {
    beforeEach(() => {
        render(<HuntsLeftInput id="hunts-left" />)
    })

    it('should be labelled "hunts left"', () => {
        const input = screen.getByLabelText(/hunts left/i)
        expect(input).toBeInTheDocument()
    })

    it('should match snapshot', () => {
        expect(screen).toMatchSnapshot()
    })
})
