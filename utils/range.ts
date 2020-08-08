/**
 * Produces an array of strings that represent consecutive integral ranges.
 * @param list The lower ends of the ranges, as an array of strictly increasing integers.
 * @returns The array of strings that represent integral ranges.
 */
export function formatRange(list: number[]): string[] {
    const first = list.shift()
    if (first === undefined) return []

    const result = list.reduce(
        (cumul, elem) => {
            const { list, last } = cumul
            list.push(last === elem - 1 ? last.toString() : `${last}-${elem - 1}`)
            return { list, last: elem }
        },
        { list: [] as string[], last: first }
    )

    result.list.push(`${result.last}+`)
    return result.list
}
