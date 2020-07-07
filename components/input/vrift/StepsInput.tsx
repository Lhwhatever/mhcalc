import React from 'react'
import IntegerInput, { IntegerInputProps } from '../IntegerInput'

export type StepsInputProps = Omit<IntegerInputProps, 'min' | 'max'>

const StepsInput = (props: StepsInputProps): JSX.Element => {
    return <IntegerInput label="Steps" variant="outlined" min={0} {...props} />
}

export default StepsInput
