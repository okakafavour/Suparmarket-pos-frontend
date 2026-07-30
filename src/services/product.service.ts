import api from "@/lib/axios";

export async function getProductById(id: string) {
  const { data } = await api.get(`/products/${id}`);
  return data.data;
}