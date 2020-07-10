import {
    Box,
    Divider,
    IconButton,
    List,
    makeStyles,
    SwipeableDrawer,
    SwipeableDrawerProps,
    Theme
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import React from 'react'
import { Endpoint } from '../../endpoints'
import ListLinkItem, { ListLinkItemProps } from '../link/ListLinkItem'
import DrawerSubList from './DrawerSubList'

const useStyles = makeStyles((theme: Theme) => ({
    drawerHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'center'
    }
}))

export interface NavDrawerEndpoints {
    calculators: Endpoint[]
}

interface NavDrawerExtendedProps {
    endpoints: NavDrawerEndpoints
    current?: string
}

export type NavDrawerProps = SwipeableDrawerProps & NavDrawerExtendedProps

const NavDrawer = (props: NavDrawerProps): JSX.Element => {
    const { endpoints, current, ...other } = props

    const classes = useStyles()

    const UngroupedEndpoint = (props: ListLinkItemProps) => <ListLinkItem {...props} active={current === props.href} />

    return (
        <SwipeableDrawer {...other}>
            <Box className={classes.drawerHeader}>
                <IconButton onClick={props.onClose} aria-label="close">
                    <ChevronLeftIcon />
                </IconButton>
            </Box>
            <Box component="div" overflow="auto">
                <List component="nav" aria-label="navigation drawer">
                    <UngroupedEndpoint href="/">Home</UngroupedEndpoint>
                    <Divider />
                    <DrawerSubList subheader="Calculators" endpoints={endpoints.calculators} current={current} />
                </List>
            </Box>
        </SwipeableDrawer>
    )
}

export default NavDrawer
