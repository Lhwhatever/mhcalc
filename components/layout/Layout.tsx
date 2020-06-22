import { Box, makeStyles, Theme, Toolbar, useMediaQuery } from '@material-ui/core'
import React from 'react'
import Navbar from './Navbar'
import NavDrawer from './NavDrawer'

export const altDrawerWidth = 240
export const altDrawerMinBreakpoint = 'md'

const useStyles = makeStyles((theme) => ({
    root: { display: 'flex' },
    content: { flexGrow: 1, padding: theme.spacing(3) },
    appBar: { [theme.breakpoints.up(altDrawerMinBreakpoint)]: { zIndex: theme.zIndex.drawer + 1 } },
    drawer: { [theme.breakpoints.up(altDrawerMinBreakpoint)]: { width: altDrawerWidth, flexShrink: 0 } },
    drawerPaper: { [theme.breakpoints.up(altDrawerMinBreakpoint)]: { width: altDrawerWidth } }
}))

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
    const classes = useStyles()
    const useAltDrawer = useMediaQuery((theme: Theme) => theme.breakpoints.up(altDrawerMinBreakpoint))
    const usePersistentDrawer = useMediaQuery((theme: Theme) => theme.breakpoints.only('sm'))
    const drawerVariant = useAltDrawer ? 'permanent' : usePersistentDrawer ? 'persistent' : 'temporary'

    const [drawerOpen, setDrawerOpen] = React.useState(false)

    // Higher order function. Accepts a boolean. Returns a callback which will set the state of the drawer to the boolean.
    const createDrawerStateHandler = (drawerEndState: boolean) => (event?: React.SyntheticEvent<unknown, Event>) => {
        if (event && event.type === 'keydown') {
            const e = (event as unknown) as { key: string }
            if (e && (e.key === 'Tab' || e.key === 'Shift')) return
        }
        setDrawerOpen(drawerEndState)
    }

    const handleDrawerOpen = createDrawerStateHandler(true)
    const handleDrawerClose = createDrawerStateHandler(false)

    return (
        <div className={classes.root}>
            <Navbar className={classes.appBar} onDrawerOpen={handleDrawerOpen} showDrawerIcon={!useAltDrawer} />
            <NavDrawer
                anchor="left"
                open={drawerOpen}
                onOpen={handleDrawerOpen}
                onClose={handleDrawerClose}
                variant={drawerVariant}
                className={classes.drawer}
                classes={{ paper: classes.drawerPaper }}
            />
            <Box mt={2} />
            <main className={classes.content}>
                <Toolbar />
                {children}
            </main>
        </div>
    )
}

export default Layout
