/**
 * Custom hook to handle product deletion.
 * @module useDeleteProduct
 * @description This hook provides functionality to delete a product,
 *              managing loading and error states during the process.
 * @returns {Object} An object containing the deleteProduct function, loading state, and error state.
 * @returns {Function} deleteProduct - Function to delete a product by its ID.
 * @returns {boolean} loading - Indicates if the deletion process is in progress.
 * @returns {string|null} error - Contains error message if deletion fails, otherwise null.
 * 
 * @author Carlos Alejandro Ortiz Caro
 * 
 * @example
 * const { deleteProduct, loading, error } = useDeleteProduct();    
 */

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