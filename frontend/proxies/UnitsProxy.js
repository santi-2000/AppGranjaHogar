import {API_BASE_URL} from '@env';

export const UnitsProxy = {
  async getAll() {
    const res = await fetch(`${API_BASE_URL}/v1/units`, {
  headers: { "Cache-Control": "no-cache" }
    });
    
    if (!res.ok) throw new Error("Error al obtener la unidad");
    return res.json();
  },

  async getById(id) {
    const res = await fetch(`${API_BASE_URL}/v1/units/${id}`);
    if (!res.ok) throw new Error("Unidad no encontrada");
    return res.json();
  },

    async create(data) {
    const res = await fetch(`${API_BASE_URL}/v1/units`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
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
