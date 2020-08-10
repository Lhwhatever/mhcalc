import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import createMenu, { MenuItem } from '../createMenu'

describe('createMenu test', () => {
    const handlerFoo = jest.fn()
    const handlerBar = jest.fn()

    const items = [{ item: 'foo', onClick: handlerFoo } as MenuItem]
    const altItems = items.concat([{ item: 'bar', onClick: handlerBar }])
    const settings = { menuId: 'simple-menu', ariaLabel: 'open menu', componentDisplayName: 'Menu' }

    const getMenuButton = () => screen.getByRole('button', { name: /open menu/i })

    it('should create an icon button', () => {
        render(React.createElement(createMenu([], settings)))
        expect(getMenuButton()).toBeInTheDocument()
    })

    test('button should open a menu when clicked', () => {
        render(React.createElement(createMenu(items, settings)))
        userEvent.click(getMenuButton())
        expect(screen.getByRole('menu')).toBeInTheDocument()
    })

    test('menu should render each of the menu items supplied', () => {
        render(React.createElement(createMenu(items, settings)))
        userEvent.click(getMenuButton())
        expect(screen.getAllByRole('menuitem')).toHaveLength(1)
        expect(screen.getByRole('menuitem', { name: /foo/i })).toBeInTheDocument()

        render(React.createElement(createMenu(altItems, settings)))
        userEvent.click(getMenuButton())
        expect(screen.getAllByRole('menuitem')).toHaveLength(2)
        expect(screen.getByRole('menuitem', { name: /foo/i })).toBeInTheDocument()
        expect(screen.getByRole('menuitem', { name: /bar/i })).toBeInTheDocument()
    })

    test('menu items should trigger the given onClick and close the menu', () => {
        render(React.createElement(createMenu(altItems, settings)))

        userEvent.click(getMenuButton())
        userEvent.click(screen.getByRole('menuitem', { name: /foo/i }))

        expect(handlerFoo).toBeCalledTimes(1)
        expect(handlerBar).toBeCalledTimes(0)
        expect(screen.queryByRole('menu')).toBeNull()
        expect(getMenuButton()).toBeInTheDocument()

        userEvent.click(getMenuButton())
        userEvent.click(screen.getByRole('menuitem', { name: /bar/i }))

        expect(handlerFoo).toBeCalledTimes(1)
        expect(handlerBar).toBeCalledTimes(1)
        expect(screen.queryByRole('menu')).toBeNull()
        expect(getMenuButton()).toBeInTheDocument()
    })
})
