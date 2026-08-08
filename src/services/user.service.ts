import api from "@/lib/axios";
import type {
  User,
  UserRole,
} from "@/types/user";

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

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get("/users");
  return data.data;
}

export async function getUser(id: string): Promise<User> {
  const { data } = await api.get(`/users/${id}`);
  return data.data;
}

export async function createUser(
  payload: CreateUserPayload
) {
  const { data } = await api.post("/users", payload);
  return data;
}

export async function updateUser(
  id: string,
  payload: UpdateUserPayload
) {
  const { data } = await api.put(
    `/users/${id}`,
    payload
  );

  return data;
}

export async function updateUserStatus(
  id: string,
  payload: UpdateUserStatusPayload
) {
  const { data } = await api.patch(
    `/users/${id}/status`,
    payload
  );

  return data;
}

export async function deleteUser(id: string) {
  const { data } = await api.delete(
    `/users/${id}`
  );

  return data;
}