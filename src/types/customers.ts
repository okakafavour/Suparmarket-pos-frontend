// ==========================
// Customer
// ==========================

export interface Customer {
  id: string;

  first_name: string;
  last_name: string;
  full_name: string;

  email: string;
  phone: string;
  address: string;

  loyalty_points: number;
  total_spent: number;
  total_orders: number;

  is_active: boolean;
}

// ==========================
// Create Customer
// ==========================

export interface CreateCustomerPayload {
  first_name: string;
  last_name: string;

  email: string;
  phone: string;

  address: string;
}

// ==========================
// Update Customer
// ==========================

export interface UpdateCustomerPayload {
  first_name?: string;
  last_name?: string;

  email?: string;
  phone?: string;

  address?: string;

  is_active?: boolean;
}

// ==========================
// Loyalty
// ==========================

export interface AddLoyaltyPayload {
  points: number;
}

// ==========================
// Customer Dashboard
// ==========================

export interface CustomerDashboard {
  total_customers: number;

  active_customers: number;

  inactive_customers: number;

  total_revenue: number;

  total_orders: number;

  loyalty_members: number;
}