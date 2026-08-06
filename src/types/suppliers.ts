// ==========================
// Supplier
// ==========================

export interface Supplier {
  id: string;

  name: string;
  contact_person: string;

  email: string;
  phone: string;

  address: string;
  city: string;
  state: string;
  country: string;

  is_active: boolean;

  created_at: string;
  updated_at: string;
}

// ==========================
// Create Supplier
// ==========================

export interface CreateSupplierPayload {
  name: string;
  contact_person: string;

  email: string;
  phone: string;

  address: string;
  city: string;
  state: string;
  country: string;
}

// ==========================
// Update Supplier
// ==========================

export interface UpdateSupplierPayload {
  name?: string;
  contact_person?: string;

  email?: string;
  phone?: string;

  address?: string;
  city?: string;
  state?: string;
  country?: string;

  is_active?: boolean;
}

// ==========================
// Query Params
// ==========================

export interface SupplierQueryParams {
  page?: number;
  limit?: number;

  search?: string;

  status?: "" | "active" | "inactive";

  sort?: "created_at" | "name";
}

// ==========================
// Paginated Response
// ==========================

export interface PaginatedSuppliers {
  data: Supplier[];

  page: number;
  limit: number;

  total: number;
  total_pages: number;
}