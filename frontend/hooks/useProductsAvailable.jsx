import { useEffect, useState } from "react";
import { ProductsProxy } from "../proxies/ProductsAvailableProxy.js";

export const useProductsAvailable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAvailableProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await ProductsProxy.getAvailableProducts();
      console.log(result)
      setData(result.data || result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableProducts();
  }, []);

  return { data, loading, error, fetchAvailableProducts };
};
