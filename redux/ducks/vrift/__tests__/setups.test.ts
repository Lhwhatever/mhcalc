import reducer, * as setups from '../setups'

describe('setups (store slice) test', () => {
    describe('test updating reducers', () => {
        const initialState = setups.initialState

        test('updating speed should work', () => {
            expect(reducer(initialState, setups.updateSpeed({ floor: 1, value: 5 })).speed).toHaveProperty('1', 5)
            expect(reducer(initialState, setups.updateSpeed({ floor: 7, value: 6 })).speed).toHaveProperty('7', 6)

            const state: setups.SetupState = { ...initialState, speed: { [7]: 5, [9]: 6, [11]: 7 } }
            const newState = reducer(state, setups.updateSpeed({ floor: 1, value: 6 }))

            expect(newState.speed).not.toHaveProperty('7')
            expect(newState.speed).not.toHaveProperty('9')
            expect(newState.speed).toHaveProperty('11', 7)
        })

        test('updating siphon should work', () => {
            expect(reducer(initialState, setups.updateSiphon({ floor: 1, value: 15 })).siphon).toHaveProperty('1', 15)
            expect(reducer(initialState, setups.updateSiphon({ floor: 7, value: 20 })).siphon).toHaveProperty('7', 20)

            const state: setups.SetupState = { ...initialState, siphon: { [7]: 5, [9]: 10, [11]: 15 } }
            const newState = reducer(state, setups.updateSiphon({ floor: 1, value: 10 }))

            expect(newState.siphon).not.toHaveProperty('7')
            expect(newState.siphon).not.toHaveProperty('9')
            expect(newState.siphon).toHaveProperty('11', 15)
        })

        test('updating power should work', () => {
            expect(
                reducer(initialState, setups.updatePower({ floor: 1, target: 'eclipse', value: 8000 }))
            ).toHaveProperty('eclipse.power.1', 8000)

            expect(
                reducer(initialState, setups.updatePower({ floor: 1, target: 'regular', value: 6000 }))
            ).toHaveProperty('regular.power.1', 6000)

            expect(
                reducer(initialState, setups.updatePower({ floor: 2, target: 'regular', value: 6000 }))
            ).toHaveProperty('regular.power.2', 6000)
        })

        test('updating luck should work', () => {
            expect(reducer(initialState, setups.updateLuck({ floor: 1, target: 'eclipse', value: 20 }))).toHaveProperty(
                'eclipse.luck.1',
                20
            )

            expect(reducer(initialState, setups.updateLuck({ floor: 1, target: 'regular', value: 30 }))).toHaveProperty(
                'regular.luck.1',
                30
            )

            expect(reducer(initialState, setups.updateLuck({ floor: 2, target: 'regular', value: 30 }))).toHaveProperty(
                'regular.luck.2',
                30
            )
        })

        test('updating CF should work', () => {
            expect(
                reducer(initialState, setups.updateChampFire({ floor: 1, target: 'eclipse', value: false }))
            ).toHaveProperty('eclipse.champFire.1', false)
            expect(
                reducer(initialState, setups.updateChampFire({ floor: 1, target: 'regular', value: true }))
            ).toHaveProperty('regular.champFire.1', true)
        })
    })

    describe('test deleting reducers', () => {
        const initialState: setups.SetupState = {
            speed: { [1]: 5, [2]: 7 },
            siphon: { [1]: 5, [2]: 10 },
            regular: {
                power: { [1]: 5000, [2]: 6000 },
                luck: { [1]: 30, [2]: 40 },
                champFire: { [1]: false, [2]: true }
            },
            eclipse: {
                power: { [1]: 5000, [2]: 6000 },
                luck: { [1]: 30, [2]: 40 },
                champFire: { [1]: false, [2]: true }
            }
        }

        test('deleting speed will work for floor > 1', () => {
            expect(reducer(initialState, setups.deleteSpeed(1)).speed).toHaveProperty('1', 5)
            expect(reducer(initialState, setups.deleteSpeed(2)).speed).not.toHaveProperty('2')
        })

        test('deleting siphon will work for floor > 1', () => {
            expect(reducer(initialState, setups.deleteSiphon(1)).siphon).toHaveProperty('1', 5)
            expect(reducer(initialState, setups.deleteSiphon(2)).siphon).not.toHaveProperty('2')
        })

        test('deleting power will work for floor > 1', () => {
            expect(reducer(initialState, setups.deletePower('regular', 1))).toHaveProperty('regular.power.1', 5000)
            expect(reducer(initialState, setups.deletePower('regular', 2))).not.toHaveProperty('regular.power.2')
            expect(reducer(initialState, setups.deletePower('eclipse', 1))).toHaveProperty('eclipse.power.1', 5000)
            expect(reducer(initialState, setups.deletePower('eclipse', 2))).not.toHaveProperty('eclipse.power.2')
        })

        test('deleting luck will work for floor > 1', () => {
            expect(reducer(initialState, setups.deleteLuck('regular', 1))).toHaveProperty('regular.luck.1', 30)
            expect(reducer(initialState, setups.deleteLuck('regular', 2))).not.toHaveProperty('regular.luck.2')
            expect(reducer(initialState, setups.deleteLuck('eclipse', 1))).toHaveProperty('eclipse.luck.1', 30)
            expect(reducer(initialState, setups.deleteLuck('eclipse', 2))).not.toHaveProperty('eclipse.luck.2')
        })

        test('deleting CF will work for floor > 1', () => {
            expect(reducer(initialState, setups.deleteChampFire('regular', 1))).toHaveProperty(
                'regular.champFire.1',
                false
            )
            expect(reducer(initialState, setups.deleteChampFire('regular', 2))).not.toHaveProperty(
                'regular.champFire.2'
            )
            expect(reducer(initialState, setups.deleteChampFire('eclipse', 1))).toHaveProperty(
                'eclipse.champFire.1',
                false
            )
            expect(reducer(initialState, setups.deleteChampFire('eclipse', 2))).not.toHaveProperty(
                'eclipse.champFire.2'
            )
        })
    })
})
