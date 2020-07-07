import { MenuItem, TextField } from '@material-ui/core'
import React from 'react'
import { InputChangeEvent } from '../types'

export type InitialSync = 40 | 50 | 60 | 70 | 80 | 90 | 100

export interface SyncInputProps {
    fullWidth?: boolean
    value?: InitialSync
    onChange?: (event: InputChangeEvent) => void
}

const InitialSyncInput = (props: SyncInputProps): JSX.Element => {
    return (
        <TextField select label="Sync" variant="outlined" defaultValue={100} {...props}>
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
