export interface Settings {
  id: string;

  store_name: string;
  store_email: string;
  store_phone: string;
  store_address: string;

  currency: string;
  tax_rate: number;
  low_stock_threshold: number;

  timezone: string;

  receipt_header: string;
  receipt_footer: string;

  created_at: string;
  updated_at: string;
}

export interface UpdateSettingsPayload {
  store_name: string;
  store_email: string;
  store_phone: string;
  store_address: string;

  currency: string;
  tax_rate: number;
  low_stock_threshold: number;

  timezone: string;

  receipt_header: string;
  receipt_footer: string;
}