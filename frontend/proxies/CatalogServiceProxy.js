import { API_BASE_URL } from '@env';
import { CatalogVO } from '../valueobjects/CatalogVO';

const CatalogProxy = () => {
    async function getCatalog() {
        const response = await fetch(API_BASE_URL + '/v1/products/catalog', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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