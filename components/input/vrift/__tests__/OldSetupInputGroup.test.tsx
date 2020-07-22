import userEvent from '@testing-library/user-event'
import React from 'react'
import { AnyAction } from 'redux'
import {
    updateChampFire,
    updateLuck,
    updatePower,
    updateSiphon,
    updateSpeed
} from '../../../../redux/ducks/vrift/setups'
import { createChangeEvent } from '../../../../utils/testing/event'
import mockStore from '../../../../utils/testing/mockStore'
import { openMuiSelect, selectMuiSelectOption } from '../../../../utils/testing/other'
import { createRenderWithRedux, fireEvent, screen, within } from '../../../../utils/testing/test'
import SetupInputGroup from '../OldSetupInputGroup'

const store = mockStore({
    vrift: {
        setups: {
            eclipse: { [1]: { speed: 10, siphon: 25, champFire: true } },
            regular: {
                [1]: { speed: 10, champFire: false },
                [9]: { speed: 10, champFire: false },
                [17]: { speed: 10, champFire: false },
                [25]: { speed: 10, champFire: false }
            }
        }
    }
})

const tabs = ['eclipse', 'floors 1-7', 'floors 9-15', 'floors 17-23', 'floors 25+']

const testInputs = (
    dispatchSpy: jest.SpyInstance<AnyAction, [AnyAction]>,
    selectFloor: (floor: string) => Promise<void>
) => {
    describe('test inputs', () => {
        it('should have the necessary inputs', () => {
            expect(screen.getByLabelText(/power/i)).toBeInTheDocument()
            expect(screen.getByLabelText(/luck/i)).toBeInTheDocument()
            expect(screen.getByLabelText(/attraction bonus/i)).toBeInTheDocument()
            expect(screen.getByLabelText(/speed/i)).toBeInTheDocument()
            expect(screen.getByRole('switch', { name: /champion's fire/i })).toBeInTheDocument()
        })

        it('should have the necessary icon labels', () => {
            expect(screen.getByRole('img', { name: /power/i })).toBeInTheDocument()
            expect(screen.getByRole('img', { name: /luck/i })).toBeInTheDocument()
            expect(screen.getByRole('img', { name: /attraction bonus/i })).toBeInTheDocument()
            expect(screen.getByRole('img', { name: /speed/i })).toBeInTheDocument()
            expect(screen.getByRole('img', { name: /champion's fire/i })).toBeInTheDocument()
        })

        it('should have working power field', async () => {
            const powerInput = screen.getByLabelText(/power/i)
            fireEvent.change(powerInput, createChangeEvent('4700'))
            expect(dispatchSpy).toBeCalledWith(updatePower('eclipse', 4700, 1))

            await selectFloor(tabs[2])
            fireEvent.change(powerInput, createChangeEvent('3200'))
            expect(dispatchSpy).toBeCalledWith(updatePower('regular', 3200, 9))
        })

        it('should have working luck field', async () => {
            const luckInput = screen.getByLabelText(/luck/i)
            fireEvent.change(luckInput, createChangeEvent('38'))
            expect(dispatchSpy).toBeCalledWith(updateLuck('eclipse', 38, 1))

            await selectFloor(tabs[4])
            fireEvent.change(luckInput, createChangeEvent('26'))
            expect(dispatchSpy).toBeCalledWith(updateLuck('regular', 26, 25))
        })

        it('should have working speed field', async () => {
            const speedInput = screen.getByLabelText(/speed/i)
            await selectMuiSelectOption(speedInput, /Lvl\. 8/i)
            expect(dispatchSpy).toBeCalledWith(updateSpeed('eclipse', 8, 1))

            await selectFloor(tabs[3])
            await selectMuiSelectOption(speedInput, /Lvl\. 6/i)
            expect(dispatchSpy).toBeCalledWith(updateSpeed('regular', 6, 17))
        })

        it('should have working siphon field with icon, only in eclipse mode', async () => {
            const siphonIcon = screen.queryByRole('img', { name: /siphon/i })
            expect(siphonIcon).toBeInTheDocument()
            const siphonInput = screen.queryByLabelText(/siphon/i)
            expect(siphonInput).toBeInTheDocument()

            await selectMuiSelectOption(siphonInput!, /Lvl\. 2/i)
            expect(dispatchSpy).toBeCalledWith(updateSiphon(10, 1))

            await selectFloor(tabs[1])
            expect(siphonIcon).not.toBeInTheDocument()
            expect(siphonInput).not.toBeInTheDocument()
        })

        it('should have working CF switch', async () => {
            const champFireSwitch = screen.getByRole('switch', { name: /champion's fire/i })
            userEvent.click(champFireSwitch)
            expect(dispatchSpy).toBeCalledWith(updateChampFire('eclipse', false, 1))

            await selectFloor(tabs[2])
            userEvent.click(champFireSwitch)
            expect(dispatchSpy).toBeCalledWith(updateChampFire('regular', true, 9))
        })
    })
}

describe('SetupInputGroup test (mobile variant)', () => {
    const getFloorSelector = () => screen.getByLabelText(/setup/i)
    const selectFloor = async (matcher: string, select = getFloorSelector()) => {
        await selectMuiSelectOption(select, new RegExp(matcher, 'i'))
    }

    const dispatchSpy = jest.spyOn(store, 'dispatch')

    beforeEach(() => {
        createRenderWithRedux(store)(<SetupInputGroup />)
    })

    it('should have a header', () => {
        expect(screen.getByRole('heading', { name: /setup/i })).toBeInTheDocument()
    })

    it('should have a floor selector', () => {
        expect(getFloorSelector()).toBeInTheDocument()
    })

    it('should have 5 options in floor selector', async () => {
        const floorSelector = getFloorSelector()
        const listbox = await openMuiSelect(floorSelector)

        tabs.forEach((tab) => {
            expect(within(listbox).getByRole('option', { name: new RegExp(tab, 'i') })).toBeInTheDocument
        })
    })

    it('should have working tab selector', async () => {
        const floorSelector = getFloorSelector()

        await selectFloor(tabs[1], floorSelector)
        expect(floorSelector).toHaveTextContent(/Floors 1-7/i)
    })

    testInputs(dispatchSpy, selectFloor)
})
