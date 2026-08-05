import api from "@/lib/axios";

import type {
  Sale,
  SalesDashboard,
  SalesAnalytics,
  PaginatedResponse,
  PaymentMethod,
  SaleStatus,
} from "@/types/sales";

// ==========================
// Query Params
// ==========================

export interface SalesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  payment?: PaymentMethod | "";
  status?: SaleStatus | "";
  sortBy?: string;
  order?: "asc" | "desc";
}

// ==========================
// Create Sale Payload
// ==========================

export interface CreateSalePayload {
  customer_name?: string;
  discount?: number;
  tax?: number;
  payment_method: PaymentMethod;

  items: {
    product_id: string;
    quantity: number;
  }[];
}

// ==========================
// Get Sales
// ==========================

export async function getSales(
  params: SalesQueryParams
): Promise<PaginatedResponse<Sale>> {
  const { data } = await api.get("/sales", {
    params,
  });

  return data;
}

// ==========================
// Get Single Sale
// ==========================

export async function getSale(
  id: string
): Promise<Sale> {
  const { data } = await api.get(`/sales/${id}`);

  return data.data;
}

// ==========================
// Create Sale
// ==========================

export async function createSale(
  payload: CreateSalePayload
): Promise<Sale> {
  const { data } = await api.post(
    "/sales",
    payload
  );

  return data.data;
}

// ==========================
// Delete Sale
// ==========================

export async function deleteSale(
  id: string
) {
  const { data } = await api.delete(
    `/sales/${id}`
  );

  return data;
}

// ==========================
// Restore Sale
// ==========================

export async function restoreSale(
  id: string
) {
  const { data } = await api.patch(
    `/sales/${id}/restore`
  );

  return data;
}

// ==========================
// Permanent Delete Sale
// ==========================

export async function permanentDeleteSale(
  id: string
) {
  const { data } = await api.delete(
    `/sales/${id}/permanent`
  );

  return data;
}

// ==========================
// Sales Dashboard
// ==========================

export async function getSalesDashboard(): Promise<SalesDashboard> {
  const { data } = await api.get(
    "/sales/dashboard"
  );

  return data.data;
}

// ==========================
// Sales Analytics
// ==========================

export async function getSalesAnalytics(): Promise<SalesAnalytics> {
  const { data } = await api.get(
    "/sales/analytics"
  );

  return data.data;
}