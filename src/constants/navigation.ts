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

export const navigation = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Inventory",
    icon: Boxes,
    path: "/inventory",
  },
  {
    title: "Products",
    icon: Package,
    path: "/products",
  },
  {
    title: "Sales",
    icon: ShoppingCart,
    path: "/sales",
  },
  {
    title: "Customers",
    icon: Users,
    path: "/customers",
  },
  {
    title: "Suppliers",
    icon: Truck,
    path: "/suppliers",
  },
  {
    title: "Purchases",
    icon: ClipboardList,
    path: "/purchases",
  },
  {
    title: "Payments",
    icon: CreditCard,
    path: "/payments",
  },
  {
    title: "Reports",
    icon: BarChart3,
    path: "/reports",
  },
  {
    title: "Users",
    icon: Shield,
    path: "/users",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];