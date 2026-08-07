import api from "@/lib/axios";

import type {
  Payment,
  CreatePaymentPayload,
} from "@/types/payment";

interface BackendPayment {
  ID: string;
  SaleID: string;
  Sale?: Payment["sale"];

  Amount: number;
  Method: Payment["method"];
  Status: Payment["status"];
  Reference: string;

  PaidAt: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string | null;
}

function normalizePayment(payment: BackendPayment): Payment {
  return {
    id: payment.ID,
    sale_id: payment.SaleID,
    sale: payment.Sale,

    amount: payment.Amount,
    method: payment.Method,
    status: payment.Status,
    reference: payment.Reference,

    paid_at: payment.PaidAt,
    created_at: payment.CreatedAt,
    updated_at: payment.UpdatedAt,
  };
}

export async function getPayments(): Promise<Payment[]> {
  const { data } = await api.get("/payments");

  return (data.data ?? []).map(normalizePayment);
}

export async function getPayment(
  id: string
): Promise<Payment> {
  const { data } = await api.get(`/payments/${id}`);

  return normalizePayment(data.data);
}

export async function createPayment(
  payload: CreatePaymentPayload
): Promise<Payment> {
  const { data } = await api.post("/payments", payload);

  return normalizePayment(data.data);
}

export async function deletePayment(id: string) {
  const { data } = await api.delete(`/payments/${id}`);

  return data;
}

export async function restorePayment(id: string) {
  const { data } = await api.put(
    `/payments/restore/${id}`
  );

  return data;
}

export async function permanentlyDeletePayment(
  id: string
) {
  const { data } = await api.delete(
    `/payments/permanent/${id}`
  );

  return data;
}

export async function getDeletedPayments(): Promise<
  Payment[]
> {
  const { data } = await api.get("/payments/deleted");

  return (data.data ?? []).map(normalizePayment);
}