import { coerceToRange } from '../number'

describe('number test', () => {
    test('coerceToRange test', () => {
        expect(coerceToRange(1, undefined, undefined)).toBe(1)
        expect(coerceToRange(-1, undefined, undefined)).toBe(-1)

        expect(coerceToRange(5, 1, undefined)).toBe(5)
        expect(coerceToRange(1, undefined, 10)).toBe(1)

        expect(coerceToRange(0, 1, undefined)).toBe(1)
        expect(coerceToRange(5, undefined, 4)).toBe(4)
    })

    test('coerceToRange default values', () => {
        const minSpy = jest.spyOn(Math, 'min')
        const maxSpy = jest.spyOn(Math, 'max')

        coerceToRange(1, undefined, 5)
        expect(maxSpy).lastCalledWith(1, -Infinity)

        coerceToRange(1, 0)
        expect(minSpy).lastCalledWith(1, +Infinity)
    })
})
