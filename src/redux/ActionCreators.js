import { fetchProducts ,fetchBrands,fetchCategories,} from './Actions'
import axios from 'axios';
import { DEV_URL } from '../config/config'



export function getProducts(params) {
    if(params){
        console.log('params',params)
        return dispatch => {
            return axios.get(`${DEV_URL}/products${params}`)
                .then(res => dispatch(fetchProducts(res.data)))
                .catch(res=>console.log(res))
        }
    }
    return dispatch => {
        return axios.get(`${DEV_URL}/products`)
            .then(res => dispatch(fetchProducts(res.data)))
            .catch(ex=>console.log(ex))
    }
}
export function getBrands() {
    return dispatch => {
        return axios.get(`${DEV_URL}/brands`)
            .then(res => dispatch(fetchBrands(res.data)))
            .catch(ex=>console.log(ex))
            
    }
}
export function getCategories() {
    return dispatch => {
        return axios.get(`${DEV_URL}/categories`)
            .then(res => dispatch(fetchCategories(res.data)))
            .catch(ex=>console.log(ex))
    }
}
