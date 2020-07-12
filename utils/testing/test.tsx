import { ThemeProvider } from '@material-ui/core'
import { render as rtlRender, RenderOptions, RenderResult as RtlRenderResult } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import realStore from '../../redux/store'
import theme from '../../theme'
import mockStore from './mockStore'

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

export function createRenderWithRedux(
    store: ReturnType<typeof mockStore> | typeof realStore,
    renderFunc: typeof render = rtlRender
): typeof render {
    const Wrapped = ({ children }: ComponentWrapperProps) => {
        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </Provider>
        )
    }

    return (ui: React.ReactElement, options?: RenderOptions) =>
        renderFunc(ui, { wrapper: Wrapped as React.ComponentType, ...options })
}

export type RenderResult<P> = Omit<ReturnType<typeof render>, 'rerender'> & {
    rerender: (additionalProps?: Partial<P>) => void
}

export type SetupFunc<P> = (additionalProps?: Partial<P>) => RenderResult<P>

export function createSetup<P>(
    Component: React.ComponentType<P>,
    componentProps: P,
    renderFunc: typeof render = render
): SetupFunc<P> {
    return (additionalProps?: Partial<P>) => {
        const { rerender: oldRerender, ...utils } = renderFunc(<Component {...componentProps} {...additionalProps} />)
        return {
            ...utils,
            rerender(additionalProps?: Partial<P>) {
                oldRerender(<Component {...componentProps} {...additionalProps} />)
            }
        }
    }
}
