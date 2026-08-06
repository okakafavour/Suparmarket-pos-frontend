import api from "@/lib/axios";

import type {
  Customer,
  CustomerDashboard,
  CreateCustomerPayload,
  UpdateCustomerPayload,
  // AddLoyaltyPayload,
} from "@/types/customers";

// ===============================
// Get All Customers
// ===============================

export async function getCustomers(): Promise<Customer[]> {
  const { data } = await api.get("/customers");

  return data.data;
}

// ===============================
// Get Single Customer
// ===============================

export async function getCustomer(
  id: string
): Promise<Customer> {
  const { data } = await api.get(`/customers/${id}`);

  return data.data;
}

// ===============================
// Create Customer
// ===============================

export async function createCustomer(
  payload: CreateCustomerPayload
): Promise<Customer> {
  const { data } = await api.post(
    "/customers",
    payload
  );

  return data.data;
}

// ===============================
// Update Customer
// ===============================

export async function updateCustomer(
  id: string,
  payload: UpdateCustomerPayload
): Promise<Customer> {
  const { data } = await api.put(
    `/customers/${id}`,
    payload
  );

  return data.data;
}

// ===============================
// Delete Customer
// ===============================

export async function deleteCustomer(
  id: string
) {
  const { data } = await api.delete(
    `/customers/${id}`
  );

  return data;
}

// ===============================
// Search Customers
// ===============================

export async function searchCustomers(
  query: string
): Promise<Customer[]> {
  const { data } = await api.get(
    "/customers/search",
    {
      params: {
        q: query,
      },
    }
  );

  return data.data;
}

// ===============================
// Add Loyalty Points
// ===============================

export async function addLoyaltyPoints(
  id: string,
  points: number
): Promise<Customer> {
  const { data } = await api.post(
    `/customers/${id}/loyalty`,
    {
      points,
    }
  );

  return data.data;
}

// ==========================
// Dashboard
// ==========================

export async function getCustomerDashboard(): Promise<CustomerDashboard> {
  const { data } = await api.get("/customers/dashboard");

  return data.data;
}