import { formatRange } from '../range'

describe('test range util functions', () => {
    test('formatRange', () => {
        expect(formatRange([])).toEqual([])

        expect(formatRange([1])).toEqual(['1+'])
        expect(formatRange([0])).toEqual(['0+'])

        expect(formatRange([1, 5])).toEqual(['1-4', '5+'])
        expect(formatRange([1, 10, 100])).toEqual(['1-9', '10-99', '100+'])

        expect(formatRange([1, 2])).toEqual(['1', '2+'])
        expect(formatRange([1, 3, 4])).toEqual(['1-2', '3', '4+'])

        // Test for mutation
        const testRange = [1, 2, 6]
        expect(formatRange(testRange)).toEqual(['1', '2-5', '6+'])
        expect(testRange).toEqual([1, 2, 6])
    })
})
