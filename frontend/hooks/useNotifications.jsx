import { useState } from 'react';
import NotificationsProxy from '../proxies/NotificationsProxy';

const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState('');
    const { getNotifications } = NotificationsProxy();

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