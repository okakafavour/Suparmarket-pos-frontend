export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  is_active: boolean;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
}