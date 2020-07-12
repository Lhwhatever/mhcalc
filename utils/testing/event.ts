import { InputChangeEvent } from '../../components/input/types'

export interface InputChangeEventOptions {
    target: Pick<InputChangeEvent['target'], 'value'>
}

export const createChangeEvent = (value: string): InputChangeEventOptions => ({ target: { value } })

export interface KeyEventOptions {
    key: string
}

export const KeyEvents: Record<string, KeyEventOptions> = {
    ArrowDown: { key: 'ArrowDown' }
}
