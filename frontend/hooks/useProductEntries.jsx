/**
 * Hook para manejar las entradas de productos.
 * @author Dania Sagarnaga Macías
 */

import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { ProductsEntriesProxy } from "../proxies/ProductEntriesProxy";
import { CreateProductEntrieVo } from "../valueobjects/product-entries/CreateProductEntrieVo";
import { useRouter } from "expo-router";

export const useProductEntries = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPerishable, setIsPerishable] = useState(false);
  const [unitId, setUnitId] = useState(null);

  const router = useRouter()

  const createEntry = async (entryData) => {
    /**
     * Crea una nueva entrada de producto.
     * @param {Object} entryData - Datos de la entrada del producto.
     * @returns {Promise<void>} - Promesa que se resuelve cuando la entrada es creada.
     * @throws {Error} - Si ocurre un error al crear la entrada.
     */

    try {
      setLoading(true);

      const entrieVo = new CreateProductEntrieVo(entryData);
      console.log(entrieVo);

      await ProductsEntriesProxy.createEntry(entrieVo);

      router.replace("/home");

    } catch (err) {
      console.error("Error al crear la entrada:", err);
      setError({ general: err.message || "Error al crear la entrada" });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    unitId,
    setUnitId,
    createEntry,
    isPerishable,
    setIsPerishable,
  };
};