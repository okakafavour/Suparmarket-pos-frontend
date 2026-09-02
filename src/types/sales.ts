// ==========================
// Pagination
// ==========================

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: Pagination;
}

// ==========================
// Product
// ==========================

export interface SaleProductCategory {
  ID: string;
  name: string;
  description: string;
}

export interface SaleProductSupplier {
  ID: string;
  Name: string;
  Email: string;
  Phone: string;
  Address: string;
  City: string;
  State: string;
  Country: string;
  IsActive: boolean;
}

export interface SaleProduct {
  ID: string;
  Name: string;
  Description: string;
  SKU: string;
  Barcode: string;

  CategoryID: string;
  Category: SaleProductCategory;

  SupplierID: string;
  Supplier: SaleProductSupplier;

  CostPrice: number;
  SellingPrice: number;
  Quantity: number;
  MinimumStock: number;

  ImageURL: string;

  IsActive: boolean;
}

// ==========================
// Sale Item
// ==========================

export interface SaleItem {
  id: string;

  sale_id: string;

  ProductID: string;

  Product: SaleProduct;

  Quantity: number;

  UnitPrice: number;

  Subtotal: number;
}

// ==========================
// Sale
// ==========================

export type PaymentMethod =
  | "cash"
  | "card"
  | "transfer"
  | "mobile_money";

export type SaleStatus =
  | "pending"
  | "paid";

export interface Sale {
  id: string;

  CreatedAt: string;

  UpdatedAt: string;

  DeletedAt: string | null;

  InvoiceNumber: string;

  CustomerName: string;

  Status: SaleStatus;

  TotalAmount: number;

  Discount: number;

  Tax: number;

  PaymentMethod: PaymentMethod;

  SoldBy: string;

  Items: SaleItem[];
}

// ==========================
// Dashboard
// ==========================

export interface SalesDashboard {
  total_sales: number;

  total_revenue: number;

  average_sale: number;

  pending_sales: number;

  paid_sales: number;

  todays_revenue: number;

  todays_sales: number;
  currency: string;
}

// ==========================
// Analytics
// ==========================

export interface SalesTrend {
  date: string;

  sales: number;

  revenue: number;
}

export interface PaymentSummary {
  method: string;

  count: number;

  amount: number;
}

export interface TopProduct {
  product_id: string;

  name: string;

  quantity: number;

  revenue: number;
}

export interface HourlySale {
  hour: number;

  sales: number;

  revenue: number;
}

export interface MonthlyRevenue {
  month: string;

  revenue: number;
}

export interface SalesAnalytics {
  sales_trend: SalesTrend[];

  payment_methods: PaymentSummary[];

  top_products: TopProduct[];

  hourly_sales: HourlySale[];

  monthly_revenue: MonthlyRevenue[];
}