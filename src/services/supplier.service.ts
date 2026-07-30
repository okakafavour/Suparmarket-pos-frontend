import api from "@/lib/axios";

export interface Supplier {
  ID: string;
  Name: string;
}

export async function getSuppliers(): Promise<Supplier[]> {
  const { data } = await api.get("/suppliers");

  return data.data.data;
}