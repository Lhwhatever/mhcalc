import { ListItem, ListItemText } from '@material-ui/core'
import NextLink from 'next/link'
import React from 'react'

export interface ListLinkItemInternalProps {
    children: React.ReactNode
    className?: string
    styles?: React.CSSProperties
}

export const InternalListLinkItem = React.forwardRef(
    ({ children, ...other }: ListLinkItemInternalProps, ref: React.Ref<HTMLDivElement>) => (
        <ListItem button ref={ref} {...other}>
            <ListItemText>{children}</ListItemText>
        </ListItem>
    )
)

InternalListLinkItem.displayName = 'InternalListLinkItem'

export type ListLinkItemProps = ListLinkItemInternalProps & { href: string | URL }

const ListLinkItem = ({ href, ...other }: ListLinkItemProps): JSX.Element => {
    return (
        <NextLink href={href} passHref>
            <InternalListLinkItem {...other} />
        </NextLink>
    )
}

export default ListLinkItem
