import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Package,
  RefreshCw,
  Search,
  Settings,
  ShoppingCart,
  Sun,
  Trash2,
  User,
  UserPlus,
  X,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

import {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  deleteAllNotifications,
  type Notification,
} from "@/services/notification.Service";

export default function Header() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [openMenu, setOpenMenu] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingNotifications, setLoadingNotifications] =
    useState(false);

  // =====================================================
  // DATE
  // =====================================================

  const today = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    []
  );

  // =====================================================
  // USER
  // =====================================================

  const initials = useMemo(() => {
    if (!user) return "A";

    return `${user.first_name?.[0] ?? ""}${
      user.last_name?.[0] ?? ""
    }`.toUpperCase();
  }, [user]);

  const fullName = user
    ? `${user.first_name} ${user.last_name}`
    : "Administrator";

  const role = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "Administrator";

  // =====================================================
  // LOAD NOTIFICATIONS
  // =====================================================

  async function loadNotifications() {
    try {
      setLoadingNotifications(true);

      const [notificationData, count] = await Promise.all([
        getNotifications(),
        getUnreadNotificationCount(),
      ]);

      setNotifications(notificationData);
      setUnreadCount(count);
    } catch (error) {
      console.error("Failed to load notifications:", error);
    } finally {
      setLoadingNotifications(false);
    }
  }

  // Load notifications when Header mounts
  useEffect(() => {
    loadNotifications();
  }, []);

  // =====================================================
  // LOGOUT
  // =====================================================

  function handleLogout() {
    setOpenMenu(false);
    setNotificationsOpen(false);

    logout();

    navigate("/login", {
      replace: true,
    });
  }

  // =====================================================
  // PROFILE
  // =====================================================

  function handleProfile() {
    setOpenMenu(false);
    setNotificationsOpen(false);

    navigate("/profile");
  }

  // =====================================================
  // SETTINGS
  // =====================================================

  function handleSettings() {
    setOpenMenu(false);
    setNotificationsOpen(false);

    navigate("/settings");
  }

  // =====================================================
  // MOBILE MENU
  // =====================================================

  function handleMobileMenu() {
    console.log("Mobile menu clicked");
  }

  // =====================================================
  // NOTIFICATIONS
  // =====================================================

  async function handleNotifications() {
    const nextState = !notificationsOpen;

    setNotificationsOpen(nextState);
    setOpenMenu(false);

    if (nextState) {
      await loadNotifications();
    }
  }

  // =====================================================
  // MARK ONE NOTIFICATION AS READ
  // =====================================================

  async function handleMarkAsRead(
    notification: Notification
  ) {
    if (notification.is_read) {
      return;
    }

    try {
      await markNotificationAsRead(notification.id);

      setNotifications((previous) =>
        previous.map((item) =>
          item.id === notification.id
            ? {
                ...item,
                is_read: true,
              }
            : item
        )
      );

      setUnreadCount((previous) =>
        previous > 0 ? previous - 1 : 0
      );
    } catch (error) {
      console.error(
        "Failed to mark notification as read:",
        error
      );
    }
  }

  // =====================================================
  // MARK ALL AS READ
  // =====================================================

  async function handleMarkAllAsRead() {
    if (unreadCount === 0) {
      return;
    }

    try {
      await markAllNotificationsAsRead();

      setNotifications((previous) =>
        previous.map((notification) => ({
          ...notification,
          is_read: true,
        }))
      );

      setUnreadCount(0);
    } catch (error) {
      console.error(
        "Failed to mark all notifications as read:",
        error
      );
    }
  }

  // =====================================================
  // DELETE ONE NOTIFICATION
  // =====================================================

  async function handleDeleteNotification(
    notification: Notification
  ) {
    try {
      await deleteNotification(notification.id);

      setNotifications((previous) =>
        previous.filter(
          (item) => item.id !== notification.id
        )
      );

      if (!notification.is_read) {
        setUnreadCount((previous) =>
          previous > 0 ? previous - 1 : 0
        );
      }
    } catch (error) {
      console.error(
        "Failed to delete notification:",
        error
      );
    }
  }

  // =====================================================
  // DELETE ALL NOTIFICATIONS
  // =====================================================

  async function handleDeleteAllNotifications() {
    if (notifications.length === 0) {
      return;
    }

    try {
      await deleteAllNotifications();

      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      console.error(
        "Failed to delete notifications:",
        error
      );
    }
  }

  // =====================================================
  // NOTIFICATION ICON
  // =====================================================

  function getNotificationIcon(
    type: Notification["type"]
  ) {
    switch (type) {
      case "low_stock":
        return <AlertTriangle size={18} />;

      case "out_of_stock":
        return <Package size={18} />;

      case "sale":
        return <ShoppingCart size={18} />;

      case "restock":
        return <RefreshCw size={18} />;

      case "adjustment":
        return <Package size={18} />;

      case "user":
        return <UserPlus size={18} />;

      default:
        return <Bell size={18} />;
    }
  }

  // =====================================================
  // NOTIFICATION ICON BACKGROUND
  // =====================================================

  function getNotificationIconClass(
    type: Notification["type"]
  ) {
    switch (type) {
      case "low_stock":
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-950/40 dark:text-yellow-400";

      case "out_of_stock":
        return "bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400";

      case "sale":
        return "bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400";

      case "restock":
        return "bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400";

      case "adjustment":
        return "bg-purple-100 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400";

      case "user":
        return "bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400";

      default:
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300";
    }
  }

  // =====================================================
  // HEADER
  // =====================================================

  return (
    <header
      className="
        fixed
        left-4
        right-4
        top-4
        z-40
        flex
        h-[76px]
        items-center
        justify-between
        rounded-[28px]
        border
        border-[var(--border)]
        bg-[color:var(--surface)]
        px-4
        shadow-xl
        backdrop-blur-xl
        transition-all
        duration-300
        sm:px-5
        lg:left-[324px]
        lg:right-6
      "
    >
      {/* =====================================================
          LEFT SIDE
      ====================================================== */}

      <div className="flex min-w-0 items-center gap-3">
        {/* Mobile Menu */}

        <button
          type="button"
          onClick={handleMobileMenu}
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-2xl
            border
            border-[var(--border)]
            bg-[color:var(--background)]
            text-[color:var(--text)]
            transition-all
            duration-300
            hover:scale-105
            hover:bg-[color:var(--surface-hover)]
            lg:hidden
          "
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        {/* Search */}

        <div className="relative hidden md:block">
          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-[color:var(--text-muted)]
            "
          />

          <input
            type="text"
            placeholder="Search products, customers, suppliers..."
            className="
              h-12
              w-[300px]
              rounded-2xl
              border
              border-[var(--border)]
              bg-[color:var(--background)]
              pl-11
              pr-4
              text-sm
              text-[color:var(--text)]
              outline-none
              transition-all
              duration-300
              placeholder:text-[color:var(--text-muted)]
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-500/10
              lg:w-[390px]
            "
          />
        </div>
      </div>

      {/* =====================================================
          RIGHT SIDE
      ====================================================== */}

      <div className="flex items-center gap-2 sm:gap-3">
        {/* =================================================
            DATE
        ================================================== */}

        <div
          className="
            hidden
            h-12
            items-center
            gap-3
            rounded-2xl
            border
            border-[var(--border)]
            bg-[color:var(--background)]
            px-4
            xl:flex
          "
        >
          <CalendarDays
            size={17}
            className="text-blue-500"
          />

          <span className="text-sm font-medium text-[color:var(--text)]">
            {today}
          </span>
        </div>

        {/* =================================================
            THEME
        ================================================== */}

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            border
            border-[var(--border)]
            bg-[color:var(--background)]
            transition-all
            duration-300
            hover:scale-105
            hover:bg-[color:var(--surface-hover)]
          "
        >
          {theme === "dark" ? (
            <Sun
              size={19}
              className="text-yellow-400"
            />
          ) : (
            <Moon
              size={19}
              className="text-slate-600"
            />
          )}
        </button>

        {/* =================================================
            NOTIFICATIONS
        ================================================== */}

        <div className="relative">
          <button
            type="button"
            onClick={handleNotifications}
            aria-label="Notifications"
            className="
              relative
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              border-[var(--border)]
              bg-[color:var(--background)]
              transition-all
              duration-300
              hover:scale-105
              hover:bg-[color:var(--surface-hover)]
            "
          >
            <Bell
              size={19}
              className="text-[color:var(--text)]"
            />

            {unreadCount > 0 && (
              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  min-h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  px-1
                  text-[10px]
                  font-bold
                  text-white
                  ring-2
                  ring-[color:var(--surface)]
                "
              >
                {unreadCount > 99
                  ? "99+"
                  : unreadCount}
              </span>
            )}
          </button>

          {/* =================================================
              NOTIFICATION DROPDOWN
          ================================================== */}

          {notificationsOpen && (
            <div
              className="
                absolute
                right-0
                z-50
                mt-3
                w-[380px]
                max-w-[calc(100vw-2rem)]
                overflow-hidden
                rounded-[26px]
                border
                border-[var(--border)]
                bg-[color:var(--surface)]
                shadow-2xl
              "
            >
              {/* Dropdown Header */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-[var(--border)]
                  px-5
                  py-4
                "
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[color:var(--text)]">
                      Notifications
                    </h3>

                    {unreadCount > 0 && (
                      <span
                        className="
                          rounded-full
                          bg-red-100
                          px-2
                          py-0.5
                          text-[10px]
                          font-bold
                          text-red-600
                          dark:bg-red-950/40
                          dark:text-red-400
                        "
                      >
                        {unreadCount} new
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-xs text-[color:var(--text-muted)]">
                    Recent system alerts
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={handleMarkAllAsRead}
                      title="Mark all as read"
                      className="
                        rounded-lg
                        p-2
                        text-blue-600
                        transition
                        hover:bg-blue-50
                        dark:text-blue-400
                        dark:hover:bg-blue-950/30
                      "
                    >
                      <Check size={17} />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      setNotificationsOpen(false)
                    }
                    aria-label="Close notifications"
                    className="
                      rounded-lg
                      p-2
                      transition
                      hover:bg-[color:var(--surface-hover)]
                    "
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>

              {/* Notification Content */}

              <div className="max-h-[420px] overflow-y-auto">
                {loadingNotifications ? (
                  <div className="flex flex-col items-center justify-center px-5 py-12">
                    <div
                      className="
                        h-7
                        w-7
                        animate-spin
                        rounded-full
                        border-2
                        border-slate-200
                        border-t-blue-600
                      "
                    />

                    <p className="mt-3 text-sm text-[color:var(--text-muted)]">
                      Loading notifications...
                    </p>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
                    <div
                      className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-slate-100
                        text-slate-400
                        dark:bg-slate-800
                      "
                    >
                      <Bell size={24} />
                    </div>

                    <h4 className="mt-4 font-semibold text-[color:var(--text)]">
                      No notifications
                    </h4>

                    <p className="mt-1 max-w-[250px] text-xs leading-5 text-[color:var(--text-muted)]">
                      You're all caught up. New system
                      alerts will appear here.
                    </p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`
                        group
                        border-b
                        border-[var(--border)]
                        px-5
                        py-4
                        transition
                        hover:bg-[color:var(--surface-hover)]
                        ${
                          !notification.is_read
                            ? "bg-blue-50/40 dark:bg-blue-950/10"
                            : ""
                        }
                      `}
                    >
                      <div className="flex gap-3">
                        {/* Icon */}

                        <div
                          className={`
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            ${getNotificationIconClass(
                              notification.type
                            )}
                          `}
                        >
                          {getNotificationIcon(
                            notification.type
                          )}
                        </div>

                        {/* Content */}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleMarkAsRead(
                                  notification
                                )
                              }
                              className="text-left"
                            >
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-[color:var(--text)]">
                                  {notification.title}
                                </p>

                                {!notification.is_read && (
                                  <span className="h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                                )}
                              </div>

                              <p className="mt-1 text-xs leading-5 text-[color:var(--text-muted)]">
                                {notification.message}
                              </p>
                            </button>

                            {/* Delete */}

                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteNotification(
                                  notification
                                )
                              }
                              aria-label="Delete notification"
                              className="
                                shrink-0
                                rounded-lg
                                p-1.5
                                text-[color:var(--text-muted)]
                                opacity-0
                                transition
                                hover:bg-red-50
                                hover:text-red-500
                                group-hover:opacity-100
                                dark:hover:bg-red-950/30
                              "
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>

                          {/* Date */}

                          <p className="mt-2 text-[10px] text-[color:var(--text-muted)]">
                            {new Date(
                              notification.created_at
                            ).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}

              {notifications.length > 0 && (
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-t
                    border-[var(--border)]
                    px-5
                    py-3
                  "
                >
                  <button
                    type="button"
                    onClick={handleDeleteAllNotifications}
                    className="
                      flex
                      items-center
                      gap-2
                      text-xs
                      font-semibold
                      text-red-500
                      transition
                      hover:text-red-600
                    "
                  >
                    <Trash2 size={14} />
                    Clear all
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setNotificationsOpen(false);
                      navigate("/inventory");
                    }}
                    className="
                      text-xs
                      font-semibold
                      text-blue-600
                      transition
                      hover:text-blue-700
                      dark:text-blue-400
                    "
                  >
                    View Inventory
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* =================================================
            PROFILE
        ================================================== */}

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setOpenMenu((previous) => !previous);
              setNotificationsOpen(false);
            }}
            aria-label="Open profile menu"
            className="
              flex
              h-12
              items-center
              gap-2
              rounded-2xl
              border
              border-[var(--border)]
              bg-[color:var(--background)]
              px-2
              transition-all
              duration-300
              hover:shadow-lg
              sm:gap-3
              sm:px-3
            "
          >
            {/* Avatar */}

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                text-xs
                font-bold
                text-white
                shadow-lg
                sm:h-10
                sm:w-10
                sm:text-sm
              "
            >
              {initials}
            </div>

            {/* Name + Role */}

            <div className="hidden text-left lg:block">
              <h4 className="text-sm font-semibold text-[color:var(--text)]">
                {fullName}
              </h4>

              <p className="mt-0.5 text-xs text-[color:var(--text-muted)]">
                {role}
              </p>
            </div>

            {/* Arrow */}

            <ChevronDown
              size={17}
              className={`
                hidden
                text-[color:var(--text-muted)]
                transition-transform
                duration-300
                sm:block
                ${openMenu ? "rotate-180" : ""}
              `}
            />
          </button>

          {/* =================================================
              PROFILE DROPDOWN
          ================================================== */}

          {openMenu && (
            <div
              className="
                absolute
                right-0
                z-50
                mt-3
                w-72
                overflow-hidden
                rounded-[26px]
                border
                border-[var(--border)]
                bg-[color:var(--surface)]
                shadow-2xl
              "
            >
              {/* User Information */}

              <div className="border-b border-[var(--border)] p-5">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-gradient-to-r
                      from-blue-600
                      to-indigo-600
                      font-bold
                      text-white
                    "
                  >
                    {initials}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-[color:var(--text)]">
                      {fullName}
                    </h3>

                    <p className="mt-1 truncate text-sm text-[color:var(--text-muted)]">
                      {user?.email || "No email"}
                    </p>
                  </div>
                </div>
              </div>

              {/* My Profile */}

              <button
                type="button"
                onClick={handleProfile}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-5
                  py-4
                  text-left
                  transition
                  hover:bg-[color:var(--surface-hover)]
                "
              >
                <User size={18} />

                <span>My Profile</span>
              </button>

              {/* Settings */}

              <button
                type="button"
                onClick={handleSettings}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-5
                  py-4
                  text-left
                  transition
                  hover:bg-[color:var(--surface-hover)]
                "
              >
                <Settings
                  size={18}
                  className="text-[color:var(--text-muted)]"
                />

                <span>Settings</span>
              </button>

              {/* Theme */}

              <button
                type="button"
                onClick={toggleTheme}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-5
                  py-4
                  text-left
                  transition
                  hover:bg-[color:var(--surface-hover)]
                "
              >
                {theme === "dark" ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}

                <span>
                  {theme === "dark"
                    ? "Light Mode"
                    : "Dark Mode"}
                </span>
              </button>

              {/* Logout */}

              <button
                type="button"
                onClick={handleLogout}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  border-t
                  border-[var(--border)]
                  px-5
                  py-4
                  text-left
                  text-red-500
                  transition
                  hover:bg-red-50
                  dark:hover:bg-red-950/30
                "
              >
                <LogOut size={18} />

                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}