export const stateButtonsReducer = (state = { students: false, staff: false }, action) => {
    switch (action.type) {
        case 'BTN__STATE':
            return Object.assign(state, action.payload)
        default: return state;
    }
}