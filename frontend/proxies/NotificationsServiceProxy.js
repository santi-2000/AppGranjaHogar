/**
 * @description Módulo responsable de interactuar con la API para gestionar notificaciones.
 *              Incluye operaciones para obtener, crear y eliminar notificaciones.
 * @module proxies/NotificationsServiceProxy.js
 * @author Silvana Davila Garcia
 */
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
                "Authorization": "Bearer " + token

            },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error desconocido');
        return data.map(item => new NotificationsVO(item));
    }

    async function createNotification(notification) {
        const response = await fetch(API_BASE_URL + '/v1/notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(notification),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error desconocido');
        return data;
    }

    async function deleteNotification(id) {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(
            API_BASE_URL + `/v1/notifications/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token

            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error desconocido');
        return data;
    }

    return { getNotifications, createNotification, deleteNotification };
};

export default NotificationsProxy;

