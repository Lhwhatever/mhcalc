import { Box, BoxProps, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateChampFire, updateLuck, updatePower, updateSiphon, updateSpeed } from '../../../redux/ducks/vrift/setups'
import { Siphon, Speed } from '../../../redux/ducks/vrift/stats'
import { RootState } from '../../../redux/rootReducer'
import { AttBonusIcon, LuckIcon, PowerIcon } from '../../icons/TrapStatIcons'
import { AttBonusInput, LuckInput, PowerInput } from '../TrapStatsInput'
import { InputChangeEvent } from '../types'
import ChampFireInput from './ChampFireInput'
import { ChampFireIcon, SiphonIcon, SpeedIcon } from './Icons'
import SiphonInput from './SiphonInput'
import SpeedInput from './SpeedInput'

const useStyles = makeStyles((theme) => ({
    mobileSetupInputRoot: {
        display: 'grid',
        margin: theme.spacing(1),
        gridGap: theme.spacing(1),
        gridTemplateColumns: 'auto 1fr',
        alignItems: 'center'
    }
}))

interface SetupTab {
    value: string
    label: string
}

const tabs: SetupTab[] = [
    { value: 'e1', label: 'Eclipse' },
    { value: 'r1', label: 'Floors 1-7' },
    { value: 'r9', label: 'Floors 9-15' },
    { value: 'r17', label: 'Floors 17-23' },
    { value: 'r25', label: 'Floors 25+' }
]

const ActiveComponentCompact = (): JSX.Element => {
    const classes = useStyles()

    const [activeTab, setActiveTab] = React.useState(tabs[0].value)

    const handleActiveTabChange = (event: InputChangeEvent) => {
        setActiveTab(event.target.value)
    }

    const setupType = activeTab.charAt(0) === 'e' ? 'eclipse' : 'regular'
    const setupLevel = parseInt(activeTab.slice(1))

    const { power, luck, speed, champFire } = useSelector(
        (state: RootState) => state.vrift.setups[setupType][setupLevel]
    )
    const siphon = useSelector((state: RootState) =>
        setupType === 'eclipse' ? state.vrift.setups.eclipse[setupLevel].siphon : undefined
    )

    const dispatch = useDispatch()

    const handlePowerChange = (power: number | undefined) => {
        dispatch(updatePower(setupType, power, setupLevel))
    }

    const handleLuckChange = (luck: number | undefined) => {
        dispatch(updateLuck(setupType, luck, setupLevel))
    }

    const handleSpeedChange = (speed: Speed) => {
        dispatch(updateSpeed(setupType, speed, setupLevel))
    }

    const handleSiphonChange = (siphon: Siphon) => {
        dispatch(updateSiphon(siphon, setupLevel))
    }

    const handleChampFireChange = (champFire: boolean) => {
        dispatch(updateChampFire(setupType, champFire, setupLevel))
    }

    return (
        <React.Fragment>
            <Box m={1}>
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Setup"
                    id="setup-select"
                    value={activeTab}
                    onChange={handleActiveTabChange}
                >
                    {tabs.map(({ value, label }) => (
                        <MenuItem key={value} value={value}>
                            {label}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
            <div className={classes.mobileSetupInputRoot}>
                <div>
                    <PowerIcon />
                </div>
                <div>
                    <PowerInput fullWidth id="power-input" value={power ?? undefined} onChange={handlePowerChange} />
                </div>
                <div>
                    <LuckIcon />
                </div>
                <div>
                    <LuckInput fullWidth id="luck-input" value={luck ?? undefined} onChange={handleLuckChange} />
                </div>
                <div>
                    <AttBonusIcon />
                </div>
                <div>
                    <AttBonusInput disabled fullWidth id="att-bonus-input" />
                </div>
                <div>
                    <SpeedIcon />
                </div>
                <div>
                    <SpeedInput fullWidth id="speed-input" value={speed} onChange={handleSpeedChange} />
                </div>
                {setupType === 'eclipse' && (
                    <React.Fragment>
                        <div>
                            <SiphonIcon />
                        </div>
                        <div>
                            <SiphonInput fullWidth id="siphon-input" value={siphon!} onChange={handleSiphonChange} />
                        </div>
                    </React.Fragment>
                )}
                <div>
                    <ChampFireIcon state={champFire} />
                </div>
                <div>
                    <ChampFireInput value={champFire} onChange={handleChampFireChange} />
                </div>
            </div>
        </React.Fragment>
    )
}

const SetupInputGroup = (props: BoxProps): JSX.Element => {
    return (
        <Box {...props}>
            <Typography variant="h4">Setup</Typography>
            <ActiveComponentCompact />
        </Box>
    )
}

export default SetupInputGroup
