import React from 'react'
import Navbar from './Navbar'
import { Box, Container } from '@material-ui/core'

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <React.Fragment>
            <Navbar />
            <Box mt={2} />
            <Container>{children}</Container>
        </React.Fragment>
    )
}

export default Layout
