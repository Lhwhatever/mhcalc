import React from 'react'
import { List, ListSubheader } from '@material-ui/core'
import { Endpoint } from '../../endpoints'
import ListLinkItem from '../link/ListLinkItem'

interface DrawerSubListProps {
    endpoints: Endpoint[]
    current?: string
    subheader?: string
    component?: React.ElementType
}

const DrawerSubList = (props: DrawerSubListProps): JSX.Element => {
    const { current, endpoints, subheader, component } = props

    const ariaLabel = subheader ? subheader.toLowerCase().replace(/[ _]/, '-') + '-list-subheader' : undefined
    const listSubheader = subheader ? (
        <ListSubheader component="div" id={ariaLabel}>
            {subheader}
        </ListSubheader>
    ) : undefined

    return (
        <List subheader={listSubheader} component={component} aria-labelledby={ariaLabel}>
            {endpoints.map((e, i) => (
                <ListLinkItem key={i} href={e.path} active={current === e.path}>
                    {e.name}
                </ListLinkItem>
            ))}
        </List>
    )
}

export default DrawerSubList
