import React from 'react'
import { Box, Typography, makeStyles } from '@material-ui/core'
import AugmentSwitch from './AugmentSwitch'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import { Augments, updateAugment } from '../../../redux/ducks/vrift/simInput'

const useStyles = makeStyles((theme) => ({
    switchboxRoot: {
        display: 'grid',
        gridTemplateColumns: 'auto auto 1fr',
        gridColumnGap: theme.spacing(1),
        alignItems: 'center'
    }
}))

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
                <AugmentSwitch
                    label="Sigil Hunter"
                    iconUri="https://www.mousehuntgame.com/images/ui/hud/rift_valour/augments/highway_robbery.png"
                    checked={enabledAugments.sigilHunter ?? false}
                    onChange={createAugmentStateHandler('sigilHunter')}
                />
                <AugmentSwitch
                    label="Secret Research"
                    iconUri="https://www.mousehuntgame.com/images/ui/hud/rift_valour/augments/champion_pillage.png"
                    checked={enabledAugments.secretResearch ?? false}
                    onChange={createAugmentStateHandler('secretResearch')}
                />
                <AugmentSwitch
                    label="Super Siphon"
                    iconUri="https://www.mousehuntgame.com/images/ui/hud/rift_valour/augments/secret_passage.png"
                    checked={enabledAugments.superSiphon ?? false}
                    onChange={createAugmentStateHandler('superSiphon')}
                />
                <AugmentSwitch
                    label="Ultimate Umbra"
                    iconUri="https://www.mousehuntgame.com/images/ui/hud/rift_valour/augments/tower_ultimatum.png"
                    checked={enabledAugments.ultimateUmbra ?? false}
                    onChange={createAugmentStateHandler('ultimateUmbra')}
                />
                <AugmentSwitch
                    label="String Stepping"
                    iconUri="https://www.mousehuntgame.com/images/ui/hud/rift_valour/augments/string_stepping.png"
                    checked={enabledAugments.stringStepping ?? false}
                    onChange={createAugmentStateHandler('stringStepping')}
                />
            </div>
        </Box>
    )
}

export default React.memo(AugmentInputGroup)
