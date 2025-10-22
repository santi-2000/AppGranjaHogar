import { useState } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

/**
 * Custome hook to handle the settings.
 * @module useSettings
 * @description This hook provides functionality for user logout.
 *              It manages loading and error states during the logout process.
 * @returns {Object} An object containing logout function, error state.
 * @returns {Function} logout - Function to handle user logout.
 * @returns {string|null} error - Contains error message if logout fails, otherwise null.
 * 
 * @example
 * const { logout, error } = useSettings();
 * @author Jared Alejandro Marquez Muñoz Grado
 * 
 * @example 
 */

const useSettings = () => {
    const [error, setError] = useState('');
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

    return { logout, error}
}

export default useSettings;