import { useState, useEffect } from "react";
import { ProductsEntriesProxy } from "../proxies/ProductEntriesProxy";

/**
 * @author Dania Sagarnaga Macías
 * Hook personalizado para manejar las entradas de productos
 * (crear, listar, obtener por ID)
 */
export function useProductEntries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Crea una nueva entrada y la añade al estado local
   */
  const createEntry = async (entryData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await ProductsEntriesProxy.createEntry(entryData);
      const newEntry = res.data.entry; // ⚡️ ajusta según estructura backend
      setEntries((prev) => [...prev, newEntry]);
      return res;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Obtiene todas las entradas desde la API
   */
  const fetchEntries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await ProductsEntriesProxy.getAll();
      setEntries(res);
      return res;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cargar entradas automáticamente al montar el componente
  useEffect(() => {
    fetchEntries();
  }, []);

  return {
    entries,
    loading,
    error,
    createEntry,
    fetchEntries,
  };
}