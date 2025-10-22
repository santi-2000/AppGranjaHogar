import { API_BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

/**
 * Product Edit Service Proxy
 * @module ProductEditProxy
 * @description This module provides a proxy for editing products through the API.
 *              It handles HTTP requests for product updates and manages error handling
 *              for different HTTP response statuses.
 * 
 * @author Renata Loaiza
 * 
 * @example
 * import ProductEditProxy from '../proxies/ProductEditProxy.js';
 * 
 * const { editProduct } = ProductEditProxy();
 * const updatedProduct = await editProduct(productId, productVO);
 */
const ProductEditProxy = () => {
    /**
     * Edits an existing product
     * @param {string} productId - The ID of the product to edit
     * @param {ProductVO} productVO - The updated product data
     * @returns {Promise<Object>} The updated product data
     * @throws {Error} If the request fails
     */
    async function editProduct(productId, productVO) {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(`${API_BASE_URL}/v1/products/editar/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(productVO)
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error desconocido');

        return data.product;
    }

    return { editProduct };
};

export default ProductEditProxy;
