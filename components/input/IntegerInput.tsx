import { TextField } from '@material-ui/core'
import React from 'react'
import { coerceToRange } from '../../utils/number'
import { asInteger } from '../../utils/str'
import { InputChangeEvent } from './types'

export interface NumericInputProps {
    onChange: (newValue: number | undefined) => void
    value?: number
    min?: number
    max?: number
}

const IntegerInput = (props: NumericInputProps): JSX.Element => {
    const { onChange, min, max, value, ...other } = props

    const handleChange = (event: InputChangeEvent) => {
        if (event.target.value === '') onChange(undefined)
        if (/^-?\d+$/.test(event.target.value)) onChange(asInteger(event.target.value))
    }

    const handleUnfocus = () => {
        if (value === undefined || value < min || value > max) onChange(coerceToRange(value ?? 0, min, max))
    }

    return (
        <TextField type="number" {...other} onChange={handleChange} onBlur={handleUnfocus} inputProps={{ min, max }} />
    )
}

export default IntegerInput
