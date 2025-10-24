import { Alert } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import UsersProxy from '../proxies/UsersServiceProxy';
import { EditUserVO } from '../valueobjects/users/EditUserVO';

/**
 * Custom hook for managing user editing and deletion operations.
 * @module hooks/useEditUser
 * @description This hook provides comprehensive state management for user editing operations including
 *              fetching user data, updating user information, managing permissions, and deleting users.
 *              It handles loading states, error states, and provides functions for all user management
 *              operations in the edit user interface.
 * @returns {Object} An object containing user management functions and state.
 * @returns {Function} handleDeleteConfirm - Function to show delete confirmation dialog.
 * @returns {Function} handleSave - Function to save user changes.
 * @returns {Function} togglePermission - Function to toggle user permissions.
 * @returns {Object} user - Current user data object.
 * @returns {Function} setName - Function to update user name.
 * @returns {Array} permissions - Available permissions array.
 * @returns {boolean} loading - Loading state during operations.
 * @returns {string|null} error - Error message if operation failed.
 * 
 * @author Renata Soto Bravo
 * 
 * @example
 * const { handleDeleteConfirm, handleSave, user, loading } = useEditUser();
 */

const useEditUser = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { putUser, deleteUser, getUserById } = UsersProxy();
    const [user, setUser] = useState({
        id: '',
        name: '',
        lastName: '',
        permissions: []
    });
    
    const [permissions, setPermissions] = useState([
        { label: 'Administrador', value: 'admin' },
        { label: 'Entradas de productos', value: 'products-entries' },
        { label: 'Salidas de productos', value: 'products-outs' },
        { label: 'Generar reportes', value: 'generate-reports' },
        { label: 'Editar catálogo', value: 'edit-catalog' },
        { label: 'Gestionar usuarios', value: 'manage-users' },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await getUserById(id);

                setUser(userRes);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

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

    const handleSave = async () => {
        const userVo = new EditUserVO(user);
        const response = await putUser(id, userVo);
        
        router.back();
    };

    const changeValue = (field, value) => {
        setUser(prev => ({ ...prev, [field]: value }));
    }

    /**
     * @author Renata Soto Bravo
     */

    const handleDeleteConfirm = () => {
        Alert.alert(
            "¿Estás seguro?",
            "Esta acción no se puede deshacer.",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Eliminación cancelada"),
                    style: "cancel"
                },
                {
                    text: "Sí, eliminar",
                    onPress: async () => {
                        await handleDeleteUser(id);
                        router.back();
                    },
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };

    const handleDeleteUser = async (userId) => {
        setLoading(true);
        setError(null);
        let deletionResult = null;
        try {
            deletionResult = await deleteUser(userId);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        return deletionResult;
    };

    return {
        handleDeleteConfirm,
        handleSave,
        togglePermission,
        user,
        changeValue,
        permissions,
        loading,
        error
    };
};

export default useEditUser;
