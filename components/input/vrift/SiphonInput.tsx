import { MenuItem, TextField, TextFieldProps } from '@material-ui/core'
import React from 'react'
import { Siphon } from '../../../redux/ducks/vrift/stats'
import { InputChangeEvent } from '../types'

interface BaseSiphonInputProps {
    value: Siphon
    onChange: (newSiphon: Siphon) => void
}

export type SiphonInputProps = BaseSiphonInputProps & Omit<TextFieldProps, 'defaultValue' | 'onChange'>

const SiphonInput = (props: SiphonInputProps): JSX.Element => {
    const { onChange, ...other } = props

    const handleChange = (event: InputChangeEvent) => {
        onChange(parseInt(event.target.value) as Siphon)
    }

    return (
        <TextField select label="Siphon" variant="outlined" onChange={handleChange} {...other}>
            {Array(5)
                .fill(0)
                .map((_, i) => {
                    const siphon = i * 5 + 5
                    return (
                        <MenuItem key={i} value={siphon}>
                            Lvl. {i + 1} ({siphon} Siphon)
                        </MenuItem>
                    )
                })}
        </TextField>
    )
}

export default SiphonInput
