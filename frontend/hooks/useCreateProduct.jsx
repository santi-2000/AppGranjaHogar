

import { useState } from 'react';
import ProductsServiceProxy from '../proxies/ProductsServiceProxy';
import { ProductVO } from '../valueobjects/products/ProductVO';
import { useRouter } from 'expo-router';

/**
 * Custom hook to create a new product.
 * @module hooks/useCreateProduct
 * @description This hook provides functionality to create a new product using the ProductsServiceProxy.
 *              It manages loading and error states during the creation process.
 * @returns {Object} An object containing the createProduct function, loading state, and error state.
 * @returns {Function} createProduct - Function to create a new product.
 * @returns {boolean} loading - Indicates if the product creation is in progress.
 * @returns {string|null} error - Contains error message if product creation fails, otherwise null.
 * 
 * @author Carlos Alejandro Ortiz Caro
 * 
 * @example
 * const { createProduct, loading, error } = useCreateProduct();    
 */
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