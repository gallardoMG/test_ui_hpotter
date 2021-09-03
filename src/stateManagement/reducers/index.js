import { combineReducers } from 'redux'
import { getDataReducer } from './getData'
import { favoritesReducer } from './favoritesReducer'
import { stateButtonsReducer } from './stateButtons'

export const rootReducer = combineReducers({
    getDataReducer,
    favoritesReducer,
    stateButtonsReducer
})