import { API_BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

export const ProductOutsProxy = {
  async getAll() {
    const token = await SecureStore.getItemAsync('token');

    const res = await fetch(`${API_BASE_URL}/v1/product-outs`, {
      headers: {
        "Authorization": "Bearer " + token

      }
    });
    if (!res.ok) throw new Error("Error al obtener las salidas");
    return res.json();
  },

  async getById(id) {
    const token = await SecureStore.getItemAsync('token');

    const res = await fetch(`${API_BASE_URL}/v1/product-outs${id}`, {
      headers: {
        "Authorization": "Bearer " + token

      }
    });
    if (!res.ok) throw new Error("Salida no encontrada");
    return res.json();
  },

  async create(data) {
    const token = await SecureStore.getItemAsync('token');

    const res = await fetch(`${API_BASE_URL}/v1/product-outs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token

      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || "Error al registrar la salida");
    }

    return res.json();
  }
};
