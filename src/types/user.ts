export type UserRole = "admin" | "manager" | "cashier";

export interface User {
  id: string;

  first_name: string;
  last_name: string;

  email: string;
  phone?: string;

  role: UserRole;

  is_active: boolean;

  created_at?: string;
  updated_at?: string;
}

export interface CreateUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  role: UserRole;
}

export interface UpdateUserStatusPayload {
  is_active: boolean;
}