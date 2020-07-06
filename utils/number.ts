export function coerceToRange(num: number, min = -Infinity, max = +Infinity): number {
    return Math.min(Math.max(num, min), max)
}
