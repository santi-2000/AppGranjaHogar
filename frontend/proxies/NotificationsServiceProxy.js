import { API_BASE_URL } from '@env';
import { NotificationsVO } from '../valueobjects/NotificationsVO';
import * as SecureStore from 'expo-secure-store';

const NotificationsProxy = () => {
    async function getNotifications() {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(API_BASE_URL + '/v1/notifications', {
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
                throw new Error('Error del servidor');
            } else if (response.status === 503) {
                throw new Error('Servicio no disponible');
            } else {
                throw new Error('Error desconocido');
            }
        }
        const data = await response.json();
        return data.map(item => new NotificationsVO(item));
    }

    async function createNotification(notification) {
        const response = await fetch(API_BASE_URL + '/v1/notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Barier " + token
            },
            body: JSON.stringify(notification),
        });

        if (!response.ok) {
            throw new Error('Error al crear la notificación');
        }
        return await response.json();
    }

    async function deleteNotification(id) {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(
            API_BASE_URL + `/v1/notifications/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Barier " + token

            },
        });
        if (!response.ok) {
            throw new Error('Error al eliminar la notificación');
        }
        return await response.json();
    }

    return { getNotifications, createNotification, deleteNotification };
};

export default NotificationsProxy;

