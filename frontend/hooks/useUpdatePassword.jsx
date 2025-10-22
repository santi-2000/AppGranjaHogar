import { useState } from 'react';
import UsersServiceProxy from '../proxies/UsersServiceProxy';
import { PasswordUpdate } from '../valueobjects/users/UpdatePasswordVO';

/**
 * @class useUpdatePassword
 * @description Custom React hook to handle user password updates.
 * @module hooks/useUpdatePassword
 * @author Roberto Santiago Estrada Orozco
 * @example
 * import { useUpdatePassword } from '../hooks/useUpdatePassword';
 * const { updatePassword, loading, error, success, resetState } = useUpdatePassword();
 * @returns {Object} - An object containing the updatePassword function, loading state, 
 * error state, success state, and resetState function.
 */
const useUpdatePassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const usersService = UsersServiceProxy();

    const updatePassword = async (passwordData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        
        try {
            const passwordUpdateVO = new PasswordUpdate(passwordData);
            const result = await usersService.putUpdatePassword(passwordUpdateVO);
            setSuccess(true);
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const resetState = () => {
        setError(null);
        setSuccess(false);
    };

    return { 
        updatePassword, 
        loading, 
        error, 
        success, 
        resetState 
    };
};

export default useUpdatePassword;
