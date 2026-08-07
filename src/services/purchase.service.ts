import api from "@/lib/axios";

import type {
  Purchase,
  PaginatedPurchases,
  PurchaseQueryParams,
  CreatePurchasePayload,
} from "@/types/purchase";

function normalizePurchase(purchase: any): Purchase {
  return {
    id: purchase.id ?? purchase.ID,
    invoice_number: purchase.invoice_number,
    supplier_id: purchase.supplier_id,
    supplier: purchase.supplier,
    status: purchase.status,
    total_amount: purchase.total_amount,
    received_at: purchase.received_at,
    created_by: purchase.created_by,
    created_at: purchase.created_at ?? purchase.CreatedAt,
    updated_at: purchase.updated_at ?? purchase.UpdatedAt,

    items: (purchase.items ?? purchase.Items ?? []).map(
      (item: any) => ({
        id: item.id ?? item.ID,
        purchase_id:
          item.purchase_id ?? item.PurchaseID,
        product_id:
          item.product_id ?? item.ProductID,
        product: item.product,
        quantity: item.quantity,
        unit_cost: item.unit_cost,
        subtotal: item.subtotal,
      })
    ),
  };
}

// ==========================
// Get Purchases
// ==========================

export async function getPurchases(
  params?: PurchaseQueryParams
): Promise<PaginatedPurchases> {
  const { data } = await api.get("/purchases", {
    params,
  });

  const result = data.data;

  return {
    ...result,
    data: result.data.map(normalizePurchase),
  };
}

// ==========================
// Get Purchase
// ==========================

export async function getPurchase(
  id: string
): Promise<Purchase> {
  const { data } = await api.get(
    `/purchases/${id}`
  );

  return normalizePurchase(data.data);
}

// ==========================
// Create Purchase
// ==========================

export async function createPurchase(
  payload: CreatePurchasePayload
): Promise<Purchase> {
  const { data } = await api.post(
    "/purchases",
    payload
  );

  return normalizePurchase(data.data);
}

// ==========================
// Receive Purchase
// ==========================

export async function receivePurchase(
  id: string
) {
  const { data } = await api.patch(
    `/purchases/${id}/receive`
  );

  return data;
}

// ==========================
// Delete Purchase
// ==========================

export async function deletePurchase(
  id: string
) {
  const { data } = await api.delete(
    `/purchases/${id}`
  );

  return data;
}