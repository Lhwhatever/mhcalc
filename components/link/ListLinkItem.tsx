import { ListItem, ListItemText, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import NextLink from 'next/link'
import React from 'react'

const useStyles = makeStyles({
    active: {}
})

interface ListLinkItemInternalProps {
    children: React.ReactNode
    className?: string
    active?: boolean
    styles?: React.CSSProperties
}

const InternalListLinkItem = React.forwardRef(
    ({ children, active = false, className, ...other }: ListLinkItemInternalProps, ref: React.Ref<HTMLDivElement>) => {
        const classes = useStyles()

        return (
            <ListItem button ref={ref} className={clsx(className, active ? classes.active : undefined)} {...other}>
                <ListItemText>{children}</ListItemText>
            </ListItem>
        )
    }
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
