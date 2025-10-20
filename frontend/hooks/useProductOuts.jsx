import { useState } from "react";
import { ProductOutsProxy } from "../proxies/productOuts.proxy";

export const useProductOuts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const createProductOut = async (payload) => {
    try {
      setLoading(true);
      setError(null);
      const result = await ProductOutsProxy.create(payload);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    createProductOut,
  };
};
