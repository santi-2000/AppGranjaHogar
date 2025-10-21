import { useState } from 'react';
import ProductEditProxy from '../proxies/ProductEditProxy.js';
import { ProductVO } from '../valueobjects/products/ProductVO.jsx';
import { useRouter } from 'expo-router';

/**
 * Custom hook to edit an existing product.
 * @module hooks/useEditProduct
 * @description This hook provides functionality to edit an existing product using the ProductEditProxy.
 *              It manages loading and error states during the edit process.
 * @returns {Object} An object containing the editProduct function, loading state, and error state.
 * @returns {Function} editProduct - Function to edit a product.
 * @returns {boolean} loading - Indicates if the product edit is in progress.
 * @returns {string|null} error - Contains error message if product edit fails, otherwise null.
 * 
 * @author Renata Loaiza
 * 
 * @example
 * const { editProduct, loading, error } = useEditProduct();    
 */
const useEditProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const productEditService = ProductEditProxy();
    const router = useRouter();

    const editProduct = async (productId, productData) => {
        setLoading(true);
        setError(null);
        let editedProduct = null;
        try {
            console.log("useEditProduct - editing product with data:", productData);
            const productVO = new ProductVO(productData);
            editedProduct = await productEditService.editProduct(productId, productVO);
            router.back();

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        return editedProduct;
    };

    return { editProduct, loading, error };
};

export default useEditProduct;
