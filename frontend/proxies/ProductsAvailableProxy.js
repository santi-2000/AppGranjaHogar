import { API_BASE_URL } from "@env";
import * as SecureStore from "expo-secure-store";

export const ProductsProxy = {
  async getAvailableProducts() {
    const token = await SecureStore.getItemAsync("token");
    const res = await fetch(`${API_BASE_URL}/v1/products/available-products`, {
      headers: {
        "Authorization": "Bearer " + token,
        "Cache-Control": "no-cache",
      },
    });

    if (!res.ok) throw new Error("Error al obtener los productos disponibles");
    return res.json();
  },
};
