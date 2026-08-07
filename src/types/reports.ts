export interface SalesSummary {
  total_sales: number;
  total_revenue: number;
}

export interface DailySalesReport {
  date: string;
  total_sales: number;
  total_revenue: number;
}

export interface MonthlySalesReport {
  month: string;
  year: number;
  total_sales: number;
  total_revenue: number;
}

export interface DateRangeReport {
  start_date: string;
  end_date: string;
  total_sales: number;
  total_revenue: number;
}

export interface LowStockReport {
  product_id: string;
  product_name: string;
  quantity: number;
  minimum_stock: number;
}

export interface TopProductReport {
  product_id: string;
  product_name: string;
  quantity_sold: number;
  revenue: number;
}