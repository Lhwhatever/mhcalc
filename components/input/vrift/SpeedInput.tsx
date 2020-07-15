import { MenuItem, TextField, TextFieldProps } from '@material-ui/core'
import React from 'react'
import { Speed } from '../../../redux/ducks/vrift/stats'
import { InputChangeEvent } from '../types'

interface BaseSpeedInputProps {
    value: Speed
    onChange: (newSpeed: Speed) => void
}

export type SpeedInputProps = BaseSpeedInputProps & Omit<TextFieldProps, 'defaultValue'>

const SpeedInput = (props: SpeedInputProps): JSX.Element => {
    const { onChange, ...other } = props

    const handleChange = (event: InputChangeEvent) => {
        onChange(parseInt(event.target.value) as Speed)
    }

    return (
        <TextField select label="Speed" variant="outlined" onChange={handleChange} {...other}>
            {Array(10)
                .fill(0)
                .map((_, i) => {
                    const speed = i + 1
                    return (
                        <MenuItem key={i} value={speed}>
                            Lvl. {speed} ({speed} Speed)
                        </MenuItem>
                    )
                })}
        </TextField>
    )
}

export default SpeedInput
