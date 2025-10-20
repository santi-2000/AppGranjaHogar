import {API_BASE_URL} from '@env';

export const ReasonProxy = {
  async getAll() {
    const res = await fetch(`${API_BASE_URL}/v1/reasons`, {
  headers: { "Cache-Control": "no-cache" }
    });
    
    if (!res.ok) throw new Error("Error al obtener la Razón");
    return res.json();
  },

  async getById(id) {
    const res = await fetch(`${API_BASE_URL}/v1/reasons/${id}`);
    if (!res.ok) throw new Error("Razón no encontrada");
    return res.json();
  },

    async create(data) {
    const res = await fetch(`${API_BASE_URL}/v1/reasons`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
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
