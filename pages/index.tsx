import { Box, Typography } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import React from 'react'
import { ButtonLink } from '../components/AsNextLink'
import Layout from '../components/layout/Layout'
import endpoints from '../endpoints'

const MenuButton = styled(ButtonLink)({
    width: '100%'
})

export default function IndexPage(): JSX.Element {
    return (
        <Layout>
            <Typography variant="h3">Welcome!</Typography>
            <Typography variant="body1" paragraph>
                This site hosts several different calculators for MouseHunt to aid in optimizing your hunting.
            </Typography>
            <Typography variant="body2" paragraph>
                MouseHunt is a trademark of HitGrab Inc. I do not claim ownership of MouseHunt, its associated
                trademarks or its art assets.
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
                {endpoints.calculators.map((e) => (
                    <MenuButton href={e.path} variant="outlined" key={e.path} width="100%">
                        {e.name}
                    </MenuButton>
                ))}
            </Box>
        </Layout>
    )
}
