import { API_BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

/**
 * @module InventoryServiceProxy
 * @description This module provides a proxy for interacting with the inventory-related endpoints of the API.
 * It handles HTTP requests for fetching inventory and product quantity.
 * It also manages error handling for different HTTP response statuses.
 * @author Roberto Santiago Estrada Orozco
 * @example
 * import { getInventory, getProductQuantity } from '../proxies/InventoryServiceProxy.js';
 * const inventory = await getInventory();
 */

const INVENTORY_ENDPOINT = '/v1/products/inventory';
const QUANTITY_ENDPOINT = '/v1/products';


export const getInventory = async () => {
    try {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(`${API_BASE_URL}${INVENTORY_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token

            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching inventory:', error);
        throw error;
    }
};

export const getProductQuantity = async (productId) => {
    try {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(`${API_BASE_URL}${QUANTITY_ENDPOINT}/${productId}/quantity`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token

            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product quantity:', error);
        throw error;
    }
};
