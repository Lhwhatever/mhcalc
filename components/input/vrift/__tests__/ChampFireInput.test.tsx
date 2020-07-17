import userEvent from '@testing-library/user-event'
import { createSetup, screen } from '../../../../utils/testing/test'
import ChampFireInput, { ChampFireInputProps } from '../ChampFireInput'

describe('ChampFireInput test', () => {
    let rerender: (additionalProps: Partial<Omit<ChampFireInputProps, 'onChange'>>) => void
    let switchElem: HTMLElement
    const onChange = jest.fn()

    beforeEach(() => {
        rerender = createSetup(ChampFireInput, { value: false, onChange })().rerender
        switchElem = screen.getByRole('checkbox', { name: /champion's fire/i, queryFallbacks: true })
    })

    it('should have a label', () => {
        expect(screen.getByRole('switch', { name: /champion's fire/i })).toBeInTheDocument()
        expect(switchElem).toBeInTheDocument()
    })

    it('should render the given state', () => {
        expect(switchElem).not.toBeChecked()

        rerender({ value: true })
        expect(switchElem).toBeChecked()
    })

    it('should be functional', () => {
        userEvent.click(switchElem)
        expect(onChange).lastCalledWith(true)

        rerender({ value: true })
        userEvent.click(switchElem)
        expect(onChange).lastCalledWith(false)
    })
})
