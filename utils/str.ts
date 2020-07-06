/**
 * Renders a number as a string. If the parameter given is undefined, returns the empty string.
 *
 * @param num Number to render as a string. Can be undefined.
 */
export function renderNumber(num?: number): string {
    return num === undefined ? '' : num.toString()
}

/**
 * Tries to parse a string as an integer. If the string is empty, returns undefined.
 * If the string is non-numeric, returns NaN.
 * @param str The string to parse.
 * @param radix The base system to use. Defaults to 10.
 */
export function asInteger(str: string, radix = 10): number | undefined {
    return str ? parseInt(str, radix) : undefined
}
