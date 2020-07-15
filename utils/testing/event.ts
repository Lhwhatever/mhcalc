import { InputChangeEvent } from '../../components/input/types'

export interface InputChangeEventOptions {
    target: Pick<InputChangeEvent['target'], 'value'>
}

export const createChangeEvent = (value: string): InputChangeEventOptions => ({ target: { value } })

export class KeyEventOptions {
    key: string

    constructor(key: string) {
        this.key = key
    }
}

export const KeyEvents = {
    ArrowDown: new KeyEventOptions('ArrowDown')
}
