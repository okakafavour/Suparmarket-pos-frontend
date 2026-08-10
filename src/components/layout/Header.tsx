import { useEffect, useState } from "react";
import {
  Bell,
  Search,
  Menu,
  AlertTriangle,
  Package,
  Check,
  Trash2,
  X,
} from "lucide-react";

type Notification = {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  type: "low_stock" | "out_of_stock" | "sale" | "restock" | "adjustment" | "user";
  title: string;
  message: string;
  is_read: boolean;
};

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

export default function Header() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const fetchNotifications = async () => {
    try {
      const token = getToken();

      if (!token) {
        return;
      }

      const response = await fetch(`${API_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const result = await response.json();

      setNotifications(result.data || []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const token = getToken();

      if (!token) {
        return;
      }

      const response = await fetch(
        `${API_URL}/notifications/${id}/read`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }

      setNotifications((previous) =>
        previous.map((notification) =>
          notification.id === id
            ? { ...notification, is_read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = getToken();

      if (!token) {
        return;
      }

      const response = await fetch(
        `${API_URL}/notifications/read-all`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark all notifications as read");
      }

      setNotifications((previous) =>
        previous.map((notification) => ({
          ...notification,
          is_read: true,
        }))
      );
    } catch (error) {
      console.error(
        "Failed to mark all notifications as read:",
        error
      );
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      const token = getToken();

      if (!token) {
        return;
      }

      const response = await fetch(
        `${API_URL}/notifications/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete notification");
      }

      setNotifications((previous) =>
        previous.filter((notification) => notification.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  const deleteAllNotifications = async () => {
    try {
      const token = getToken();

      if (!token) {
        return;
      }

      const response = await fetch(`${API_URL}/notifications`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete notifications");
      }

      setNotifications([]);
    } catch (error) {
      console.error(
        "Failed to delete notifications:",
        error
      );
    }
  };

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "low_stock":
      case "out_of_stock":
        return (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600 dark:bg-yellow-950/40 dark:text-yellow-400">
            <AlertTriangle size={18} />
          </div>
        );

      case "restock":
      case "adjustment":
        return (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            <Package size={18} />
          </div>
        );

      default:
        return (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <Bell size={18} />
          </div>
        );
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8 dark:border-slate-800 dark:bg-slate-950">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="rounded-xl p-2 transition hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
        >
          <Menu size={22} />
        </button>

        <div className="relative hidden sm:block">
          <Search
            className="absolute left-4 top-3 text-slate-400"
            size={18}
          />

          <input
            placeholder="Search products..."
            className="w-64 rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-blue-500 lg:w-80 dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">
        {/* NOTIFICATIONS */}
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setNotificationsOpen((previous) => !previous)
            }
            className="relative flex h-11 w-11 items-center justify-center rounded-xl transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Bell size={21} />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* NOTIFICATION DROPDOWN */}
          {notificationsOpen && (
            <div className="absolute right-0 z-50 mt-3 w-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
              {/* HEADER */}
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
                <div>
                  <h3 className="font-semibold">
                    Notifications
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {unreadCount > 0
                      ? `${unreadCount} unread notification${
                          unreadCount > 1 ? "s" : ""
                        }`
                      : "You're all caught up"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setNotificationsOpen(false)}
                  className="rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X size={17} />
                </button>
              </div>

              {/* ACTIONS */}
              {notifications.length > 0 && (
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3 dark:border-slate-700">
                  {unreadCount > 0 ? (
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      <Check size={14} />
                      Mark all as read
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400">
                      All notifications read
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={deleteAllNotifications}
                    className="flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={14} />
                    Clear all
                  </button>
                </div>
              )}

              {/* NOTIFICATIONS */}
              <div className="max-h-[400px] overflow-y-auto">
                {loading ? (
                  <div className="px-5 py-10 text-center text-sm text-slate-500">
                    Loading notifications...
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="px-5 py-10 text-center">
                    <Bell
                      size={30}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                      No notifications
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      You're all caught up.
                    </p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`border-b border-slate-100 px-5 py-4 transition last:border-b-0 dark:border-slate-800 ${
                        !notification.is_read
                          ? "bg-blue-50/50 dark:bg-blue-950/20"
                          : ""
                      }`}
                    >
                      <div className="flex gap-3">
                        {getNotificationIcon(
                          notification.type
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold">
                              {notification.title}
                            </p>

                            {!notification.is_read && (
                              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                            )}
                          </div>

                          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                            {notification.message}
                          </p>

                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-[11px] text-slate-400">
                              {formatDate(
                                notification.created_at
                              )}
                            </span>

                            <div className="flex items-center gap-2">
                              {!notification.is_read && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    markAsRead(
                                      notification.id
                                    )
                                  }
                                  className="text-[11px] font-semibold text-blue-600 hover:text-blue-700"
                                >
                                  Mark read
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() =>
                                  deleteNotification(
                                    notification.id
                                  )
                                }
                                className="text-slate-400 hover:text-red-500"
                                aria-label="Delete notification"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
            A
          </div>

          <div className="hidden sm:block">
            <h4 className="font-semibold">
              Administrator
            </h4>

            <p className="text-sm text-slate-500">
              Full Access
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}