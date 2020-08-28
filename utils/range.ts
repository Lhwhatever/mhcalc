/**
 * Produces an array of strings that represent consecutive integral ranges.
 * Should not mutate the given list.
 * @param list The lower ends of the ranges, as an array of strictly increasing integers.
 * @returns The array of strings that represent integral ranges.
 */
export function formatRange(list: number[]): string[] {
    if (!list.length) return []

    const result = list.slice(1).reduce(
        (cumul, elem) => {
            const { list, last } = cumul
            list.push(last === elem - 1 ? last.toString() : `${last}-${elem - 1}`)
            return { list, last: elem }
        },
        { list: [] as string[], last: list[0] }
    )

    result.list.push(`${result.last}+`)
    return result.list
}
