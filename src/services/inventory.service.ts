import api from "@/lib/axios";
import type { ProductsResponse } from "@/types/inventory";

export async function getProducts(): Promise<ProductsResponse> {
  const response = await api.get<ProductsResponse>("/products");

  return response.data;
}