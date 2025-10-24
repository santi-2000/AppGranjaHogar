import { API_BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

/**
 * Users Service Proxy
 * @module UsersServiceProxy
 * @description This module provides a proxy for interacting with the user-related endpoints of the API.
 *              It handles HTTP requests for user login, token verification, user deletion, and password updates.
 *              It also manages error handling for different HTTP response statuses.
 * 
 * @author Jared Alejandro Marquez Muñoz Grado
 * @author Yahir Alfredo Tapia Sifuentes
 * @author Roberto Santiago Estrada Orozco
 * @author Renata Soto Bravo
 * 
 * @example
 * import UsersServiceProxy from '../proxies/UsersServiceProxy.js';
 * 
 * const { postLogin, postVerify, deleteUser, putUpdatePassword } = UsersServiceProxy();
 * const token = await postLogin({ username: 'john.doe', password: 'password123' });
 */

const UsersServiceProxy = () => {
    /**
     * @author Jared Alejandro Marquez Muñoz Grado
     */
    async function postLogin(LoginVO) {
        const response = await fetch(API_BASE_URL + '/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(LoginVO),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Error desconocido');

        return data;
    }

    async function postVerify(token) {
        const response = await fetch(API_BASE_URL + '/v1/users/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) throw new Error(data.message || 'Error desconocido');

        const data = await response.json();

        return data;
    }

    /**
     * @author Yahir Alfredo Tapia Sifuentes
     */
    async function getUsers() {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(`${API_BASE_URL}/v1/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) throw new Error(data.message || 'Error desconocido');

        const data = await response.json();
        return data.users;
    }

    async function getUserById(userId) {
        const token = await SecureStore.getItemAsync('token');
        const response = await fetch(`${API_BASE_URL}/v1/users/get/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            }
        });
        
        if (!response.ok) throw new Error(data.message || 'Error desconocido');

        const data = await response.json();
        return data.user;
    }

    /**
     * @author Renata Soto Bravo
     */
    async function deleteUser(userId) {
        const token = await SecureStore.getItemAsync('token');
        const response = await fetch(`${API_BASE_URL}/v1/users/delete/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
        });

        if (!response.ok) throw new Error(data.message || 'Error desconocido');

        const data = await response.json();
        return data.ok;
    }

    async function putUser(userId, EditUserVO) {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(`${API_BASE_URL}/v1/users/edit/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            credentials: 'include',
            body: JSON.stringify(EditUserVO)
        });

        if (!response.ok) throw new Error(data.message || 'Error desconocido');

        const data = await response.json();
        return data;
    }
/**
 * 
 * @author Roberto Santiago Estrada Orozco
 */
    async function putUpdatePassword(PasswordUpdateVO) {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(API_BASE_URL + '/v1/users/update-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            credentials: 'include',
            body: JSON.stringify(PasswordUpdateVO)
        });

        if (!response.ok) throw new Error(data.message || 'Error desconocido');

        const data = await response.json();
        return data;
    }

    return { postLogin, postVerify, getUsers, getUserById, deleteUser, putUpdatePassword, putUser };
};

export default UsersServiceProxy;