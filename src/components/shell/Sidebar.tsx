import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Boxes,
  Package,
  ShoppingCart,
  Users,
  Truck,
  ClipboardList,
  // CreditCard,
  BarChart3,
  Shield,
  Settings,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

type UserRole = "admin" | "manager" | "cashier";

interface MenuItem {
  title: string;
  icon: typeof LayoutDashboard;
  path: string;
  roles: UserRole[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menu: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    roles: ["admin", "manager", "cashier"],
  },

  {
    title: "Inventory",
    icon: Boxes,
    path: "/inventory",
    roles: ["admin", "manager"],
  },

  {
    title: "Products",
    icon: Package,
    path: "/products",
    roles: ["admin", "manager", "cashier"],
  },

  {
    title: "Sales",
    icon: ShoppingCart,
    path: "/sales",
    roles: ["admin", "manager", "cashier"],
  },

  {
    title: "Customers",
    icon: Users,
    path: "/customers",
    roles: ["admin", "manager", "cashier"],
  },

  {
    title: "Suppliers",
    icon: Truck,
    path: "/suppliers",
    roles: ["admin", "manager"],
  },

  {
    title: "Purchases",
    icon: ClipboardList,
    path: "/purchases",
    roles: ["admin", "manager"],
  },

  // {
  //   title: "Payments",
  //   icon: CreditCard,
  //   path: "/payments",
  //   roles: ["admin", "manager", "cashier"],
  // },

  {
    title: "Reports",
    icon: BarChart3,
    path: "/reports",
    roles: ["admin", "manager"],
  },

  {
    title: "Users",
    icon: Shield,
    path: "/users",
    roles: ["admin"],
  },

  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
    roles: ["admin", "manager"],
  },
];

export default function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();

  // =====================================================
  // USER ROLE
  // =====================================================

  /*
    Normalize the role coming from the backend.

    Examples:
    "Admin"   -> "admin"
    "MANAGER" -> "manager"
    "Cashier" -> "cashier"
  */

  const rawRole = user?.role?.toLowerCase();

  const userRole: UserRole =
    rawRole === "admin" ||
    rawRole === "manager" ||
    rawRole === "cashier"
      ? rawRole
      : "cashier";

  // =====================================================
  // ROLE-BASED MENU
  // =====================================================

  /*
    Only show menu items allowed for the
    currently logged-in user's role.
  */

  const visibleMenu = menu.filter((item) =>
    item.roles.includes(userRole)
  );

  // =====================================================
  // USER INITIALS
  // =====================================================

  const initials = `${user?.first_name?.[0] ?? ""}${
    user?.last_name?.[0] ?? ""
  }`.toUpperCase();

  // =====================================================
  // ROLE LABEL
  // =====================================================

  const roleLabel =
    userRole.charAt(0).toUpperCase() +
    userRole.slice(1);

  // =====================================================
  // CLOSE SIDEBAR WHEN ROUTE CHANGES
  // =====================================================

  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  // =====================================================
  // SIDEBAR
  // =====================================================

  return (
    <aside
      className={`
        fixed
        left-0
        top-0
        z-50
        flex
        h-screen
        w-[288px]
        flex-col
        overflow-hidden
        rounded-r-[32px]
        border
        border-[color:var(--border)]
        bg-[color:var(--surface)]
        shadow-2xl
        transition-transform
        duration-300
        ease-out

        /* Desktop */
        lg:bottom-4
        lg:left-4
        lg:top-4
        lg:h-[calc(100vh-2rem)]
        lg:translate-x-0
        lg:rounded-[32px]
        lg:shadow-xl

        /* Mobile */
        ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
      `}
    >
      {/* =====================================================
          LOGO
      ====================================================== */}

      <div className="shrink-0 px-5 pt-5">
        <Logo />
      </div>

      {/* =====================================================
          NAVIGATION

          Only the navigation area scrolls.

          The scrollbar is intentionally very subtle:
          - Invisible normally
          - Appears slightly when hovering
          - Only 4px wide
      ====================================================== */}

      <nav
        className="
          mt-8
          min-h-0
          flex-1
          space-y-1.5
          overflow-y-auto
          px-4
          pb-3
          pr-2

          [scrollbar-width:thin]
          [scrollbar-color:transparent_transparent]
          hover:[scrollbar-color:var(--border)_transparent]

          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-transparent
          hover:[&::-webkit-scrollbar-thumb]:bg-[color:var(--border)]
        "
      >
        {visibleMenu.map((item) => (
          <div
            key={item.title}
            onClick={() => {
              // Close sidebar only on mobile/tablet
              if (window.innerWidth < 1024) {
                onClose();
              }
            }}
          >
            <SidebarItem
              title={item.title}
              icon={item.icon}
              path={item.path}
            />
          </div>
        ))}
      </nav>

      {/* =====================================================
          USER PROFILE CARD

          Remains fixed at the bottom.
      ====================================================== */}

      <div
        className="
          shrink-0
          px-4
          pb-4
          pt-2
        "
      >
        <div
          className="
            rounded-3xl
            border
            border-[color:var(--border)]
            bg-[color:var(--background)]
            p-3
            transition-all
            duration-200
          "
        >
          <div className="flex items-center gap-3">
            {/* Avatar */}

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-blue-600
                to-indigo-600
                text-sm
                font-bold
                text-white
                shadow-lg
              "
            >
              {initials || "A"}
            </div>

            {/* Name + Role */}

            <div className="min-w-0 flex-1">
              <h4
                className="
                  truncate
                  text-sm
                  font-semibold
                  text-[color:var(--text)]
                "
              >
                {user
                  ? `${user.first_name} ${user.last_name}`
                  : "Administrator"}
              </h4>

              <p
                className="
                  mt-0.5
                  truncate
                  text-xs
                  capitalize
                  text-[color:var(--text-muted)]
                "
              >
                {roleLabel}
              </p>
            </div>

            {/* Online indicator */}

            <span
              className="
                h-2.5
                w-2.5
                shrink-0
                rounded-full
                bg-emerald-500
                ring-4
                ring-emerald-500/10
              "
            />
          </div>
        </div>
      </div>
    </aside>
  );
}