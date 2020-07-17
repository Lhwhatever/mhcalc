import { Avatar, withStyles } from '@material-ui/core'
import React from 'react'

export const SyncIcon = (): JSX.Element => (
    <Avatar
        alt="Sync"
        src="https://www.mousehuntgame.com/images/ui/hud/rift_valour/power_up_stamina.png"
        variant="rounded"
    />
)

export const SpeedIcon = (): JSX.Element => (
    <Avatar
        alt="Speed"
        src="https://www.mousehuntgame.com/images/ui/hud/rift_valour/power_up_long_stride.png"
        variant="rounded"
    />
)

export const SiphonIcon = (): JSX.Element => (
    <Avatar
        alt="Siphon"
        src="https://www.mousehuntgame.com/images/ui/hud/rift_valour/power_up_siphon.png"
        variant="rounded"
    />
)

export interface ChampFireIconProps {
    state?: boolean
}

const champFireStyles = {
    default: {
        width: '100%',
        paddingBottom: '100%',
        backgroundImage: 'url(https://www.mousehuntgame.com/images/ui/hud/rift_valour/fuel.png)',
        backgroundPosition: '0 0',
        backgroundSize: '100%',
        borderRadius: '50%'
    },
    active: {
        backgroundPosition: '0% 100%'
    }
}

export const ChampFireIcon = withStyles(champFireStyles)(
    ({ state = false }: ChampFireIconProps): JSX.Element => (
        <div
            style={{
                ...champFireStyles.default,
                ...(state ? champFireStyles.active : undefined)
            }}
            role="img"
            aria-label="champion's fire"
        />
    )
)
