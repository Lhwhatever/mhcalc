import React from 'react'
import { Box, Typography, makeStyles } from '@material-ui/core'
import AugmentSwitch from './AugmentSwitch'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import { Augments, updateAugment } from '../../../redux/ducks/vrift/simInput'
import { camelCaseToTitleCase } from '../../../utils/str'

const useStyles = makeStyles((theme) => ({
    switchboxRoot: {
        display: 'grid',
        gridTemplateColumns: 'auto auto 1fr',
        gridColumnGap: theme.spacing(1),
        alignItems: 'center'
    }
}))

interface AugmentEntry {
    key: keyof Augments
    icon: string
}

const augmentSwitches: AugmentEntry[] = [
    { key: 'sigilHunter', icon: 'highway_robbery' },
    { key: 'secretResearch', icon: 'champion_pillage' },
    { key: 'superSiphon', icon: 'secret_passage' },
    { key: 'ultimateUmbra', icon: 'tower_ultimatum' },
    { key: 'stringStepping', icon: 'string_stepping' }
]

const AugmentInputGroup = (): JSX.Element => {
    const classes = useStyles()

    const enabledAugments = useSelector((state: RootState) => state.vrift.simInput.augments)
    const dispatch = useDispatch()

    const createAugmentStateHandler = (key: keyof Augments) => (state: boolean) => {
        dispatch(updateAugment({ target: key, state }))
    }

    return (
        <Box>
            <Typography variant="h4">Augments</Typography>
            <div className={classes.switchboxRoot}>
                {augmentSwitches.map((augment: AugmentEntry) => (
                    <AugmentSwitch
                        key={augment.key}
                        label={camelCaseToTitleCase(augment.key)}
                        iconUri={`https://www.mousehuntgame.com/images/ui/hud/rift_valour/augments/${augment.icon}.png`}
                        checked={enabledAugments[augment.key] ?? false}
                        onChange={createAugmentStateHandler(augment.key)}
                    />
                ))}
            </div>
        </Box>
    )
}

export default React.memo(AugmentInputGroup)
