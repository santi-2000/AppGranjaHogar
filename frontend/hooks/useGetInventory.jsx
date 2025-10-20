import { useState, useEffect } from 'react';
import { getInventory, getProductQuantity } from '../proxies/InventoryServiceProxy';
import { ProductInventoryVO, ProductQuantityVO } from '../valueobjects/products/ProductVO';

export const useInventory = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchInventory = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const data = await getInventory();
            console.log("useInventory - raw data from API:", data);
            const inventoryItems = data.map(item => new ProductInventoryVO(item));
            console.log("useInventory - processed inventory items:", inventoryItems);
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
        refetch: fetchInventory
    };
};
