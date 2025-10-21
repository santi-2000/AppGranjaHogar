import { API_BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

const PermissionsServiceProxy = () => {
    
    async function getAllPermissions() {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(API_BASE_URL + '/v1/permissions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Barier " + token
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

    async function getUserPermissions(userId) {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(API_BASE_URL + `/v1/permissions/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Barier " + token
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

    async function updateUserPermissions(userId, permissionIds) {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(API_BASE_URL + `/v1/permissions/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Barier " + token
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