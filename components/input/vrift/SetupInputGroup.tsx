import React from 'react'
import { Box, Typography, BoxProps } from '@material-ui/core'

type SetupInputGroupProps = Pick<BoxProps, 'className'>

const SetupInputGroup = (props: SetupInputGroupProps): JSX.Element => {
    return (
        <Box {...props}>
            <Typography variant="h4">Setup</Typography>
        </Box>
    )
}

export default SetupInputGroup
