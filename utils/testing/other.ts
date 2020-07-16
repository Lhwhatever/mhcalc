import { within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

/**
 * Opens a Material-UI <Select /> component.
 * @param select The <Select /> component.
 * @returns A Promise of the element with role 'listbox'.
 */
export const openMuiSelect = async (select: HTMLElement): Promise<HTMLElement> => {
    userEvent.click(select)
    return await within(document.body).findByRole('listbox')
}

/**
 * Select an option from a Material-UI <Select /> component.
 * @param select The element with role 'button' that represents this component.
 * @param option A string or RegExp matching the desired option.
 */
export const selectMuiSelectOption = async (select: HTMLElement, option: string | RegExp): Promise<void> => {
    const listbox = await openMuiSelect(select)
    const listItem = await within(listbox).findByRole('option', { name: option })
    userEvent.click(listItem)
}
