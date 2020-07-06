import { TextField } from '@material-ui/core'
import React from 'react'
import { InputEvent } from '../types'

export interface StepsInputProps {
    fullWidth?: boolean
    value?: number
    onChange?: (event: InputEvent) => void
}

const StepsInput = (props: StepsInputProps): JSX.Element => {
    return <TextField label="Steps" type="number" variant="outlined" {...props} />
}

export default StepsInput
