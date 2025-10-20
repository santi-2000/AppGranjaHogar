import { useEffect, useState } from "react";
import { UnitsProxy } from "../proxies/UnitsProxy.js";

export const useUnits = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchUnits = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await UnitsProxy.getAll();
      setData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createUnits = async (payload) => {
    try {
      setLoading(true);
      setError(null);
      const result = await UnitsProxy.create(payload);
      await fetchUnits();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  return {
    data,
    loading,
    error,
    fetchUnits,
    createUnits,
  };
};
