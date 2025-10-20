import { useState } from 'react';
import ProductsServiceProxy from '../proxies/ProductsServiceProxy';


const useDeleteProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const productsService = ProductsServiceProxy();
    
    const deleteProduct = async (productId) => {
        setLoading(true);
        setError(null);
        let deletionResult = null;
        try {
            deletionResult = await productsService.deleteProduct(productId);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        return deletionResult;
    };

    return { deleteProduct, loading, error };
};

export default useDeleteProduct;