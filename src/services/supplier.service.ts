import api from "@/lib/axios";

import type {
  Supplier,
  SupplierQueryParams,
  PaginatedSuppliers,
  CreateSupplierPayload,
  UpdateSupplierPayload,
} from "@/types/suppliers";

// ==========================
// Get Suppliers
// ==========================

export async function getSuppliers(
  params?: SupplierQueryParams
): Promise<PaginatedSuppliers> {
  const { data } = await api.get("/suppliers", {
    params,
  });

  return data.data;
}

// ==========================
// Get Supplier
// ==========================

export async function getSupplier(
  id: string
): Promise<Supplier> {
  const { data } = await api.get(
    `/suppliers/${id}`
  );

  return data.data;
}

// ==========================
// Create Supplier
// ==========================

export async function createSupplier(
  payload: CreateSupplierPayload
): Promise<Supplier> {
  const { data } = await api.post(
    "/suppliers",
    payload
  );

  return data.data;
}

// ==========================
// Update Supplier
// ==========================

export async function updateSupplier(
  id: string,
  payload: UpdateSupplierPayload
): Promise<Supplier> {
  const { data } = await api.put(
    `/suppliers/${id}`,
    payload
  );

  return data.data;
}

// ==========================
// Delete Supplier
// ==========================

export async function deleteSupplier(
  id: string
) {
  const { data } = await api.delete(
    `/suppliers/${id}`
  );

  return data;
}