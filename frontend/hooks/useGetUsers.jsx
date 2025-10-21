import { useState } from 'react';
import UsersProxy from '../proxies/UsersServiceProxy.js';
import { ReportVO } from '../valueobjects/reports/ReportVO.jsx';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';

/**
 * Custom hook for selecting dates and fetching reports in PDF or XLSX formats.
 * @module hooks/useGetUsers
 * @description This hook manages the selection of user dates and types, handles errors, and fetches the appropriate user files using the `UsersProxy`.
 * It also allows users to share the downloaded user files via the device's sharing functionality.
 *
 * @returns {Object} An object containing:
 * - `fetchUsers`: Function to fetch users.
 * - `error`: State variable for error messages.
 * 
 * @author Yahir Alfredo Tapia Sifuentes
 * 
 * @example
 * const {  fetchUsers, error } = useGetUsers();
 */
const useGetUsers = () => {
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const { getUsers } = UsersProxy();

    async function fetchUsers() {
        try {
            const users = await getUsers();
            setUsers(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError(error.message);
        }
    }

    return { users, fetchUsers, error }
    
}

export default useGetUsers;