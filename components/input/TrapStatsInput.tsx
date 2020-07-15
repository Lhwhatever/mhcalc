import React from 'react'
import IntegerInput, { IntegerInputProps } from './IntegerInput'
import { InputAdornment } from '@material-ui/core'

export type PowerInputProps = Omit<IntegerInputProps, 'label'> & { label?: string }

export const PowerInput = (props: PowerInputProps): JSX.Element => {
    return <IntegerInput label="Power" variant="outlined" min={0} {...props} />
}

export type LuckInputProps = Omit<IntegerInputProps, 'label'> & { label?: string }

export const LuckInput = (props: LuckInputProps): JSX.Element => {
    return <IntegerInput label="Luck" variant="outlined" min={0} {...props} />
}

export type AttBonusInputProps = Omit<IntegerInputProps, 'label'> & { label?: string }

export const AttBonusInput = (props: AttBonusInputProps): JSX.Element => {
    return (
        <IntegerInput
            label="Attraction Bonus"
            variant="outlined"
            min={0}
            max={100}
            InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>
            }}
            {...props}
        />
    )
}
