export const getDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD__DATA':
            return [...state, ...action.payload];
        case 'ADD__CHAR':
            return [...state, action.payload];
        case 'ADD__CHAR__AFTER': {
            return state
        }
        case 'STUDENTS__DATA-HIDD':
            return state.filter(el => el[action.payload] === false)
        case 'STAFF__DATA-HIDD':
            return state.filter(el => el[action.payload] === false)
        default: return state;
    }
}