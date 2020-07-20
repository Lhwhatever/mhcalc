import React from 'react'
import { render, screen } from '../../../utils/testing/test'
import ValourRiftSimPage from '../index'
import Layout from '../../../components/layout/Layout'
import { mocked } from 'ts-jest/utils'
import CurrentProgressInputGroup from '../../../components/input/vrift/CurrentProgressInputGroup'
import AugmentInputGroup from '../../../components/input/vrift/AugmentInputGroup'
import SetupInputGroup from '../../../components/input/vrift/SetupInputGroup'

const testIds = {
    layout: 'Layout',
    currentProgress: 'CurrentProgressInputGroup',
    augmentInput: 'AugmentInputGroup',
    setupInput: 'SetupInputGroup'
}

jest.mock('../../../components/layout/Layout', () => ({
    __esModule: true,
    default: jest.fn()
}))

mocked(Layout).mockImplementation(({ children }) => <div data-testid={testIds.layout}>{children}</div>)

jest.mock('../../../components/input/vrift/CurrentProgressInputGroup', () => ({
    __esModule: true,
    default: jest.fn()
}))

mocked(CurrentProgressInputGroup).mockReturnValue(<div data-testid={testIds.currentProgress} />)

jest.mock('../../../components/input/vrift/AugmentInputGroup', () => ({
    __esModule: true,
    default: jest.fn()
}))

mocked(AugmentInputGroup).mockReturnValue(<div data-testid={testIds.augmentInput} />)

jest.mock('../../../components/input/vrift/SetupInputGroup', () => ({
    __esModule: true,
    default: jest.fn()
}))

mocked(SetupInputGroup).mockReturnValue(<div data-testid={testIds.setupInput} />)

describe('ValourRiftSimPage test', () => {
    beforeEach(() => {
        render(<ValourRiftSimPage />)
    })

    it('should use Layout', () => {
        expect(screen.getByTestId(testIds.layout)).toBeInTheDocument()
    })

    it('should have all three input groups', () => {
        expect(screen.getByTestId(testIds.currentProgress)).toBeInTheDocument()
        expect(screen.getByTestId(testIds.augmentInput)).toBeInTheDocument()
        expect(screen.getByTestId(testIds.setupInput)).toBeInTheDocument()
    })
})
