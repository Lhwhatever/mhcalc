import reducer, * as simInput from '../simInput'

describe('vriftSlice test', () => {
    it('should handle initial state', () => {
        expect(reducer(undefined, { type: undefined })).toStrictEqual(simInput.initialState)
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
