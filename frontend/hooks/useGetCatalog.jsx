import { useState } from 'react';
import CatalogProxy from '../proxies/CatalogServiceProxy.js';

const useGetCatalog = () => {
    const [catalog, setCatalog] = useState('');
    const [error, setError] = useState('');
    const { getCatalog } = CatalogProxy();

    async function fetchCatalog() {
        try {
            setError('');
            const catalog = await getCatalog();
            setCatalog(catalog);
        } catch (error) {
            setError(error.message);
            console.log(error.message);
        }
    }

    return { fetchCatalog, catalog, setCatalog, error }
}

export default useGetCatalog;