import { makeStyles } from '@material-ui/core'
import React from 'react'
import AugmentInputGroup from '../../components/input/vrift/AugmentInputGroup'
import CurrentProgressInputGroup from '../../components/input/vrift/CurrentProgressInputGroup'
import Layout from '../../components/layout/Layout'

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

    return (
        <Layout>
            <div className={classes.inputRoot}>
                <CurrentProgressInputGroup />
                <AugmentInputGroup />
            </div>
        </Layout>
    )
}
