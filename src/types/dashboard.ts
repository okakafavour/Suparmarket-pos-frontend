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