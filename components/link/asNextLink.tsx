import { Button, Link as MuiLink } from '@material-ui/core'
import NextLink from 'next/link'
import React from 'react'

interface LinkProps {
    href?: string
}

function asNextLink<P extends Record<string, unknown>>(Component: React.ComponentType<P>): React.FC<LinkProps & P> {
    const AsNextLink = (props: LinkProps & P): JSX.Element => {
        const { href = '#', ...other } = props
        return (
            <NextLink href={href} passHref>
                <Component {...(other as P)} />
            </NextLink>
        )
    }

    AsNextLink.displayName = `AsNextLink(${Component.displayName || Component.name || 'Component'})`
    return AsNextLink
}

export default asNextLink

export const ButtonLink = asNextLink(Button)
export const Link = asNextLink(MuiLink)
