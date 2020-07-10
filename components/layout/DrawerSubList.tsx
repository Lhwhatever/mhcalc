import React from 'react'
import { List, ListSubheader, ListProps } from '@material-ui/core'
import { Endpoint } from '../../endpoints'
import ListLinkItem from '../link/ListLinkItem'

interface BaseDrawerSubListProps {
    endpoints: Endpoint[]
    current?: string
    subheader?: string
}

export type DrawerSubListProps = Omit<ListProps, 'subheader'> & BaseDrawerSubListProps

const DrawerSubList = (props: DrawerSubListProps): JSX.Element => {
    const {
        current,
        endpoints,
        subheader,
        ['aria-labelledby']: ariaLabel = subheader
            ? subheader.toLowerCase().replace(/[ _]/, '-') + '-list-subheader'
            : undefined,
        ...other
    } = props

    const listSubheader = subheader ? (
        <ListSubheader component="div" id={ariaLabel}>
            {subheader}
        </ListSubheader>
    ) : undefined

    return (
        <List subheader={listSubheader} {...other} aria-labelledby={ariaLabel}>
            {endpoints.map((e: Endpoint, i: number) => (
                <ListLinkItem key={i} href={e.path} active={current === e.path}>
                    {e.name}
                </ListLinkItem>
            ))}
        </List>
    )
}

export default DrawerSubList
