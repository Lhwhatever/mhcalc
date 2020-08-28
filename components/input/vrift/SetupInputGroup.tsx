import { Box, BoxProps, Paper, Tab, Tabs, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { PowerIcon } from '../../icons/TrapStatIcons'
import { SpeedIcon, SiphonIcon } from './Icons'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import SpeedInput from './SpeedInput'
import { updateSpeed, deleteSpeed } from '../../../redux/ducks/vrift/setups'
import { Speed } from '../../../redux/ducks/vrift/stats'
import { formatRange } from '../../../utils/range'
import createMenu, { MenuItem } from '../../menus/createMenu'

const useStyles = makeStyles((theme) => ({
    inputContainer: {
        margin: theme.spacing(1),
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gridGap: theme.spacing(1)
    },
    statIcon: {
        gridColumnStart: 1,
        gridColumnEnd: 'span 1'
    },
    statInput: {
        gridColumnStart: 2,
        gridColumnEnd: 'span 1'
    }
}))

const createA11yPropsFactory = (prefix: string) => ({
    createTabProps: (index: number) => ({
        id: `${prefix}-tab-${index}`,
        'aria-controls': `${prefix}-tabpanel-${index}`
    }),
    createTabPanelProps: (index: number, selectedIndex: number) => ({
        role: 'tabpanel',
        hidden: index !== selectedIndex,
        id: `${prefix}-tabpanel-${index}`,
        'aria-labelledby': `${prefix}-tab-${index}`
    })
})

export interface CategoryGroupProps<P> {
    component: React.ElementType<React.HTMLAttributes<HTMLElement>>
    componentProps?: P
    children?: React.ReactNode
}

export const CategoryGroup = <P,>(props: CategoryGroupProps<P>): JSX.Element => {
    const { component: Component, componentProps, children } = props
    return <Component {...componentProps}>{children}</Component>
}

type SetupInputGroupProps = Pick<BoxProps, 'className'>

const SetupInputGroup = (props: SetupInputGroupProps): JSX.Element => {
    const classes = useStyles()

    const [category, setCategory] = React.useState(0)

    const handleCategoryChange = (_: React.ChangeEvent<{}>, newValue: number) => {
        setCategory(newValue)
    }

    const { createTabProps, createTabPanelProps } = createA11yPropsFactory('setup-input')

    const { speed, siphon } = useSelector((state: RootState) => state.vrift.setups)

    const dispatch = useDispatch()

    const createSpeedInputs = (): JSX.Element[] => {
        const floors = Object.keys(speed).map((x) => parseInt(x, 10))
        floors.sort()

        const floorRanges = formatRange(floors)

        return floors.map((floor, index) => {
            const handleSpeedChange = () => 1

            const menuItems: MenuItem[] = [{ item: 'Edit' }, { item: 'Duplicate' }]
            if (floor > 1) menuItems.push({ item: 'Delete', onClick: () => dispatch(deleteSpeed(floor)) })

            const Menu = createMenu(menuItems, {
                menuId: `speed-options-f${floor}`,
                ariaLabel: `more options for speed (floors ${floorRanges[index]})`
            })

            return (
                <React.Fragment key={floor}>
                    <div className={classes.statInput}>
                        <SpeedInput
                            id={`speed-input-f${floor}`}
                            label={`Speed (Floors ${floorRanges[index]})`}
                            value={speed[floor]}
                            onChange={handleSpeedChange}
                        />
                    </div>
                    <div>
                        <Menu />
                    </div>
                </React.Fragment>
            )
        })
    }

    return (
        <Box {...props}>
            <Typography variant="h4">Setup</Typography>
            <Box className={classes.inputContainer}>
                <div className={classes.statIcon}>
                    <SpeedIcon />
                </div>
                {createSpeedInputs()}
                <div className={classes.statIcon}>
                    <SiphonIcon />
                </div>
            </Box>
            <Paper square>
                <Tabs value={category} onChange={handleCategoryChange} aria-label="setup category" variant="fullWidth">
                    <Tab label="Eclipse" {...createTabProps(0)} />
                    <Tab label="Non-Eclipse" {...createTabProps(1)} />
                </Tabs>
            </Paper>
            <Box className={classes.inputContainer}>
                <CategoryGroup component="div" componentProps={createTabPanelProps(1, category)}>
                    <div className={classes.statIcon}>
                        <PowerIcon />
                    </div>
                </CategoryGroup>
            </Box>
        </Box>
    )
}

export default SetupInputGroup
