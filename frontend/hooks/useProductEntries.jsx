import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { ProductsEntriesProxy } from "../proxies/ProductEntriesProxy";

/**
 * Hook personalizado para manejar las entradas de productos.
 * @author Dania Sagarnaga Macías
 */
export const useProductEntries = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Obtiene todas las entradas registradas.
   */
  const fetchEntries = async () => {
    try {
      setLoading(true);
      const data = await ProductsEntriesProxy.getAll();
      setEntries(data);
    } catch (err) {
      console.error("Error al obtener las entradas:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Crea una nueva entrada de producto y actualiza el stock.
   * Incluye el user_id guardado en SecureStore.
   */
  const createEntry = async (entryData) => {
    try {
      setLoading(true);
      const userId = await SecureStore.getItemAsync("user_id"); // 👈 guardado al iniciar sesión

      if (!userId) throw new Error("No se encontró el ID del usuario autenticado.");

      const dataWithUser = { ...entryData, user_id: userId };

      const newEntry = await ProductsEntriesProxy.createEntry(dataWithUser);

      // Actualiza el estado local con la nueva entrada
      setEntries((prev) => [...prev, newEntry]);
      return newEntry;
    } catch (err) {
      console.error("Error al crear la entrada:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

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
};