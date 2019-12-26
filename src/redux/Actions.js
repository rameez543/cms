export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_BRANDS = 'FETCH_BRANDS';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';


export function fetchProducts(data) {
    return {
        type: FETCH_PRODUCTS,
        data
    }
}
export function fetchBrands(data) {
    return {
        type: FETCH_BRANDS,
        data
    }
}
export function fetchCategories(data) {
    return {
        type: FETCH_CATEGORIES,
        data
    }
}

