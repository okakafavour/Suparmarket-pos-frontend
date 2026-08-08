import api from "@/lib/axios";

import type {
  Settings,
  UpdateSettingsPayload,
} from "@/types/settings";

export async function getSettings(): Promise<Settings> {
  const { data } = await api.get("/settings");

  return data.data;
}

export async function updateSettings(
  payload: UpdateSettingsPayload
): Promise<Settings> {
  const { data } = await api.put("/settings", payload);

  return data.data;
}