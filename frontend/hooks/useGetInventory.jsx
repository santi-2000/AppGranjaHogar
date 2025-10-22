import { useState, useEffect, useMemo } from 'react';
import { getInventory, getProductQuantity } from '../proxies/InventoryServiceProxy';
import { ProductInventoryVO, ProductQuantityVO } from '../valueobjects/products/ProductVO';
import { removeAccents } from '../utils/textUtil';

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
    const [searchTerm, setSearchTerm] = useState('');

    const filteredInventory = useMemo(() => {
        if (!searchTerm.trim()) return inventory;

        return inventory.filter(item =>
            removeAccents(item.name.toLowerCase()).includes(searchTerm.toLowerCase())
        );
    }, [inventory, searchTerm]);


    const fetchInventory = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getInventory();
            const inventoryItems = data.map(item => new ProductInventoryVO(item));

            console.log('Fetched inventory items:', inventoryItems);

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
        searchTerm,
        setSearchTerm,
        filteredInventory,
        fetchInventory,
        fetchProductQuantity,
        refetch: fetchInventory,
    };
};
