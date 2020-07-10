import React from 'react'
import Layout from '../../components/layout/Layout'
import CurrentProgressInputGroup, {
    CurrentProgressInputGroupProps
} from '../../components/input/vrift/CurrentProgressInputGroup'
import { InitialSync } from '../../components/input/vrift/InitialSyncInput'
import AugmentInputGroup from '../../components/input/vrift/AugmentInputGroup'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    inputRoot: {
        display: 'grid',
        gridColumnGap: theme.spacing(8),
        gridRowGap: theme.spacing(2),
        [theme.breakpoints.between('sm', 'md')]: {
            gridTemplateColumns: '1fr 1fr'
        },
        [theme.breakpoints.up('lg')]: {
            gridTemplateColumns: '1fr 2fr'
        }
    }
}))

export default function ValourRiftSimPage(): JSX.Element {
    const classes = useStyles()

    const [initialSync, setInitialSync] = React.useState<InitialSync>(100)
    const [huntsLeft, setHuntsLeft] = React.useState(initialSync as number)
    const [steps, setSteps] = React.useState(0)

    const currentProgressInputGrpProps: CurrentProgressInputGroupProps = {
        initialSync,
        onInitialSyncChange: setInitialSync,
        huntsLeft,
        onHuntsLeftChange: setHuntsLeft,
        steps,
        onStepsChange: setSteps
    }

    return (
        <Layout>
            <div className={classes.inputRoot}>
                <CurrentProgressInputGroup {...currentProgressInputGrpProps} />
                <AugmentInputGroup />
            </div>
        </Layout>
    )
}
