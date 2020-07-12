import reducer, * as simInput from '../simInput'

describe('vriftSlice test', () => {
    it('should handle initial state', () => {
        expect(reducer(undefined, { type: undefined })).toStrictEqual(simInput.initialState)
    })

    it('should have working action creators', () => {
        expect(simInput.updateInitialSync(80).payload).toBe(80)
        expect(simInput.updateInitialSync(90).payload).toBe(90)

        expect(simInput.updateHuntsLeft(20).payload).toBe(20)
        expect(simInput.updateHuntsLeft(30).payload).toBe(30)

        expect(simInput.updateSteps(20).payload).toBe(20)
        expect(simInput.updateSteps(30).payload).toBe(30)

        expect(simInput.updateAugment({ target: 'sigilHunter', state: true }).payload).toStrictEqual({
            target: 'sigilHunter',
            state: true
        })
        expect(simInput.updateAugment({ target: 'superSiphon', state: false }).payload).toStrictEqual({
            target: 'superSiphon',
            state: false
        })
    })

    it('should handle simInputs/updateInitialSync', () => {
        expect(reducer(simInput.initialState, simInput.updateInitialSync(70))).toStrictEqual({
            ...simInput.initialState,
            initialSync: 70
        })

        expect(reducer(simInput.initialState, simInput.updateInitialSync(50))).toStrictEqual({
            ...simInput.initialState,
            initialSync: 50
        })
    })

    it('should handle simInputs/updateHuntsLeft', () => {
        expect(reducer(simInput.initialState, simInput.updateHuntsLeft(20))).toStrictEqual({
            ...simInput.initialState,
            huntsLeft: 20
        })

        expect(reducer(simInput.initialState, simInput.updateHuntsLeft(120))).toStrictEqual({
            ...simInput.initialState,
            huntsLeft: 120
        })
    })

    it('should handle simInputs/updateSteps', () => {
        expect(reducer(simInput.initialState, simInput.updateSteps(300))).toStrictEqual({
            ...simInput.initialState,
            steps: 300
        })

        expect(reducer(simInput.initialState, simInput.updateSteps(9001))).toStrictEqual({
            ...simInput.initialState,
            steps: 9001
        })
    })

    it('should handle simInputs/updateAugment', () => {
        expect(
            reducer(simInput.initialState, simInput.updateAugment({ target: 'ultimateUmbra', state: true }))
        ).toStrictEqual({
            ...simInput.initialState,
            augments: { ...simInput.initialState.augments, ultimateUmbra: true }
        })

        expect(
            reducer(simInput.initialState, simInput.updateAugment({ target: 'superSiphon', state: false }))
        ).toStrictEqual({
            ...simInput.initialState,
            augments: { ...simInput.initialState.augments, superSiphon: false }
        })
    })
})
