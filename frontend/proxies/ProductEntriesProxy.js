import { API_BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

/**
 * Proxy para las entradas de productos con servicios HTTP
 * @author Dania Sagarnaga Macías
 */
export const ProductsEntriesProxy = {
  /**
   * Crea una nueva entrada de producto
   * @param {Object} data - Datos de la nueva entrada
   * @returns {Promise<Object>} Entrada creada + stock actualizado
   */
  async createEntry(dataVO) {
    const token = await SecureStore.getItemAsync('token');

    const res = await fetch(`${API_BASE_URL}/v1/product-entries/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(dataVO)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al registrar entrada");
    

    return data;
  },

  /**
   * Obtiene todas las entradas registradas
   * @returns {Promise<Array>} Lista de entradas
   */
  async getAll() {
    const token = await SecureStore.getItemAsync('token');

    const res = await fetch(`${API_BASE_URL}/v1/product-entries`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error desconocido");
    return data;
  },

  /**
   * Obtiene una entrada específica por ID
   * @param {number} id - ID de la entrada
   * @returns {Promise<Object>} Datos de la entrada
   */
  async getById(id) {
    const token = await SecureStore.getItemAsync('token');

    const res = await fetch(`${API_BASE_URL}/v1/product-entries/${id}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    const data = await res.json();
    if (!res.ok) throw new Error("Entrada no encontrada");
    return data;
  }
};