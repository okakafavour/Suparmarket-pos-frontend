import api from "@/lib/axios";

import type {
  Payment,
  CreatePaymentPayload,
} from "@/types/payment";

// =====================================
// BACKEND PAYMENT RESPONSE
// =====================================

interface BackendPayment {
  ID: string;
  SaleID: string;
  Sale?: Payment["sale"];

  Amount: number;

  Currency: string;

  BaseAmount: number;

  BaseCurrency: string;

  ExchangeRate: number;

  Method: Payment["method"];

  Status: Payment["status"];

  Reference: string;

  PaidAt: string | null;

  CreatedAt: string;

  UpdatedAt: string;

  DeletedAt?: string | null;
}

// =====================================
// NORMALIZE PAYMENT
// =====================================

function normalizePayment(
  payment: BackendPayment
): Payment {
  return {
    id: payment.ID,

    sale_id: payment.SaleID,

    sale: payment.Sale,

    amount: payment.Amount,

    currency: payment.Currency,

    base_amount: payment.BaseAmount,

    base_currency: payment.BaseCurrency,

    exchange_rate: payment.ExchangeRate,

    method: payment.Method,

    status: payment.Status,

    reference: payment.Reference,

    paid_at: payment.PaidAt,

    created_at: payment.CreatedAt,

    updated_at: payment.UpdatedAt,
  };
}

// =====================================
// GET ALL PAYMENTS
// =====================================

export async function getPayments(): Promise<
  Payment[]
> {
  const { data } = await api.get("/payments");

  return (data.data ?? []).map(
    normalizePayment
  );
}

// =====================================
// GET PAYMENT BY ID
// =====================================

export async function getPayment(
  id: string
): Promise<Payment> {
  const { data } = await api.get(
    `/payments/${id}`
  );

  return normalizePayment(data.data);
}

// =====================================
// CREATE PAYMENT
// =====================================

export async function createPayment(
  payload: CreatePaymentPayload
): Promise<Payment> {
  const { data } = await api.post(
    "/payments",
    payload
  );

  return normalizePayment(data.data);
}

// =====================================
// SOFT DELETE
// =====================================

export async function deletePayment(
  id: string
) {
  const { data } = await api.delete(
    `/payments/${id}`
  );

  return data;
}

// =====================================
// RESTORE PAYMENT
// =====================================

export async function restorePayment(
  id: string
) {
  const { data } = await api.put(
    `/payments/restore/${id}`
  );

  return data;
}

// =====================================
// PERMANENT DELETE
// =====================================

export async function permanentlyDeletePayment(
  id: string
) {
  const { data } = await api.delete(
    `/payments/permanent/${id}`
  );

  return data;
}

// =====================================
// GET DELETED PAYMENTS
// =====================================

export async function getDeletedPayments(): Promise<
  Payment[]
> {
  const { data } = await api.get(
    "/payments/deleted"
  );

  return (data.data ?? []).map(
    normalizePayment
  );
}