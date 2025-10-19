import { useState } from 'react';
import LoginProxy from '../proxies/UsersServiceProxy.js';
import { LoginVO } from '../valueobjects/users/LoginVO.jsx';
import { useRouter } from 'expo-router';

const usePostLogin = () => {
    const [error, setError] = useState('');
    const [loginData, setLoginData] = useState({});
    const [loading, setLoading] = useState(false);
    const { postLogin } = LoginProxy();

    const router = useRouter();

    async function login() {
        setError('');

        setLoading(true);
        setError(null);
        try {
            
            console.log("Sesión Iniciada")
            router.push('/home');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        return;
    }

    const handleChange = (key, value) => {
    setLoginData(prev => ({ ...prev, [key]: value }));
  };

    return { login, setLoginData, loginData, error, handleChange }
}

export default usePostLogin;