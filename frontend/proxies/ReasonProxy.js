import { API_BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

export const ReasonProxy = {
  async getAll() {
    const token = await SecureStore.getItemAsync('token');

    const res = await fetch(`${API_BASE_URL}/v1/reasons`, {
      headers: {
        "Cache-Control": "no-cache",
        "Authorization": "Bearer " + token
      }
    });

    if (!res.ok) throw new Error("Error al obtener la Razón");
    return res.json();
  },

  async getById(id) {
    const token = await SecureStore.getItemAsync('token');

    const res = await fetch(`${API_BASE_URL}/v1/reasons/${id}`, {
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    if (!res.ok) throw new Error("Razón no encontrada");
    return res.json();
  },

  async create(data) {
    const token = await SecureStore.getItemAsync('token');

    const res = await fetch(`${API_BASE_URL}/v1/reasons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || "Error al registrar razón");
    }

    return res.json();
  }
};
