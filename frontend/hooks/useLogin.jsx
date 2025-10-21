import { useState } from 'react';
import LoginProxy from '../proxies/UsersServiceProxy.js';
import { LoginVO } from '../valueobjects/users/LoginVO.jsx';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

/**
 * Custom hook to manage user login and session verification.
 * @module hooks/useLogin
 * @description This hook provides functionality for user login and session verification.
 *              It manages loading and error states during the authentication process.
 * @returns {Object} An object containing login function, login data, error state, and handleChange function.
 * @returns {Function} login - Function to handle user login.
 * @returns {Function} setLoginData - Function to set login form data.
 * @returns {Object} loginData - State object holding the login form data.
 * @returns {string|null} error - Contains error message if login fails, otherwise null.
 * @returns {Function} handleChange - Function to handle changes in login form inputs.
 * @returns {Function} verify - Function to verify user session.
 * 
 * @example
 * const { login, loginData, error, handleChange, verify } = useLogin();
 * @author Jared Alejandro Marquez Muñoz Grado
 * 
 * @example 
 * 
 * 
 */

const usePostLogin = () => {
    const [error, setError] = useState('');
    const [loginData, setLoginData] = useState({});
    const [loading, setLoading] = useState(false);
    const { postLogin, postVerify } = LoginProxy();

    const router = useRouter();

    async function login() {
        setError('');

        setLoading(true);
        setError(null);
        try {
            const loginVO = new LoginVO(loginData);
            console.log(loginVO)
            const response = await postLogin(loginVO);
            console.log(response)
            await SecureStore.setItemAsync('token', response.token);

            console.log("Sesión Iniciada")
            router.push('/home');
        } catch (err) {
            console.log(err)
            setError(err.message);
        } finally {
            setLoading(false);
        }
        return;
    }

    async function verify() {
        setError('');

        setLoading(true);
        setError(null);
        try {
            const token = await SecureStore.getItemAsync('token');
            const response = await postVerify(token);
            if (response)  router.push('/home');
            else router.push('/login');
        } catch (err) {
            console.log(err)
            setError(err.message);
        } finally {
            setLoading(false);
        }
        return;
    }

    const handleChange = (key, value) => {
    setLoginData(prev => ({ ...prev, [key]: value }));
  };

    return { login, setLoginData, loginData, error, handleChange, verify}
}

export default usePostLogin;