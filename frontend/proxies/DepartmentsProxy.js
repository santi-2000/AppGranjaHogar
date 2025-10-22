import { API_BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

export const DepartmentsProxy = {
  async getAll() {
    const token = await SecureStore.getItemAsync('token');
    const res = await fetch(`${API_BASE_URL}/v1/departments`, {
      headers: {
        "Cache-Control": "no-cache",
        "Authorization": "Bearer " + token

      }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al obtener los departamentos');
    return data;
  },

  async getById(id) {
    const token = await SecureStore.getItemAsync('token');
    const res = await fetch(
      `${API_BASE_URL}/v1/departments/${id}`, {
      headers: {
        "Authorization": "Bearer " + token

      }
    }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Departamento no encontrado');
    return data;
  },

  async create(dataVO) {
    const token = await SecureStore.getItemAsync('token');
    const res = await fetch(`${API_BASE_URL}/v1/departments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token

      },
      body: JSON.stringify(dataVO),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error desconocido');

    return data;
  }
};
