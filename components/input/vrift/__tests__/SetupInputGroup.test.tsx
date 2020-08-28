import userEvent from '@testing-library/user-event'
import React from 'react'
import mockStore from '../../../../utils/testing/mockStore'
import { createRenderWithRedux, screen, getRoles, prettyDOM, cleanup, within } from '../../../../utils/testing/test'
import SetupInputGroup from '../SetupInputGroup'
import { AnyAction } from 'redux'
import { deleteSpeed } from '../../../../redux/ducks/vrift/setups'
import { MockStoreEnhanced } from 'redux-mock-store'

describe('SetupInputGroup test', () => {
    const categoryMatchers = {
        eclipse: /^Eclipse$/i,
        regular: /^Non-Eclipse$/i
    }

    const getRegularTab = () => screen.getByRole('tab', { name: categoryMatchers.regular })

    const store = mockStore({
        vrift: {
            setups: {
                speed: { [1]: 10 },
                siphon: { [1]: 25 }
            }
        }
    })

    const altStore = mockStore({
        vrift: {
            setups: {
                speed: { [1]: 7, [17]: 8 },
                siphon: { [1]: 20, [25]: 25 }
            }
        }
    })

    const setupStoreActions = (store: MockStoreEnhanced<unknown, {}>): unknown[] => {
        store.clearActions()
        return store.getActions()
    }

    const getOptionsBtn = (stat: string, floorRange: string) =>
        screen.getByRole('button', {
            name: new RegExp(`more options for ${stat} \\(floors ${floorRange.replace(/\+/g, '\\+')}\\)`, 'i')
        })

    const renderTarget = <SetupInputGroup />

    beforeEach(() => {
        createRenderWithRedux(store)(renderTarget)
    })

    it('should have a heading', () => {
        expect(screen.getByRole('heading', { name: /Setup/i })).toBeInTheDocument()
    })

    it('should have a tab selector', () => {
        expect(screen.getByRole('tablist', { name: /Setup Category/i })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: categoryMatchers.eclipse })).toBeInTheDocument()
        expect(getRegularTab()).toBeInTheDocument()
    })

    it('should have one icon for each shared stat', () => {
        expect(screen.getByRole('img', { name: /Speed/i })).toBeInTheDocument()
        expect(screen.getByRole('img', { name: /Siphon/i })).toBeInTheDocument()
    })

    it('should have one speed input per speed entry', () => {
        expect(screen.getByLabelText(/(?<!options.*)speed \(floors 1\+\)/i)).toBeInTheDocument()

        cleanup()
        createRenderWithRedux(altStore)(renderTarget)
        expect(screen.getByLabelText(/(?<!options.*)speed \(floors 1-16\)/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/(?<!options.*)speed \(floors 17\+\)/i)).toBeInTheDocument()
    })

    describe('test speed options button', () => {
        const getMenu = () => screen.getByRole('menu')

        function testForEditBtn(menu: HTMLElement, floor: number, actions: unknown[]) {
            const editBtn = within(menu).getByRole('menuitem', { name: /edit/i })
            expect(editBtn).toBeInTheDocument()
        }

        function testForDuplicateBtn(menu: HTMLElement, floor: number, actions: unknown[]) {
            const dupeBtn = within(menu).getByRole('menuitem', { name: /duplicate/i })
            expect(dupeBtn).toBeInTheDocument()
        }

        function testForDeleteBtn(menu: HTMLElement, floor: number, actions: unknown[]) {
            const deleteBtn = within(menu).getByRole('menuitem', { name: /delete/i })

            expect(deleteBtn).toBeInTheDocument()
            userEvent.click(deleteBtn)

            expect(actions).toContainEqual(deleteSpeed(floor))
        }

        beforeEach(() => {
            cleanup()
        })

        it('should have one options menu when there is one speed entry', () => {
            createRenderWithRedux(store)(renderTarget)

            const optionsBtn = getOptionsBtn('speed', '1+')

            userEvent.click(optionsBtn)
            testForEditBtn(getMenu(), 1, setupStoreActions(store))

            userEvent.click(optionsBtn)
            testForDuplicateBtn(getMenu(), 1, setupStoreActions(store))
        })

        it('should have two options when there are two speed entries', () => {
            createRenderWithRedux(altStore)(renderTarget)

            const optionsBtn1 = getOptionsBtn('speed', '1-16')
            const optionsBtn17 = getOptionsBtn('speed', '17+')

            userEvent.click(optionsBtn1)
            testForEditBtn(getMenu(), 1, setupStoreActions(altStore))

            userEvent.click(optionsBtn1)
            testForDuplicateBtn(getMenu(), 1, setupStoreActions(altStore))

            userEvent.click(optionsBtn17)
            testForEditBtn(getMenu(), 17, setupStoreActions(altStore))

            userEvent.click(optionsBtn17)
            testForDuplicateBtn(getMenu(), 17, setupStoreActions(altStore))

            userEvent.click(optionsBtn17)
            testForDeleteBtn(getMenu(), 17, setupStoreActions(altStore))
        })
    })

    describe('Non-Eclipse setups', () => {
        beforeEach(() => {
            userEvent.click(getRegularTab())
        })

        it('should have a tabpanel for non-eclipse', () => {
            expect(screen.getByRole('tabpanel', { name: categoryMatchers.regular })).toBeInTheDocument()
        })

        it('should have one icon for each stat', () => {
            expect(screen.getByRole('img', { name: /Power/i })).toBeInTheDocument()
        })
    })
})
