import {API_BASE_URL} from '@env';

export const DepartmentsProxy = {
  async getAll() {
    const res = await fetch(`${API_BASE_URL}/v1/departments`, {
  headers: { "Cache-Control": "no-cache" }
    });
    
    if (!res.ok) throw new Error("Error al obtener los departamentos");
    return res.json();
  },

  async getById(id) {
    const res = await fetch(`${API_BASE_URL}/v1/departments/${id}`);
    if (!res.ok) throw new Error("Departamento no encontrado");
    return res.json();
  },

    async create(data) {
    const res = await fetch(`${API_BASE_URL}/v1/departments`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Error al registrar departamento");
    }

    return res.json();
}
};
