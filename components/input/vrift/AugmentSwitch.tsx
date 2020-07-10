import { Avatar, Checkbox, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { textToKebabCase } from '../../../utils/str'
import { InputChangeEvent } from '../types'

export interface AugmentSwitchProps {
    label: string
    id?: string
    iconUri: string
    checked?: boolean
    onChange: (state: boolean) => void
}

const useStyles = makeStyles({
    augmentIcon: {
        width: 30,
        height: 30
    }
})

const AugmentSwitch = (props: AugmentSwitchProps): JSX.Element => {
    const { label, id, iconUri, checked, onChange } = props
    const labelId = id ?? 'augment-switch-' + textToKebabCase(label)

    const classes = useStyles()

    const handleCheckboxChange = (event: InputChangeEvent) => {
        onChange(event.target.checked)
    }

    return (
        <React.Fragment>
            <Checkbox inputProps={{ 'aria-labelledby': labelId }} checked={checked} onChange={handleCheckboxChange} />
            <Avatar src={iconUri} className={classes.augmentIcon} />
            <Typography variant="body1" id={labelId}>
                {label}
            </Typography>
        </React.Fragment>
    )
}

export default AugmentSwitch
