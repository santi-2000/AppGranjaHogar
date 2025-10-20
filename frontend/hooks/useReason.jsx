import { useEffect, useState } from "react";
import { ReasonProxy } from "../proxies/ReasonProxy.js";

export const useReasons = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchReasons = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await ReasonProxy.getAll();
      setData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createReasons = async (payload) => {
    try {
      setLoading(true);
      setError(null);
      const result = await ReasonProxy.create(payload);
      await fetchReasons();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReasons();
  }, []);

  return {
    data,
    loading,
    error,
    fetchReasons,
    createReasons,
  };
};
