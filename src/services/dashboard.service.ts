import api from "@/lib/axios";

/* ===========================
   TYPES
=========================== */

export interface DashboardSummary {
  total_products: number;
  total_categories: number;
  total_suppliers: number;
  total_customers: number;
  total_sales: number;
  today_sales: number;
  total_revenue: number;
  today_revenue: number;
  low_stock_products: number;
}

export interface RevenuePoint {
  month: string;
  revenue: number;
}

export interface SalesPoint {
  day: string;
  sales: number;
}

export interface RecentSale {
  invoice_number: string;
  customer: string;
  cashier: string;
  amount: number;
  payment_method: string;
  status: string;
  created_at: string;
}

export interface TopProduct {
  product_id: string;
  product_name: string;
  quantity: number;
  revenue: number;
}

export interface LowStockProduct {
  product_id: string;
  product_name: string;
  quantity: number;
  minimum_stock: number;
  category: string;
  supplier: string;
}

/* ===========================
   API
=========================== */

export async function getDashboardSummary() {
  const { data } = await api.get("/dashboard/summary");
  return data.data as DashboardSummary;
}

export async function getRevenueChart() {
  const { data } = await api.get("/dashboard/revenue-chart");
  return data.data as RevenuePoint[];
}

export async function getSalesChart() {
  const { data } = await api.get("/dashboard/sales-chart");
  return data.data as SalesPoint[];
}

export async function getRecentSales() {
  const { data } = await api.get("/dashboard/recent-sales");
  return data.data as RecentSale[];
}

export async function getTopProducts() {
  const { data } = await api.get("/dashboard/top-products");
  return data.data as TopProduct[];
}

export async function getLowStockProducts() {
  const { data } = await api.get("/dashboard/low-stock");
  return data.data as LowStockProduct[];
}