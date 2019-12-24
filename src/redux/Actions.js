export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export function fetchProducts(data) {
    return {
        type: FETCH_PRODUCTS,
        data
    }
}