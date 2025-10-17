import { useState } from 'react';
import CatalogProxy from '../proxies/CatalogServiceProxy.js';

const useGetCatalog = () => {
    const [catalog, setCatalog] = useState('');
    const [error, setError] = useState('');
    const { getCatalog } = CatalogProxy();

    function fetchCatalog() {
        setError('');

        getCatalog()
            .then(catalog => {
                setCatalog(catalog);
            })
            .catch(error => {
                setError(error.message);
                console.log(error.message);
            });
    }

    return { fetchCatalog, catalog, setCatalog, error }
}

export default useGetCatalog;