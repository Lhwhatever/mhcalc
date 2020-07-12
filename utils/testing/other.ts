import { fireEvent } from '@testing-library/react'

function setupMuiSelectTest(select: HTMLElement, waitFunc: () => Promise<HTMLElement>): Promise<HTMLElement>
function setupMuiSelectTest(select: HTMLElement, waitFunc: () => Promise<HTMLElement[]>): Promise<HTMLElement[]>
function setupMuiSelectTest(
    select: HTMLElement,
    waitFunc: (() => Promise<HTMLElement>) | (() => Promise<HTMLElement[]>)
): Promise<HTMLElement | HTMLElement[]> {
    fireEvent.mouseDown(select)
    return waitFunc()
}

export { setupMuiSelectTest }
