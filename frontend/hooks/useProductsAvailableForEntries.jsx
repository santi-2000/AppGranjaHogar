import { useEffect, useState } from "react";
import { ProductsProxy } from "../proxies/ProductsAvailableProxy.js";

/**
 * Hook para obtener productos activos desde la base de datos,
 * igual que en product outs.
 */
export const useProductsAvailableForEntries = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAvailableProductsForEntries = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await ProductsProxy.getAvailableProductsForEntries();
      
      // Igual que en outs, maneja tanto `result.data` como el array directo
      setData(result.data || result);
    } catch (err) {
      console.error("Error al obtener productos activos:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableProductsForEntries();
  }, []);

  return { data, loading, error, fetchAvailableProductsForEntries };
};