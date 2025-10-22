import { useState, useEffect } from 'react';
import { getInventory, getProductQuantity } from '../proxies/InventoryServiceProxy';
import { ProductInventoryVO, ProductQuantityVO } from '../valueobjects/products/ProductVO';

/**
 * @class useInventory
 * @description Custom React hook to manage product inventory data.
 * @module hooks/useInventory
 * @returns {Object} An object containing inventory data, loading state, error state, and utility functions.
 * @author Roberto Santiago Estrada Orozco
 * @example
 * import { useInventory } from '../hooks/useInventory';
 * const { inventory, loading, error, fetchInventory } = useInventory();
 */

export const useInventory = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getProductEmoji = (name) => {
        const emojiMap = {
            'Manzana': '🍎',
            'Leche': '🥛',
            'Yogurt': '🥛',
            'Lentejas': '🫘',
            'default': '📦'
        };
        return emojiMap[name] || emojiMap['default'];
    };

    const formatQuantity = (quantity, unit) => {
        const unitMap = {
            1: 'piezas',
            2: 'piezas',
            3: 'litros'
        };
        return `${quantity} ${unitMap[unit] || 'unidades'}`;
    };

    const fetchInventory = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getInventory();
            const inventoryItems = data.map(item => new ProductInventoryVO(item));

            setInventory(inventoryItems);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching inventory:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchProductQuantity = async (productId) => {
        try {
            const data = await getProductQuantity(productId);
            return new ProductQuantityVO(data);
        } catch (err) {
            console.error('Error fetching product quantity:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    return {
        inventory,
        loading,
        error,
        fetchInventory,
        fetchProductQuantity,
        refetch: fetchInventory,
        getProductEmoji,
        formatQuantity
    };
};
