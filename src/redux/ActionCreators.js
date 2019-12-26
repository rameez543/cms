import { fetchProducts ,fetchBrands,fetchCategories,} from './Actions'
import axios from 'axios';
import { DEV_URL } from '../config/config'



export function getProducts() {
    return dispatch => {
        return axios.get(`${DEV_URL}/products`)
            .then(res => dispatch(fetchProducts(res.data)))
    }
}
export function getBrands() {
    return dispatch => {
        return axios.get(`${DEV_URL}/brands`)
            .then(res => dispatch(fetchBrands(res.data)))
            
    }
}
export function getCategories() {
    return dispatch => {
        return axios.get(`${DEV_URL}/categories`)
            .then(res => dispatch(fetchCategories(res.data)))
    }
}
