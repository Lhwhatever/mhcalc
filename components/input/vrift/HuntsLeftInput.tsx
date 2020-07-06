import { TextField } from '@material-ui/core'
import React from 'react'
import { InputEvent } from '../types'

export interface HuntsLeftInputProps {
    fullWidth?: boolean
    value?: number
    onChange?: (event: InputEvent) => void
}

const HuntsLeftInput = (props: HuntsLeftInputProps): JSX.Element => {
    return <TextField label="Hunts Left" type="number" variant="outlined" {...props} />
}

export default HuntsLeftInput
