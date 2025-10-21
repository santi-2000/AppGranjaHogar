import { useState } from 'react';
import PermissionsServiceProxy from '../proxies/PermissionsServiceProxy';
import { PermissionVO, UserPermissionVO } from '../valueobjects/permissions/PermissionVO';

/**
 * Custom hook for managing permissions data and operations.
 * @module hooks/usePermissions
 * @description This hook provides a comprehensive way to manage permissions in the application.
 * It handles fetching all available permissions, retrieving user-specific permissions, and updating user permissions.
 * The hook maintains loading states and error handling for all operations.
 * 
 * @returns {Object} An object containing:
 * - `fetchAllPermissions`: A function that fetches all available permissions from the backend.
 * - `fetchUserPermissions`: A function that fetches permissions for a specific user.
 * - `updatePermissions`: A function that updates permissions for a specific user.
 * - `loading`: A boolean indicating if any permission operation is currently in progress.
 * - `error`: Any error message if an error occurred during the last operation.
 * 
 * @author Yahir Alfredo Tapia Sifuentes
 * 
 * @example
 * const { fetchAllPermissions, fetchUserPermissions, updatePermissions, loading, error } = usePermissions();
 * 
 * // Fetch all permissions
 * const allPermissions = await fetchAllPermissions();
 * 
 * // Fetch user permissions
 * const userPermissions = await fetchUserPermissions(userId);
 * 
 * // Update user permissions
 * await updatePermissions(userId, [1, 2, 3]);
 */
const usePermissions = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { getAllPermissions, getUserPermissions, updateUserPermissions } = PermissionsServiceProxy();

    /**
     * Fetches all available permissions from the backend.
     * @async
     * @function fetchAllPermissions
     * @returns {Promise<PermissionVO[]>} A promise that resolves to an array of PermissionVO objects.
     * @throws {Error} Throws an error if the API request fails.
     */
    async function fetchAllPermissions() {
        setLoading(true);
        setError('');
        
        try {
            const data = await getAllPermissions();
            const permissions = data.map(item => new PermissionVO(item));
            return permissions;
        } catch (err) {
            console.log(err.message);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    /**
     * Fetches permissions for a specific user from the backend.
     * @async
     * @function fetchUserPermissions
     * @param {string|number} userId - The ID of the user whose permissions to fetch.
     * @returns {Promise<UserPermissionVO>} A promise that resolves to a UserPermissionVO object.
     * @throws {Error} Throws an error if the API request fails.
     */
    async function fetchUserPermissions(userId) {
        setLoading(true);
        setError('');
        
        try {
            const data = await getUserPermissions(userId);
            const userPermissions = new UserPermissionVO(data);
            return userPermissions;
        } catch (err) {
            console.log(err.message);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    /**
     * Updates permissions for a specific user.
     * @async
     * @function updatePermissions
     * @param {string|number} userId - The ID of the user whose permissions to update.
     * @param {Array<number>} permissionIds - An array of permission IDs to assign to the user.
     * @returns {Promise<Object>} A promise that resolves to the API response object.
     * @throws {Error} Throws an error if the API request fails.
     */
    async function updatePermissions(userId, permissionIds) {
        setLoading(true);
        setError('');
        
        try {
            const result = await updateUserPermissions(userId, permissionIds);
            return result;
        } catch (err) {
            console.log(err.message);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return {
        fetchAllPermissions,
        fetchUserPermissions,
        updatePermissions,
        loading,
        error
    };
};

export default usePermissions;