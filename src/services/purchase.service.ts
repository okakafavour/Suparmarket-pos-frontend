import api from "@/lib/axios";

import type {
  Purchase,
  PaginatedPurchases,
  PurchaseQueryParams,
  CreatePurchasePayload,
} from "@/types/purchase";

export async function getPurchases(
  params?: PurchaseQueryParams
): Promise<PaginatedPurchases> {
  const { data } = await api.get("/purchases", {
    params,
  });

  return data.data;
}

export async function getPurchase(id: string) {
  const { data } = await api.get(`/purchases/${id}`);

  return data.data as Purchase;
}

export async function createPurchase(
  payload: CreatePurchasePayload
) {
  const { data } = await api.post(
    "/purchases",
    payload
  );

  return data.data as Purchase;
}

export async function receivePurchase(id: string) {
  const { data } = await api.post(
    `/purchases/${id}/receive`
  );

  return data;
}

export async function deletePurchase(id: string) {
  const { data } = await api.delete(
    `/purchases/${id}`
  );

  return data;
}