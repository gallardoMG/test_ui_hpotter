export const favoritesReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD__ITEM':
            return [...state, action.payload]
        case 'ADD__ITEMS':
            return [...state, ...action.payload]
        case 'REMOVE__ITEM':
            return state.filter(el => el.name !== action.payload)
        default: return state;
    }
}