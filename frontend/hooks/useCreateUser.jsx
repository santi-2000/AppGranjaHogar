import { useState } from 'react';
import NewUsersServiceProxy from '../proxies/NewUsersServiceProxy.js';
import { EditUserVO } from '../valueobjects/users/EditUserVO.jsx';
import { useRouter } from 'expo-router';

/**
 * Custom hook to create a new user.
 * @module hooks/useCreateUser
 * @description This hook provides functionality to create a new user using the NewUsersServiceProxy.
 *              It manages loading and error states during the creation process.
 * @returns {Object} An object containing the createUser function, loading state, and error state.
 * @returns {Function} createUser - Function to create a new user.
 * @returns {boolean} loading - Indicates if the user creation is in progress.
 * @returns {string|null} error - Contains error message if user creation fails, otherwise null.
 * 
 * @author Renata Loaiza
 * 
 * @example
 * const { createUser, loading, error } = useCreateUser();    
 */
const useCreateUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const newUsersService = NewUsersServiceProxy();
    const router = useRouter();

    const createUser = async (userData) => {
        setLoading(true);
        setError(null);
        let newUser = null;
        try {
            console.log("useCreateUser - creating user with data:", userData);
            const userVO = new EditUserVO(userData);
            newUser = await newUsersService.createUser(userVO);
            router.back();

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        return newUser;
    };

    return { createUser, loading, error };
};

export default useCreateUser;
