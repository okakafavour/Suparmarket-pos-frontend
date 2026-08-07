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

  amount: number;

  method: PaymentMethod;

  status: PaymentStatus;

  reference: string;

  paid_at: string | null;

  created_at: string;

  updated_at: string;
}

export interface CreatePaymentPayload {
  sale_id: string;

  amount: number;

  method: PaymentMethod;

  reference?: string;
}