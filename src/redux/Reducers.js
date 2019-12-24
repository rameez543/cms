import { FETCH_PRODUCTS } from './Actions'
import { combineReducers } from 'redux'

export function productsReducer(state = {}, action) {
    switch (action.type) {

        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.data
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    productsReducer
})
export default rootReducer