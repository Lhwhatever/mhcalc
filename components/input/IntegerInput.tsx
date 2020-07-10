import { TextField, TextFieldProps } from '@material-ui/core'
import React from 'react'
import { coerceToRange } from '../../utils/number'
import { asInteger, renderNumber } from '../../utils/str'
import { InputChangeEvent } from './types'

interface BaseNumericInputProps {
    onChange: (newValue: number | undefined) => void
    value?: number
    min?: number
    max?: number
    variant?: 'outlined' | 'filled'
}

export type IntegerInputProps = BaseNumericInputProps & Pick<TextFieldProps, 'fullWidth' | 'label'>

const IntegerInput = (props: IntegerInputProps): JSX.Element => {
    const { onChange, min = -Infinity, max = +Infinity, value, variant, ...other } = props

    const handleChange = (event: InputChangeEvent) => {
        if (event.target.value === '') onChange(undefined)
        if (/^-?\d+$/.test(event.target.value)) onChange(asInteger(event.target.value))
    }

    const handleUnfocus = () => {
        if (value === undefined || value < min || value > max) onChange(coerceToRange(value ?? 0, min, max))
    }

    return (
        <TextField
            {...other}
            type="number"
            value={renderNumber(value)}
            onChange={handleChange}
            onBlur={handleUnfocus}
            inputProps={{ min, max }}
            variant={variant ?? 'outlined'}
        />
    )
}

export default IntegerInput
