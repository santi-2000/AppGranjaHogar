import { API_BASE_URL } from '@env';
import { CatalogVO } from '../valueobjects/products/CatalogVO';
import * as SecureStore from 'expo-secure-store';

/**
 * Fetches the product catalog from the backend API.
 * @module proxies/CatalogServiceProxy
 * 
 * @description This function sends a GET request to the backend to retrieve the catalog data. It includes an authentication token 
 * in the request headers and processes the response into a list of `CatalogVO` objects.
 * 
 * @async
 * @function getCatalog
 * @returns {Promise<CatalogVO[]>} A promise that resolves to an array of `CatalogVO` instances, representing the catalog items.
 * @throws {Error} Throws an error if the response status is not OK or if the data is invalid.
 * 
 * @author Yahir Alfredo Tapia Sifuentes
 * 
 * @example
 * const catalog = await getCatalog();
 * // catalog will be an array of CatalogVO objects
 */

const CatalogProxy = () => {
    async function getCatalog() {
        const token = await SecureStore.getItemAsync('token');
        const response = await fetch(API_BASE_URL + '/v1/products/catalog', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
        });

        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('Datos de entrada inválidos');
            } else if (response.status === 500) {
                throw new Error('Error al convertir');
            } else if (response.status === 503) {
                throw new Error('Servicio no disponible');
            } else {
                throw new Error('Error desconocido');
            }
        }

        const data = await response.json();

        return data.map(item => new CatalogVO(item));
    }

    return { getCatalog };
};

export default CatalogProxy;