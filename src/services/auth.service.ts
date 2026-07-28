import api from "@/lib/axios";
import type { LoginRequest, LoginResponse } from "@/types/auth";

export async function login(
  data: LoginRequest
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/api/v1/auth/login",
    data
  );

  return response.data;
}