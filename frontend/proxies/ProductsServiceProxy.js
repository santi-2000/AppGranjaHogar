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
 * 
 * @example
 * const productsService = ProductsServiceProxy();
 * const newProduct = await productsService.createProduct(productVO);   
 */

import { ProductVO } from '../valueobjects/products/ProductVO';
import { API_BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

const ProductsServiceProxy = () => {
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

        if (!response.ok) {
            if (response.status === 400) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Request invalido');
            } else if (response.status === 401) {
                throw new Error('No autorizado');
            } else if (response.status === 403) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'No tienes permisos para crear productos');
            } else if (response.status === 500) {
                throw new Error('Error interno del servidor');
            } else if (response.status === 503) {
                throw new Error('Servicio no disponible');
            } else {
                throw new Error('Error desconocido');
            }
        }

        const data = await response.json();
        return new ProductVO(data);
    }

    const deleteProduct = async (productId) => {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(`${API_BASE_URL}/v1/products/delete/${productId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) {
            if (response.status === 400) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Request invalido');
            } else if (response.status === 500) {
                throw new Error('Error interno del servidor');
            } else if (response.status === 503) {
                throw new Error('Servicio no disponible');
            } else {
                throw new Error('Error desconocido');
            }
        }

        const data = await response.json();
        return data.success;
    }

    return {
        createProduct,
        deleteProduct,
    }
};

export default ProductsServiceProxy;