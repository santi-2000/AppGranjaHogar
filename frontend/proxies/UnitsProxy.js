import { API_BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

export const UnitsProxy = {
  async getAll() {
    const token = await SecureStore.getItemAsync('token');

    const res = await fetch(`${API_BASE_URL}/v1/units`, {
      headers: {
        "Cache-Control": "no-cache",
        "Authorization": "Barier " + token
      }
    });

    if (!res.ok) throw new Error("Error al obtener la unidad");
    return res.json();
  },

  async getById(id) {
    const token = await SecureStore.getItemAsync('token');

    const res = await fetch(`${API_BASE_URL}/v1/units/${id}`, {
      headers: {
        "Authorization": "Barier " + token
      }
    });
    if (!res.ok) throw new Error("Unidad no encontrada");
    return res.json();
  },

  async create(data) {
    const token = await SecureStore.getItemAsync('token');

    const res = await fetch(`${API_BASE_URL}/v1/units`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Barier " + token
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || "Error al registrar unidad");
    }

    return res.json();
  }
};
