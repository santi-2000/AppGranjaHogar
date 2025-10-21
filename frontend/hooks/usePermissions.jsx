import { useState } from 'react';
import PermissionsServiceProxy from '../proxies/PermissionsServiceProxy';
import { PermissionVO, UserPermissionVO } from '../valueobjects/permissions/PermissionVO';

const usePermissions = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { getAllPermissions, getUserPermissions, updateUserPermissions } = PermissionsServiceProxy();

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