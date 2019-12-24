import { fetchProducts } from './Actions'
import axios from 'axios';
import { DEV_URL } from '../config/config'



export function getProducts() {
    return dispatch => {
        return axios.get(`${DEV_URL}/getBrands`)
            .then(res => dispatch(fetchProducts(res.data)))
    }
}