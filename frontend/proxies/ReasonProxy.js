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

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error desconocido');
    return data;
  },

  async getById(id) {
    const token = await SecureStore.getItemAsync('token');

    const res = await fetch(`${API_BASE_URL}/v1/reasons/${id}`, {
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error desconocido');
    return data;
  },

  async create(dataVO) {
    const token = await SecureStore.getItemAsync('token');

    const res = await fetch(`${API_BASE_URL}/v1/reasons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(dataVO),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Error desconocido');

    return data
  }
};
