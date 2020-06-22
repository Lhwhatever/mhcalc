import {
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListSubheader,
    makeStyles,
    SwipeableDrawer,
    SwipeableDrawerProps,
    Theme
} from '@material-ui/core'
import ListItemText from '@material-ui/core/ListItemText'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import React from 'react'
import endpoints from '../../endpoints'
import { wrapNextLink } from '../AsNextLink'

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

export type NavDrawerProps = SwipeableDrawerProps

const NavDrawer = (props: SwipeableDrawerProps): JSX.Element => {
    const classes = useStyles()

    return (
        <SwipeableDrawer {...props}>
            <Box className={classes.drawerHeader}>
                <IconButton onClick={props.onClose} aria-label="close">
                    <ChevronLeftIcon />
                </IconButton>
            </Box>
            <Box component="div" overflow="auto">
                <List component="nav" aria-label="navigation drawer">
                    {wrapNextLink(
                        <ListItem button>
                            <ListItemText>Home</ListItemText>
                        </ListItem>,
                        '/'
                    )}
                    <Divider />
                    <List
                        component="div"
                        aria-labelledby="calculator-list-header"
                        subheader={
                            <ListSubheader component="div" id="calculator-list-header">
                                Calculators
                            </ListSubheader>
                        }
                    >
                        {endpoints.calculators.map((e) =>
                            wrapNextLink(
                                <ListItem button>
                                    <ListItemText>{e.name}</ListItemText>
                                </ListItem>,
                                e.path,
                                { key: e.name }
                            )
                        )}
                    </List>
                    <Divider />
                </List>
            </Box>
        </SwipeableDrawer>
    )
}

export default NavDrawer
