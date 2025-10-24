/**
 * @module hooks/useNotifications.jsx
 * 
 * @description Este hook proporciona la lógica y el manejo de estado necesarios para obtener y almacenar 
 * las notificaciones del usuario. Se comunica con el backend a través de `NotificationsProxy` para 
 * recuperar los datos y gestiona tanto los estados de éxito como los de 
 *
 * @author Silvana Davila Garcia
 */
import { useEffect, useState } from 'react';
import NotificationsProxy from '../proxies/NotificationsServiceProxy';

const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState('');
    const { getNotifications } = NotificationsProxy();

    useEffect(() => {
        fetchNotifications();
    }, []);

    async function fetchNotifications() {
        setError('');
        try {
            const data = await getNotifications();
            
            setNotifications(data);
        } catch (err) {
            console.error('Error fetching notifications:', err);
            setError(err.message);
        }
    }
    return { fetchNotifications, notifications, setNotifications, error };
}
export default useNotifications;
