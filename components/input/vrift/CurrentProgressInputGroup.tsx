import { Box, Button, makeStyles, Tooltip, Typography } from '@material-ui/core'
import InfoIconOutlined from '@material-ui/icons/InfoOutlined'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateHuntsLeft, updateInitialSync, updateSteps } from '../../../redux/ducks/vrift/simInput'
import { RootState } from '../../../redux/rootReducer'
import { InputChangeEvent } from '../types'
import HuntsLeftInput from './HuntsLeftInput'
import { SyncIcon } from './Icons'
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

const CurrentProgressInputGroup = (): JSX.Element => {
    const classes = useStyles()

    const { initialSync, huntsLeft, steps } = useSelector((state: RootState) => state.vrift.simInput)
    const dispatch = useDispatch()

    const handleInitialSyncChange = (event: InputChangeEvent) => {
        dispatch(updateInitialSync(parseInt(event.target.value) as InitialSync))
    }

    const handleHuntsLeftChange = (huntsLeft: number | undefined) => {
        dispatch(updateHuntsLeft(huntsLeft))
    }

    const handleStepsChange = (steps: number | undefined) => {
        dispatch(updateSteps(steps))
    }

    const handleResetToStart = () => {
        handleHuntsLeftChange(initialSync)
        handleStepsChange(0)
    }

    return (
        <Box>
            <Typography variant="h4">Current Progress</Typography>
            <Box className={classes.inputGrid} mt={2}>
                <div className={classes.inputIconLabel}>
                    <SyncIcon />
                </div>
                <div className={classes.inputField}>
                    <InitialSyncInput
                        fullWidth
                        value={initialSync}
                        onChange={handleInitialSyncChange}
                        id="initial-sync-input"
                    />
                </div>
                <div className={classes.inputAdornment}>
                    <Tooltip title="If you are upgrading Sync during the run, use the final Sync level.">
                        <InfoIconOutlined />
                    </Tooltip>
                </div>
                <div className={classes.inputField}>
                    <HuntsLeftInput
                        fullWidth
                        value={huntsLeft}
                        onChange={handleHuntsLeftChange}
                        id="hunts-left-input"
                    />
                </div>
                <div className={classes.inputField}>
                    <StepsInput fullWidth value={steps} onChange={handleStepsChange} id="steps-input" />
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
