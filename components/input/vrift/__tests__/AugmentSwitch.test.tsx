import React from 'react'
import { fireEvent, render, screen } from '../../../../utils/testing/test'
import AugmentSwitch from '../AugmentSwitch'

describe('AugmentSwitch test', () => {
    const props = {
        label: 'foo bar',
        iconUri: '/foo.png',
        onChange: jest.fn()
    }

    beforeEach(() => {
        render(<AugmentSwitch {...props} />)
    })

    it('should have a label', () => {
        expect(screen.getByText(props.label)).toBeInTheDocument()
        expect(screen.getByLabelText(props.label)).toBeInTheDocument()
    })

    it('should have an icon with alt text', () => {
        expect(screen.getByRole('img')).toBeInTheDocument()
        expect(screen.getByRole('img')).toHaveAttribute('alt', props.label)
    })

    it('should be functional', () => {
        const checkbox = screen.getByLabelText(props.label)
        fireEvent.click(checkbox)
        expect(props.onChange).lastCalledWith(true)
        expect(checkbox).toBeChecked()

        fireEvent.click(checkbox)
        expect(props.onChange).lastCalledWith(false)
        expect(checkbox).not.toBeChecked()
    })
})
