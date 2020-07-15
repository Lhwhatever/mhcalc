import { MenuItem, TextField, TextFieldProps } from '@material-ui/core'
import React from 'react'
import { Sync } from '../../../redux/ducks/vrift/stats'
import { InputChangeEvent } from '../types'

interface BaseSyncInputProps {
    value: Sync
    onChange: (sync: Sync) => void
}

export type SyncInputProps = BaseSyncInputProps & Omit<TextFieldProps, 'defaultValue' | 'onChange'>

const InitialSyncInput = (props: SyncInputProps): JSX.Element => {
    const { onChange, ...other } = props

    const handleChange = (event: InputChangeEvent) => {
        onChange(parseInt(event.target.value) as Sync)
    }

    return (
        <TextField select label="Sync" variant="outlined" onChange={handleChange} {...other}>
            {Array(7)
                .fill(0)
                .map((_, i) => {
                    const sync = i * 10 + 40
                    return (
                        <MenuItem key={i} value={sync}>
                            Lvl. {i + 1} ({sync} Sync)
                        </MenuItem>
                    )
                })}
        </TextField>
    )
}

export default InitialSyncInput
