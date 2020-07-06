import { renderNumber, asInteger } from '../str'

describe('str test', () => {
    test('renderNumber should work', () => {
        expect(renderNumber(1)).toBe('1')
        expect(renderNumber(15)).toBe('15')
        expect(renderNumber(-10)).toBe('-10')
        expect(renderNumber(undefined)).toBe('')
    })

    test('asInteger should work', () => {
        expect(asInteger('1')).toBe(1)
        expect(asInteger('15')).toBe(15)
        expect(asInteger('-10')).toBe(-10)
        expect(asInteger('')).toBeUndefined()

        expect(asInteger('10', 16)).toBe(0x10)
        expect(asInteger('ff', 16)).toBe(0xff)
    })
})
