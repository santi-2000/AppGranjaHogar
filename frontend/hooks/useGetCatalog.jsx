import { useEffect, useState } from 'react';
import CatalogProxy from '../proxies/CatalogServiceProxy.js';

/**
 * Custom hook for fetching catalog data.
 * @module hooks/useGetCatalog
 * @description This hook provides a way to fetch catalog data from the backend using the `CatalogProxy`.
 * It maintains state for the fetched catalog and any errors that occur during the fetching process.
 * 
 * @returns {Object} An object containing:
 * - `fetchCatalog`: A function that triggers the fetching of catalog data.
 * - `catalog`: The catalog data that has been fetched.
 * - `setCatalog`: A function to update the `catalog` state manually.
 * - `error`: Any error message if an error occurred during fetching.
 * 
 * @author Yahir Alfredo Tapia Sifuentes
 * 
 * @example
 * const { fetchCatalog, catalog, error } = useGetCatalog();
 */

const useGetCatalog = () => {
    const [catalog, setCatalog] = useState('');
    const [error, setError] = useState('');
    const { getCatalog } = CatalogProxy();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchCatalog();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

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