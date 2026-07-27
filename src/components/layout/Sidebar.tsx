import {
  LayoutDashboard,
  Package,
  Boxes,
  Users,
  Truck,
  ShoppingCart,
  Receipt,
  CreditCard,
  BarChart3,
  Shield,
  Settings,
  LogOut,
} from "lucide-react";

const menu = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
  },
  {
    icon: Package,
    title: "Products",
  },
  {
    icon: Boxes,
    title: "Inventory",
  },
  {
    icon: Users,
    title: "Customers",
  },
  {
    icon: Truck,
    title: "Suppliers",
  },
  {
    icon: ShoppingCart,
    title: "Sales",
  },
  {
    icon: Receipt,
    title: "Purchases",
  },
  {
    icon: CreditCard,
    title: "Payments",
  },
  {
    icon: BarChart3,
    title: "Reports",
  },
  {
    icon: Shield,
    title: "Users",
  },
  {
    icon: Settings,
    title: "Settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-72 flex-col bg-white border-r border-slate-200">

      {/* Logo */}

      <div className="h-20 border-b flex items-center px-8">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">
            TheftGuard
          </h1>

          <p className="text-sm text-slate-500">
            Smart Retail POS
          </p>
        </div>
      </div>

      {/* Navigation */}

      <nav className="flex-1 p-5 space-y-2">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.title}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}

      <div className="border-t p-5">

        <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-red-500 hover:bg-red-50 transition">

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}