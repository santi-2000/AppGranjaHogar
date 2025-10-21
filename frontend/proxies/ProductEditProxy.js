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

        if (!response.ok) {
            if (response.status === 400) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Datos inválidos');
            } else if (response.status === 401) {
                throw new Error('No autorizado');
            } else if (response.status === 404) {
                throw new Error('Producto no encontrado');
            } else if (response.status === 500) {
                throw new Error('Error interno del servidor');
            } else if (response.status === 503) {
                throw new Error('Servicio no disponible');
            } else {
                throw new Error('Error desconocido');
            }
        }

        const data = await response.json();
        return data.product;
    }

    return { editProduct };
};

export default ProductEditProxy;
