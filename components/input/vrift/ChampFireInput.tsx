import React from 'react'
import { Switch, FormControlLabel } from '@material-ui/core'
import { InputChangeEvent } from '../types'

export interface ChampFireInputProps {
    value?: boolean
    onChange?: (state: boolean) => void
}

const ChampFireInput = (props: ChampFireInputProps): JSX.Element => {
    const { value, onChange = () => undefined } = props

    const handleChange = (event: InputChangeEvent) => {
        onChange(event.target.checked)
    }

    return (
        <FormControlLabel
            control={<Switch checked={value} onChange={handleChange} inputProps={{ role: 'switch checkbox' }} />}
            label="Champion's Fire"
        />
    )
}

export default ChampFireInput
