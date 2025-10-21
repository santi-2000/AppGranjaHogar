import { useState } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const usePostLogout = () => {
    const [error, setError] = useState('');
    const [LogoutData, setLogoutData] = useState({});
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    async function logout() {
        setError('');

        setLoading(true);
        setError(null);
        try {
            await SecureStore.deleteItemAsync('token');
            console.log("Sesión Cerrada")
            router.push('/');
        } catch (err) {
            console.log(err)
            setError(err.message);
        } finally {
            setLoading(false);
        }
        return;
    }

    return { logout, setLogoutData, error}
}

export default usePostLogout;