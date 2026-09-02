import type { Sale } from "@/types/sales";

export type PaymentMethod =
  | "cash"
  | "card"
  | "transfer"
  | "mobile_money";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded";

export interface Payment {
  id: string;

  sale_id: string;

  sale?: Sale;

  // Amount customer actually paid
  amount: number;

  // Currency customer paid with
  currency: string;

  // Original sale amount
  base_amount: number;

  // Original sale currency
  base_currency: string;

  // Exchange rate used
  exchange_rate: number;

  method: PaymentMethod;

  status: PaymentStatus;

  reference: string;

  paid_at: string | null;

  created_at: string;

  updated_at: string;
}

export interface CreatePaymentPayload {
  sale_id: string;

  // Currency customer wants to pay with
  currency: string;

  method: PaymentMethod;

  reference?: string;
}