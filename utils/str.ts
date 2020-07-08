/**
 * Renders a number as a string. If the parameter given is undefined, returns the empty string.
 *
 * @param num Number to render as a string. Can be undefined.
 * @returns Number as a string.
 */
export function renderNumber(num?: number): string {
    return num === undefined ? '' : num.toString()
}

/**
 * Tries to parse a string as an integer. If the string is empty, returns undefined.
 * If the string is non-numeric, returns NaN.
 * @param str The string to parse.
 * @param radix The base system to use. Defaults to 10.
 * @returns The integer.
 */
export function asInteger(str: string, radix = 10): number | undefined {
    return str ? parseInt(str, radix) : undefined
}

/**
 * Converts a string of alphabetical and whitespace characters in normal English syntax to kebab-case.
 * @param text The text to convert.
 * @returns The text in kebab-case.
 */
export function textToKebabCase(text: string): string {
    return text.toLowerCase().replace(/ /g, '-')
}
