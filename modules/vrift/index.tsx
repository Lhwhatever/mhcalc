import React from 'react'
import Layout from '../../components/layout/Layout'
import CurrentProgressInputGroup, {
    CurrentProgressInputGroupProps
} from '../../components/input/vrift/CurrentProgressInputGroup'
import { InitialSync } from '../../components/input/vrift/InitialSyncInput'

export default function ValourRiftSimPage(): JSX.Element {
    const [initialSync, setInitialSync] = React.useState<InitialSync>(100)
    const [huntsLeft, setHuntsLeft] = React.useState(initialSync as number)
    const [steps, setSteps] = React.useState(0)

    const runSettingsInputGroupProps: CurrentProgressInputGroupProps = {
        initialSync,
        onInitialSyncChange: setInitialSync,
        huntsLeft,
        onHuntsLeftChange: setHuntsLeft,
        steps,
        onStepsChange: setSteps
    }

    return (
        <Layout>
            <CurrentProgressInputGroup {...runSettingsInputGroupProps} />
        </Layout>
    )
}
