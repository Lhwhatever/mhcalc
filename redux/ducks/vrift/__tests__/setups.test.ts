import reducer, * as setups from '../setups'

describe('setup test', () => {
    it('should have working action creators', () => {
        expect(setups.updatePower('eclipse', 5000, 1).payload).toMatchObject({ type: 'eclipse', value: 5000, level: 1 })
        expect(setups.updatePower('regular', undefined, 25).payload).toMatchObject({
            type: 'regular',
            value: undefined,
            level: 25
        })
        expect(setups.updatePower('regular', 4000, 9).payload).toMatchObject({ type: 'regular', value: 4000, level: 9 })

        expect(setups.updateLuck('eclipse', 30, 1).payload).toMatchObject({ type: 'eclipse', value: 30, level: 1 })
        expect(setups.updateLuck('eclipse', undefined, 1).payload).toMatchObject({
            type: 'eclipse',
            value: undefined,
            level: 1
        })
        expect(setups.updateLuck('regular', 25, 9).payload).toMatchObject({ type: 'regular', value: 25, level: 9 })

        expect(setups.updateChampFire('eclipse', true, 1).payload).toMatchObject({
            type: 'eclipse',
            value: true,
            level: 1
        })
        expect(setups.updateChampFire('regular', false, 17).payload).toMatchObject({
            type: 'regular',
            value: false,
            level: 17
        })

        expect(setups.updateSpeed('eclipse', 9, 1).payload).toMatchObject({ type: 'eclipse', value: 9, level: 1 })
        expect(setups.updateSpeed('regular', 5, 9).payload).toMatchObject({ type: 'regular', value: 5, level: 9 })

        expect(setups.updateSiphon(20, 1).payload).toMatchObject({ value: 20, level: 1 })
        expect(setups.updateSiphon(15).payload).toMatchObject({ value: 15, level: 1 })
    })

    it('should have working reducers', () => {
        const start: setups.SetupState = {
            regular: { [17]: { power: 2500, luck: 38, speed: 4, champFire: false } },
            eclipse: { [1]: { power: 15000, luck: 28, speed: 9, champFire: true, siphon: 20 } }
        }

        expect(reducer(start, setups.updatePower('eclipse', 5000, 1)).eclipse[1].power).toStrictEqual(5000)
        expect(reducer(start, setups.updatePower('regular', 4000, 9)).regular[9].power).toStrictEqual(4000)
        expect(reducer(start, setups.updatePower('regular', 17500, 17)).regular[17].power).toStrictEqual(17500)

        expect(reducer(start, setups.updateLuck('eclipse', 44, 1)).eclipse[1].luck).toStrictEqual(44)
        expect(reducer(start, setups.updateLuck('regular', 9, 17)).regular[17].luck).toStrictEqual(9)

        expect(reducer(start, setups.updateChampFire('eclipse', false, 1)).eclipse[1].champFire).toBeFalsy()
        expect(reducer(start, setups.updateChampFire('regular', true, 17)).regular[17].champFire).toBeTruthy()
        expect(reducer(start, setups.updateChampFire('regular', false, 25)).regular[25].champFire).toBeFalsy()

        expect(reducer(start, setups.updateSpeed('eclipse', 10, 1)).eclipse[1].speed).toStrictEqual(10)
        expect(reducer(start, setups.updateSpeed('regular', 5, 17)).regular[17].speed).toStrictEqual(5)

        expect(reducer(start, setups.updateSiphon(15, 1)).eclipse[1].siphon).toStrictEqual(15)
    })
})
