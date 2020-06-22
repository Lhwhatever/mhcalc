import { AppBar, AppBarProps, IconButton, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'

interface BaseNavbarProps {
    showDrawerIcon?: boolean
    onDrawerOpen: () => void
}

export type NavbarProps = BaseNavbarProps & AppBarProps

const Navbar = (props: NavbarProps): JSX.Element => {
    const { showDrawerIcon = true, onDrawerOpen, ...other } = props

    return (
        <AppBar position="fixed" {...other}>
            <Toolbar>
                {showDrawerIcon && (
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={onDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                )}
                <Typography variant="h6">MouseHunt Calculator</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
