import { IconButton, Menu, MenuItem } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import React from 'react'
import { ButtonMouseEvent, LiMouseEvent } from '../input/types'

export interface MenuItem {
    item: React.ReactNode
    onClick: (event: LiMouseEvent) => void
}

export interface Settings {
    menuId: string
    ariaLabel?: string
    componentDisplayName?: string
}

function createMenu(menuItems: MenuItem[], settings: Settings): React.FC {
    const { menuId, ariaLabel, componentDisplayName } = settings

    return Object.assign(
        (): JSX.Element => {
            const [anchor, setAnchor] = React.useState<HTMLElement | null>(null)

            const handleMenuOpen = (event: ButtonMouseEvent) => {
                setAnchor(event.currentTarget)
            }

            const handleMenuClose = () => {
                setAnchor(null)
            }

            return (
                <React.Fragment>
                    <IconButton
                        aria-label={ariaLabel}
                        onClick={handleMenuOpen}
                        aria-haspopup="true"
                        aria-controls={menuId}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu open={Boolean(anchor)} anchorEl={anchor} id={menuId} onClose={handleMenuClose} keepMounted>
                        {menuItems.map((menuItem, index) => {
                            const { item, onClick } = menuItem
                            const handleClick = (event: LiMouseEvent) => {
                                handleMenuClose()
                                onClick(event)
                            }

                            return (
                                <MenuItem key={index} onClick={handleClick}>
                                    {item}
                                </MenuItem>
                            )
                        })}
                    </Menu>
                </React.Fragment>
            )
        },
        { displayName: componentDisplayName }
    )
}

export default createMenu
