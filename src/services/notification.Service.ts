import api from "@/lib/axios";

export interface Notification {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;

  type:
    | "low_stock"
    | "out_of_stock"
    | "sale"
    | "restock"
    | "adjustment"
    | "user";

  title: string;
  message: string;
  is_read: boolean;
}

export interface NotificationsResponse {
  success: boolean;
  data: Notification[];
}

export interface UnreadCountResponse {
  success: boolean;
  data: {
    count: number;
  };
}

// =====================================================
// GET ALL NOTIFICATIONS
// =====================================================

export async function getNotifications(): Promise<Notification[]> {
  const response = await api.get("/notifications");

  return response.data.data;
}

// =====================================================
// GET UNREAD NOTIFICATION COUNT
// =====================================================

export async function getUnreadNotificationCount(): Promise<number> {
  const response = await api.get("/notifications/unread-count");

  return response.data.data.count;
}

// =====================================================
// MARK ONE NOTIFICATION AS READ
// =====================================================

export async function markNotificationAsRead(
  id: string
): Promise<void> {
  await api.patch(`/notifications/${id}/read`);
}

// =====================================================
// MARK ALL NOTIFICATIONS AS READ
// =====================================================

export async function markAllNotificationsAsRead(): Promise<void> {
  await api.patch("/notifications/read-all");
}

// =====================================================
// DELETE ONE NOTIFICATION
// =====================================================

export async function deleteNotification(
  id: string
): Promise<void> {
  await api.delete(`/notifications/${id}`);
}

// =====================================================
// DELETE ALL NOTIFICATIONS
// =====================================================

export async function deleteAllNotifications(): Promise<void> {
  await api.delete("/notifications");
}