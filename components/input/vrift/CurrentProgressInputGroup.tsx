import { Avatar, Box, Button, makeStyles, Tooltip, Typography } from '@material-ui/core'
import InfoIconOutlined from '@material-ui/icons/InfoOutlined'
import React from 'react'
import { InputChangeEvent } from '../types'
import HuntsLeftInput from './HuntsLeftInput'
import InitialSyncInput, { InitialSync } from './InitialSyncInput'
import StepsInput from './StepsInput'

const useStyles = makeStyles((theme) => ({
    inputGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 3fr 3rem',
        gridGap: theme.spacing(1)
    },
    inputIconLabel: {
        gridColumn: '1 / span 1',
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    inputField: {
        gridColumn: '2 / span 1',
        '& .MuiTextField-root': {
            minWidth: 166
        }
    },
    inputAdornment: {
        gridColumn: '3 / span 1',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
}))

export interface CurrentProgressInputGroupProps {
    initialSync: InitialSync
    onInitialSyncChange: (newInitialSync: InitialSync) => void
    huntsLeft: number | undefined
    onHuntsLeftChange: (newHuntsLeft: number | undefined) => void
    steps: number | undefined
    onStepsChange: (newSteps: number | undefined) => void
}

const CurrentProgressInputGroup = (props: CurrentProgressInputGroupProps): JSX.Element => {
    const classes = useStyles()

    const { initialSync, onInitialSyncChange, huntsLeft, onHuntsLeftChange, steps, onStepsChange } = props

    const handleInitialSyncChange = (event: InputChangeEvent) => {
        onInitialSyncChange(parseInt(event.target.value) as InitialSync)
    }

    const handleResetToStart = () => {
        onHuntsLeftChange(initialSync)
        onStepsChange(0)
    }

    return (
        <Box>
            <Typography variant="h4">Current Progress</Typography>
            <Box className={classes.inputGrid} mt={2}>
                <div className={classes.inputIconLabel}>
                    <Avatar
                        alt="Sync"
                        src="https://www.mousehuntgame.com/images/ui/hud/rift_valour/power_up_stamina.png"
                        variant="rounded"
                    />
                </div>
                <div className={classes.inputField}>
                    <InitialSyncInput fullWidth value={initialSync} onChange={handleInitialSyncChange} />
                </div>
                <div className={classes.inputAdornment}>
                    <Tooltip title="If you are upgrading Sync during the run, use the final Sync level.">
                        <InfoIconOutlined />
                    </Tooltip>
                </div>
                <div className={classes.inputField}>
                    <HuntsLeftInput fullWidth value={huntsLeft} onChange={onHuntsLeftChange} />
                </div>
                <div className={classes.inputField}>
                    <StepsInput fullWidth value={steps} onChange={onStepsChange} />
                </div>
            </Box>
            <Box mt={2} display="flex" flexDirection="row-reverse">
                <Button id="btn-reset-run" variant="outlined" onClick={handleResetToStart}>
                    Reset Progress
                </Button>
            </Box>
        </Box>
    )
}

export default CurrentProgressInputGroup
