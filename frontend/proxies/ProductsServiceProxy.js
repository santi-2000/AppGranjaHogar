import { ProductVO } from '../valueobjects/products/ProductVO';
import { API_BASE_URL } from '@env';

const ProductsServiceProxy = () => {

    const createProduct = async (productVO) => {
        const response = await fetch(`${API_BASE_URL}/v1/products/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productVO),
        });

        if (!response.ok) {
            if (response.status === 400) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Request invalido');
            } else if (response.status === 500) {
                throw new Error('Error interno del servidor');
            } else if (response.status === 503) {
                throw new Error('Servicio no disponible');
            } else {
                throw new Error('Error desconocido');
            }
        }

        const data = await response.json();
        return new ProductVO(data);
    }
    return {
        createProduct,
    }
}

export default ProductsServiceProxy;