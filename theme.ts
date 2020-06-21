import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'

export default responsiveFontSizes(
    createMuiTheme({
        palette: {
            primary: { main: '#bad4ed', dark: '#8294a5', light: '#c7dcf0' },
            secondary: { main: '#feeaab', dark: '#b1a377', light: '#feeebb' }
        }
    })
)
