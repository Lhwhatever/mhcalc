import React from 'react'
import IntegerInput, { IntegerInputProps } from '../IntegerInput'

export type HuntsLeftInputProps = Omit<IntegerInputProps, 'min' | 'max' | 'label'>

const HuntsLeftInput = (props: HuntsLeftInputProps): JSX.Element => {
    return <IntegerInput label="Hunts Left" variant="outlined" min={1} {...props} />
}

export default HuntsLeftInput
