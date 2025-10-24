import { useEffect, useState } from 'react';
import { ProductVO } from '../valueobjects/products/ProductVO.jsx';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import ProductsServiceProxy from '../proxies/ProductsServiceProxy.js';

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
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const {getProduct, editProduct} = ProductsServiceProxy();

    const [productData, setProductData] = useState({
        name: '',
        perishable: false,
        category_id: null,
        unit_id: null,
        min_stock: 0,
        max_stock: 0,
        actual_stock: 0,
        is_active: true,
    });

    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        const loadProductData = async () => {
            try {
                const product = await getProduct(id);

                setProductData({
                    name: product.name || '',
                    perishable: Boolean(product.perishable),
                    category_id: product.category_id || null,
                    unit_id: product.unit_id || null,
                    min_stock: product.min_stock || 0,
                    max_stock: product.max_stock || 0,
                    actual_stock: product.actual_stock || 0,
                    is_active: true,
                });
            } catch (err) {
                console.error('Error al cargar el catálogo:', err);
            } finally {
                setInitialLoading(false);
            }
        };

        loadProductData();
    }, []);


    const handleChange = (key, value) => {
        setProductData(prev => ({ ...prev, [key]: value }));
    };

    const handleEdit = async () => {
        try {
            const productVO = new ProductVO(productData);
            const editedProduct = await editProduct(id, productVO);
            if (editedProduct) {
                router.back();
            }
        } catch (err) {
            console.error("Error al editar el producto:", err);
        }
    };

    return { productData, handleChange, initialLoading, handleEdit, editProduct, loading, error };
};

export default useEditProduct;
