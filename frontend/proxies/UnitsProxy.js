import { API_BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

export const UnitsProxy = {
  async getAll() {
    const token = await SecureStore.getItemAsync('token');

    const res = await fetch(`${API_BASE_URL}/v1/units`, {
      headers: {
        "Cache-Control": "no-cache",
        "Authorization": "Bearer " + token
      }
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Error desconocido');
    
    return data
  },

  async getById(id) {
    const token = await SecureStore.getItemAsync('token');

    const res = await fetch(`${API_BASE_URL}/v1/units/${id}`, {
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Error desconocido');
    
    return data
  },

  async create(data) {
    const token = await SecureStore.getItemAsync('token');

    const res = await fetch(`${API_BASE_URL}/v1/units`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(data),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error desconocido');

    return data;
  }
};
