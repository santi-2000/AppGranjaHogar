import { API_BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

/**
 * Service proxy for handling permissions-related API operations.
 * @module proxies/PermissionsServiceProxy
 * @description This function sends a GET request to the backend API to fetch all available permissions. 
 * It also sends GET requests to fetch permissions for a specific user and update permissions for a specific user.
 * 
 * @returns {Object} An object containing:
 * - `getAllPermissions`: A function that fetches all available permissions.
 * - `getUserPermissions`: A function that fetches permissions for a specific user.
 * - `updateUserPermissions`: A function that updates permissions for a specific user.
 * 
 * @author Amada Leticia García Cázares
 * 
 */

const PermissionsServiceProxy = () => {
    
    /**
     * Fetches all available permissions from the backend API.
     * @async
     * @function getAllPermissions
     * @returns {Promise<Array>} A promise that resolves to an array of permission objects.
     * @throws {Error} Throws specific error messages based on HTTP status codes:
     * - 400: 'Datos de entrada inválidos'
     * - 500: 'Error al convertir'
     * - 503: 'Servicio no disponible'
     * - Other: 'Error desconocido'
     */

    async function getAllPermissions() {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(API_BASE_URL + '/v1/permissions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
        });

        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('Datos de entrada inválidos');
            } else if (response.status === 500) {
                throw new Error('Error al convertir');
            } else if (response.status === 503) {
                throw new Error('Servicio no disponible');
            } else {
                throw new Error('Error desconocido');
            }
        }

        const data = await response.json();
        return data;
    }

    /**
     * Fetches permissions for a specific user from the backend API.
     * @async
     * @function getUserPermissions
     * @param {string|number} userId - The ID of the user whose permissions to fetch.
     * @returns {Promise<Object>} A promise that resolves to the user's permission data.
     * @throws {Error} Throws specific error messages based on HTTP status codes:
     * - 400: 'Datos de entrada inválidos'
     * - 500: 'Error al convertir'
     * - 503: 'Servicio no disponible'
     * - Other: 'Error desconocido'
     */

    async function getUserPermissions(userId) {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(API_BASE_URL + `/v1/permissions/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
        });

        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('Datos de entrada inválidos');
            } else if (response.status === 500) {
                throw new Error('Error al convertir');
            } else if (response.status === 503) {
                throw new Error('Servicio no disponible');
            } else {
                throw new Error('Error desconocido');
            }
        }

        const data = await response.json();
        return data;
    }

    /**
     * Updates permissions for a specific user via the backend API.
     * @async
     * @function updateUserPermissions
     * @param {string|number} userId - The ID of the user whose permissions to update.
     * @param {Array<number>} permissionIds - An array of permission IDs to assign to the user.
     * @returns {Promise<Object>} A promise that resolves to the API response object.
     * @throws {Error} Throws specific error messages based on HTTP status codes:
     * - 400: 'Datos de entrada inválidos'
     * - 500: 'Error al convertir'
     * - 503: 'Servicio no disponible'
     * - Other: 'Error desconocido'
     */
    
    async function updateUserPermissions(userId, permissionIds) {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(API_BASE_URL + `/v1/permissions/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                'permission-ids': permissionIds
            }),
        });

        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('Datos de entrada inválidos');
            } else if (response.status === 500) {
                throw new Error('Error al convertir');
            } else if (response.status === 503) {
                throw new Error('Servicio no disponible');
            } else {
                throw new Error('Error desconocido');
            }
        }

        const data = await response.json();
        return data;
    }

    return { 
        getAllPermissions, 
        getUserPermissions, 
        updateUserPermissions 
    };
};

export default PermissionsServiceProxy;