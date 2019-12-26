import { FETCH_PRODUCTS, FETCH_BRANDS, FETCH_CATEGORIES,} from './Actions'
import { combineReducers } from 'redux'


export function productsReducer(state = {}, action) {
    switch (action.type) {

        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.data
            }
        case FETCH_CATEGORIES:
            return {
                ...state,
                categories: action.data
            }
        case FETCH_BRANDS:
            return {
                ...state,
                brands: action.data
            }
        
            
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    productsReducer
})
export default rootReducer