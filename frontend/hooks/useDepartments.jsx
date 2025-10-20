import { useEffect, useState } from "react";
import { DepartmentsProxy } from "../proxies/DepartmentsProxy.js";

export const useDepartments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await DepartmentsProxy.getAll();
      setData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createDepartment = async (payload) => {
    try {
      setLoading(true);
      setError(null);
      const result = await DepartmentsProxy.create(payload);
      await fetchDepartments();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return {
    data,
    loading,
    error,
    fetchDepartments,
    createDepartment,
  };
};
