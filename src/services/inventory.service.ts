import api from "@/lib/axios";
import type { Product } from "@/types/product";

/* ===========================
   INVENTORY
=========================== */

export async function getInventorySummary() {
  const { data } = await api.get("/inventory/summary");
  return data.data;
}

export async function getInventoryAnalytics() {
  const { data } = await api.get("/inventory/analytics");
  return data.data;
}

/* ===========================
   PRODUCTS
=========================== */

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
}

export interface ProductParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export async function getProducts(
  params: ProductParams = {}
): Promise<ProductsResponse> {
  const response = await api.get("/products", {
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? 10,
      search: params.search,
      category: params.category,
      status: params.status,
      sortBy: params.sortBy,
      order: params.order,
    },
  });

  return {
    products: response.data.data,
    pagination: response.data.pagination,
  };
}

export interface CreateProductPayload {
  name: string;
  description?: string;
  sku: string;
  barcode?: string;

  category_id: string;
  supplier_id: string;

  cost_price: number;
  selling_price: number;

  quantity: number;
  minimum_stock: number;

  image_url?: string;
}

export async function createProduct(
  payload: CreateProductPayload
) {
  const { data } = await api.post("/products", payload);
  return data.data;
}

export async function updateProduct(
  id: string,
  payload: Partial<CreateProductPayload> & {
    is_active?: boolean;
  }
) {
  const { data } = await api.put(
    `/products/${id}`,
    payload
  );

  return data.data;
}

export async function deleteProduct(id: string) {
  const { data } = await api.delete(`/products/${id}`);
  return data;
}

/* ===========================
   CATEGORY
=========================== */

export async function getCategories() {
  const { data } = await api.get("/categories");
  return data.data;
}

/* ===========================
   SUPPLIERS
=========================== */

export async function getSuppliers() {
  const { data } = await api.get("/suppliers");
  return data.data.data;
}

/* ===========================
   INVENTORY LOGS
=========================== */

export async function getInventoryLogs() {
  const response = await api.get("/inventory/logs", {
    params: {
      page: 1,
      limit: 6,
    },
  });

  return response.data.data.data;
}