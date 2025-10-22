import { API_BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

/**
 * New Users Service Proxy
 * @module NewUsersServiceProxy
 * @description This module provides a proxy for creating new users through the API.
 *              It handles HTTP requests for user creation and manages error handling
 *              for different HTTP response statuses.
 * 
 * @author Renata Loaiza
 * 
 * @example
 * import NewUsersServiceProxy from '../proxies/NewUsersServiceProxy.js';
 * 
 * const { createUser } = NewUsersServiceProxy();
 * const newUser = await createUser(userVO);
 */
const NewUsersServiceProxy = () => {
    /**
     * Creates a new user
     * @param {EditUserVO} userVO - The user data to create
     * @returns {Promise<Object>} The created user data
     * @throws {Error} If the request fails
     */
    async function createUser(userVO) {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(`${API_BASE_URL}/v1/users/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(userVO)
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error desconocido');

        return data.user;
    }

    return { createUser };
};

export default NewUsersServiceProxy;
