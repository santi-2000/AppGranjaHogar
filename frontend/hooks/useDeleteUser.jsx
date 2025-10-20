import { useState } from 'react';
import UsersServiceProxy from '../proxies/UsersServiceProxy';

const useDeleteUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const usersService = UsersServiceProxy();
    
    const deleteUser = async (userId) => {
        setLoading(true);
        setError(null);
        let deletionResult = null;
        try {
            deletionResult = await usersService.deleteUser(userId);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        return deletionResult;
    };

    return { deleteUser, loading, error };
};

export default useDeleteUser;
