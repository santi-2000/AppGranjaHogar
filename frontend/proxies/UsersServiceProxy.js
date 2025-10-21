import { API_BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

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
    async function deleteUser(userId) {
        const response = await fetch(`${API_BASE_URL}/v1/users/${userId}`, {
            method: 'DELETE',
            credentials: 'include',
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

    async function putUpdatePassword(PasswordUpdateVO) {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(API_BASE_URL + '/v1/users/update-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Barier " + token
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

    return { postLogin, postVerify, deleteUser, putUpdatePassword };
};

export default UsersServiceProxy;