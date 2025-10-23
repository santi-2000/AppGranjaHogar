import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { ProductsEntriesProxy } from "../proxies/ProductEntriesProxy";
import { CreateProductEntrieVo } from "../valueobjects/product-entries/CreateProductEntrieVo";
import { useRouter } from "expo-router";

/**
 * Hook personalizado para manejar las entradas de productos.
 * @author Dania Sagarnaga Macías
 */
export const useProductEntries = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPerishable, setIsPerishable] = useState(false);
  const [unitId, setUnitId] = useState(null);

  const router = useRouter()

  const createEntry = async (entryData) => {
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