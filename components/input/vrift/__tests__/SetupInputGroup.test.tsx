import React from 'react'
import { render, screen } from '../../../../utils/testing/test'
import SetupInputGroup from '../SetupInputGroup'

describe('SetupInputGroup test', () => {
    beforeEach(() => {
        render(<SetupInputGroup />)
    })

    it('should have a heading', () => {
        expect(screen.getByRole('heading', { name: /Setup/i })).toBeInTheDocument()
    })
})
