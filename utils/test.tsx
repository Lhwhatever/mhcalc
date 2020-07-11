import { ThemeProvider } from '@material-ui/core'
import { render as rtlRender, RenderOptions, RenderResult as RtlRenderResult } from '@testing-library/react'
import React from 'react'
import { InputChangeEvent } from '../components/input/types'
import theme from '../theme'

interface ComponentWrapperProps {
    children: React.ReactNode
}

const ComponentWrapper = ({ children }: ComponentWrapperProps) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

const render = (ui: React.ReactElement, options?: RenderOptions): RtlRenderResult =>
    rtlRender(ui, { wrapper: ComponentWrapper as React.ComponentType, ...options })

export * from '@testing-library/react'
export { render }

export type RenderResult<P> = Omit<ReturnType<typeof render>, 'rerender'> & {
    rerender: (additionalProps?: Partial<P>) => void
}

type SetupFunc<P> = (additionalProps?: Partial<P>) => RenderResult<P>

export function createSetup<P>(Component: React.ComponentType<P>, componentProps: P): SetupFunc<P> {
    return (additionalProps?: Partial<P>) => {
        const { rerender: oldRerender, ...utils } = render(<Component {...componentProps} {...additionalProps} />)
        return {
            ...utils,
            rerender(additionalProps?: Partial<P>) {
                oldRerender(<Component {...componentProps} {...additionalProps} />)
            }
        }
    }
}

export interface InputChangeEventOptions {
    target: Pick<InputChangeEvent['target'], 'value'>
}

export const createChangeEvent = (value: string): InputChangeEventOptions => ({ target: { value } })
