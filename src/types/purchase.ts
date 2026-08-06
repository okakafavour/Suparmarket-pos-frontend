import type { Product } from "./product";
import type { Supplier } from "./suppliers";

export interface PurchaseItem {
  id: string;

  purchase_id: string;

  product_id: string;

  product: Product;

  quantity: number;

  unit_cost: number;

  subtotal: number;
}

export interface Purchase {
  id: string;

  invoice_number: string;

  supplier_id: string;

  supplier: Supplier;

  status: "pending" | "received" | "cancelled";

  total_amount: number;

  received_at: string | null;

  created_by: string;

  created_at: string;

  updated_at: string;

  items: PurchaseItem[];
}

export interface PurchaseQueryParams {
  page?: number;

  limit?: number;

  search?: string;

  supplier_id?: string;

  status?: string;

  sort?: string;
}

export interface PaginatedPurchases {
  data: Purchase[];

  page: number;

  limit: number;

  total: number;

  total_pages: number;
}

export interface CreatePurchaseItem {
  product_id: string;

  quantity: number;

  unit_cost: number;
}

export interface CreatePurchasePayload {
  supplier_id: string;

  items: CreatePurchaseItem[];
}