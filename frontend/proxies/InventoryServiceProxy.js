import { API_BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

const INVENTORY_ENDPOINT = '/v1/products/inventory';
const QUANTITY_ENDPOINT = '/v1/products';

export const getInventory = async () => {
    try {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(`${API_BASE_URL}${INVENTORY_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Barier " + token

            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("InventoryServiceProxy - API response:", data);
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
                "Authorization": "Barier " + token

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
