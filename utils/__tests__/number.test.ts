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
})
