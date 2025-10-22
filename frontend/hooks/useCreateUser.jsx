import { useState } from 'react';
import NewUsersServiceProxy from '../proxies/NewUsersServiceProxy.js';
import { useRouter } from 'expo-router';
import { CreateUserVO } from '../valueobjects/users/CreateUserVO.jsx';

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

    const [user, setUser] = useState({
        name: '',
        lastName: '',
        username: '',
        password: '',
        permissions: []
    });

    const [errors, setErrors] = useState({});

    const createUser = async (userData) => {
        setLoading(true);
        setError(null);
        let newUser = null;
        try {
            const userVO = new CreateUserVO(userData);

            newUser = await newUsersService.createUser(userVO);
            router.back();

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        return newUser;
    };

    const togglePermission = (key) => {
        const newPermissions = user?.permissions ? [...user.permissions] : [];
        if (newPermissions.includes(key)) {
            const index = newPermissions.indexOf(key);
            newPermissions.splice(index, 1);
        } else {
            newPermissions.push(key);
        }
        setUser(prev => ({ ...prev, permissions: newPermissions }));
    };

    const validate = () => {
        const nextErrors = {};
        if (!user.name.trim()) nextErrors.name = 'Requerido';
        if (!user.lastName.trim()) nextErrors.lastName = 'Requerido';
        if (!user.username.trim()) nextErrors.username = 'Requerido';
        if (user.password.length < 8) nextErrors.password = 'Mínimo 8 caracteres';
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            await createUser(user);
        } catch (err) {
            console.error('Error al crear usuario:', err);
        }
    };


    return { user, setUser, handleSubmit, togglePermission, createUser, loading, errors, error };
};

export default useCreateUser;
