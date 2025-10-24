/**
 * Proxy module for interacting with the Products Service API.
 * @module ProductsServiceProxy
 * @description This module provides functions to create and delete products
 *              by communicating with the backend API. It handles authentication
 *              and error management for API requests.
 * @param {Object} productVO - The Product Value Object containing product data.
 * @returns {Object} An object containing methods to create and delete products.
 * 
 * @author Carlos Alejandro Ortiz Caro
 * @author Renata Loaiza
 * 
 * @example
 * const productsService = ProductsServiceProxy();
 * const newProduct = await productsService.createProduct(productVO);   
 */

import { ProductVO } from '../valueobjects/products/ProductVO';
import { API_BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

const ProductsServiceProxy = () => {
    async function getProduct(productId) {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(`${API_BASE_URL}/v1/products/get/${productId}`, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error desconocido');

        return new ProductVO(data);
    }

    const createProduct = async (productVO) => {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(`${API_BASE_URL}/v1/products/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(productVO),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error desconocido');

        return new ProductVO(data);
    }

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

    const deleteProduct = async (productId) => {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(`${API_BASE_URL}/v1/products/delete/${productId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error desconocido');

        return data.success;
    }

    return {
        getProduct,
        createProduct,
        deleteProduct,
        editProduct
    }
};

export default ProductsServiceProxy;