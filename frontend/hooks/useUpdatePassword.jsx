import { useState } from 'react';
import UsersServiceProxy from '../proxies/UsersServiceProxy';
import { PasswordUpdate } from '../valueobjects/users/UpdatePasswordVO';

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
