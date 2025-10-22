import { useEffect, useState } from "react";
import { ProductsProxy } from "../proxies/ProductsAvailableProxy.js";

export const useProductsAvailableForEntries = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAvailableProductsForentries = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await ProductsProxy.getAvailableProductsForEntries();
      setData(result.data || result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableProductsForentries();
  }, []);

  return { data, loading, error, fetchAvailableProductsForentries };
};
