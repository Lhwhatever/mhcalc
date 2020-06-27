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
import ListLinkItem from '../link/ListLinkItem'
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

export type NavDrawerProps = SwipeableDrawerProps & { endpoints: Record<string, Endpoint[]> }

const NavDrawer = (props: NavDrawerProps): JSX.Element => {
    const { endpoints, ...other } = props

    const classes = useStyles()

    return (
        <SwipeableDrawer {...other}>
            <Box className={classes.drawerHeader}>
                <IconButton onClick={props.onClose} aria-label="close">
                    <ChevronLeftIcon />
                </IconButton>
            </Box>
            <Box component="div" overflow="auto">
                <List component="nav" aria-label="navigation drawer">
                    <ListLinkItem href="/">Home</ListLinkItem>
                    <Divider />
                    <DrawerSubList component="div" subheader="Calculators" endpoints={endpoints.calculators} />
                </List>
            </Box>
        </SwipeableDrawer>
    )
}

export default NavDrawer
