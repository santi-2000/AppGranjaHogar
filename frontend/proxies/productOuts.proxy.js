import {API_BASE_URL} from '@env';
import {GRANJA_HOGAR_VERSION} from '@env';
import {PRODUCT_OUTS_ENDPOINT} from '@env';

export const ProductOutsProxy = {
  async getAll() {
    const res = await fetch(`${API_BASE_URL}${GRANJA_HOGAR_VERSION}${PRODUCT_OUTS_ENDPOINT}`);
    if (!res.ok) throw new Error("Error al obtener las salidas");
    return res.json();
  },

  async getById(id) {
    const res = await fetch(`${API_BASE_URL}${GRANJA_HOGAR_VERSION}${PRODUCT_OUTS_ENDPOINT}/${id}`);
    if (!res.ok) throw new Error("Salida no encontrada");
    return res.json();
  },

    async create(data) {
    const res = await fetch(`${API_BASE_URL}${GRANJA_HOGAR_VERSION}${PRODUCT_OUTS_ENDPOINT}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
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
