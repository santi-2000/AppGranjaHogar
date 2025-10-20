import { useState } from 'react';
import ProductsServiceProxy from '../proxies/ProductsServiceProxy';
import { ProductVO } from '../valueobjects/products/ProductVO';
import { useRouter } from 'expo-router';

const useCreateProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const productsService = ProductsServiceProxy();
    const router = useRouter();

    const createProduct = async (productData) => {
        setLoading(true);
        setError(null);
        let newProduct = null;
        try {
            console.log("useCreateProduct - creating product with data:", productData);
            const productVO = new ProductVO(productData);
            newProduct = await productsService.createProduct(productVO);
            router.back();

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        return newProduct;
    };

    return { createProduct, loading, error };
};

export default useCreateProduct;