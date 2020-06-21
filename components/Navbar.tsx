import {
    AppBar,
    Divider,
    IconButton,
    List,
    ListItem,
    ListSubheader,
    SwipeableDrawer,
    Toolbar,
    Typography
} from '@material-ui/core'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import { wrapNextLink } from './AsNextLink'
import endpoints from '../endpoints'

const Navbar = (): JSX.Element => {
    const [drawerOpen, setDrawerOpen] = React.useState(false)

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return
        setDrawerOpen(open)
    }

    const handleDrawerOpen = toggleDrawer(true)
    const handleDrawerClose = toggleDrawer(false)

    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">MouseHunt Calculator</Typography>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer anchor="left" open={drawerOpen} onClose={handleDrawerClose} onOpen={handleDrawerOpen}>
                <div>
                    <List component="nav" aria-label="navigation drawer">
                        <Divider />
                        {wrapNextLink(
                            <ListItem button>
                                <ListItemText>Home</ListItemText>
                            </ListItem>,
                            '/'
                        )}
                        <Divider />
                        <List
                            component="div"
                            aria-labelled-by="calculator-list-header"
                            subheader={
                                <ListSubheader component="div" id="calculator-list-header">
                                    Calculators
                                </ListSubheader>
                            }
                        >
                            {endpoints.calculators.map((e) =>
                                wrapNextLink(
                                    <ListItem button key={e.path}>
                                        <ListItemText>{e.name}</ListItemText>
                                    </ListItem>,
                                    e.path
                                )
                            )}
                        </List>
                        <Divider />
                    </List>
                </div>
            </SwipeableDrawer>
        </React.Fragment>
    )
}

export default Navbar
