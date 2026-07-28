import {
  LayoutDashboard,
  Boxes,
  Package,
  ShoppingCart,
  Users,
  Truck,
  ClipboardList,
  CreditCard,
  BarChart3,
  Shield,
  Settings,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

const menu = [
  { title: "Dashboard", icon: LayoutDashboard, active: true },
  { title: "Inventory", icon: Boxes },
  { title: "Products", icon: Package },
  { title: "Sales", icon: ShoppingCart },
  { title: "Customers", icon: Users },
  { title: "Suppliers", icon: Truck },
  { title: "Purchases", icon: ClipboardList },
  { title: "Payments", icon: CreditCard },
  { title: "Reports", icon: BarChart3 },
  { title: "Users", icon: Shield },
  { title: "Settings", icon: Settings },
];

export default function Sidebar() {
  const { user } = useAuth();

  const initials = `${user?.first_name?.[0] ?? ""}${
    user?.last_name?.[0] ?? ""
  }`.toUpperCase();

  return (
    <aside
      className="
        fixed
        left-5
        top-5
        bottom-5
        hidden
        w-72
        lg:block
      "
    >
      <div className="flex h-full flex-col rounded-[28px] bg-slate-950 p-6 shadow-2xl">

        <Logo />

        <nav className="mt-10 flex-1 space-y-2 overflow-y-auto pr-1">

          {menu.map((item) => (
            <SidebarItem
              key={item.title}
              title={item.title}
              icon={item.icon}
              active={item.active}
            />
          ))}

        </nav>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-white">

              {initials}

            </div>

            <div>

              <h4 className="font-semibold text-white">
                {user?.first_name} {user?.last_name}
              </h4>

              <p className="text-sm capitalize text-slate-400">
                {user?.role}
              </p>

            </div>

            <span className="ml-auto h-3 w-3 rounded-full bg-emerald-500" />

          </div>

        </div>

      </div>
    </aside>
  );
}