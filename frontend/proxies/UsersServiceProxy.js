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
    async function postLogin(LoginVO) {
        console.log(API_BASE_URL)
        const response = await fetch(API_BASE_URL + '/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(LoginVO),
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

    async function postVerify(token) {
        const response = await fetch(API_BASE_URL + '/v1/users/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
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

        if (!response.ok) {
            if (response.status === 400) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Request invalido');
            } else if (response.status === 401) {
                throw new Error('No autorizado');
            } else if (response.status === 500) {
                throw new Error('Error interno del servidor');
            } else {
                throw new Error('Error desconocido');
            }
        }

        const data = await response.json();
        return data.users;
    }

    async function getUserById(userId) {
        const token = await SecureStore.getItemAsync('token');
        const response = await fetch(`${API_BASE_URL}/v1/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            }
        });
        if (!response.ok) {
            if (response.status === 400) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Request invalido');
            } else if (response.status === 401) {
                throw new Error('No autorizado');
            } else if (response.status === 404) {
                throw new Error('Usuario no encontrado');
            } else if (response.status === 500) {
                throw new Error('Error interno del servidor');
            } else {
                throw new Error('Error desconocido');
            }
        }
        const data = await response.json();
        return data.user;
    }

    /**
     * @author Renata Soto Bravo
     */
    async function deleteUser(userId) {
        const token = await SecureStore.getItemAsync('token');
        const response = await fetch(`${API_BASE_URL}/v1/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
        });

        if (!response.ok) {
            if (response.status === 400) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Request invalido');
            } else if (response.status === 404) {
                throw new Error('Usuario no encontrado');
            } else if (response.status === 500) {
                throw new Error('Error interno del servidor');
            } else if (response.status === 503) {
                throw new Error('Servicio no disponible');
            } else {
                throw new Error('Error desconocido');
            }
        }

        const data = await response.json();
        return data.ok;
    }

    async function putUser(userId, EditUserVO) {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(`${API_BASE_URL}/v1/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            credentials: 'include',
            body: JSON.stringify(EditUserVO)
        });

        if (!response.ok) {
            if (response.status === 400) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Datos inválidos');
            } else if (response.status === 401) {
                throw new Error('No autorizado');
            } else if (response.status === 500) {
                throw new Error('Error interno del servidor');
            } else {
                throw new Error('Error desconocido');
            }
        }

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

        if (!response.ok) {
            if (response.status === 400) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Datos inválidos');
            } else if (response.status === 401) {
                throw new Error('No autorizado');
            } else if (response.status === 500) {
                throw new Error('Error interno del servidor');
            } else {
                throw new Error('Error desconocido');
            }
        }

        const data = await response.json();
        return data;
    }

    return { postLogin, postVerify, getUsers, getUserById, deleteUser, putUpdatePassword, putUser };
};

export default UsersServiceProxy;