import { TextField, TextFieldProps } from '@material-ui/core'
import React from 'react'
import { coerceToRange } from '../../utils/number'
import { asInteger, renderNumber } from '../../utils/str'
import { InputChangeEvent } from './types'

interface BaseNumericInputProps {
    onChange?: (newValue: number | undefined) => void
    value?: number
    min?: number
    max?: number
    variant?: 'outlined' | 'filled'
    id: string
    label: string
}

export type IntegerInputProps = BaseNumericInputProps & Pick<TextFieldProps, 'fullWidth' | 'InputProps' | 'disabled'>

const IntegerInput = (props: IntegerInputProps): JSX.Element => {
    const { onChange, min, max, value, variant, ...other } = props

    const handleChange = onChange
        ? (event: InputChangeEvent) => {
              if (event.target.value === '') onChange(undefined)
              if (/^-?\d+$/.test(event.target.value)) onChange(asInteger(event.target.value))
          }
        : undefined

    const handleUnfocus = onChange
        ? () => {
              if (value === undefined || value < (min ?? -Infinity) || value > (max ?? +Infinity))
                  onChange(coerceToRange(value ?? 0, min, max))
          }
        : undefined

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
