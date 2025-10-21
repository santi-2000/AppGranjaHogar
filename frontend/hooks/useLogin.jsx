import { useState } from 'react';
import LoginProxy from '../proxies/UsersServiceProxy.js';
import { LoginVO } from '../valueobjects/users/LoginVO.jsx';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

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