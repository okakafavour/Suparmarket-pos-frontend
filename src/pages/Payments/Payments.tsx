import { useMemo, useState } from "react";

import DashboardLayout from "@/layouts/DashboardLayout";

import PaymentDetailsDialog from "@/components/payments/PaymentDetailsDialog";
import DeletePaymentDialog from "@/components/payments/DeletePaymentDialog";
import LoadingPayments from "@/components/payments/LoadingPayments";
import PaymentToolbar from "@/components/payments/PaymentToolbar";
import PaymentsHeader from "@/components/payments/PaymentsHeader";
import PaymentsTable from "@/components/payments/PaymentTable";

import {
  useDeletePayment,
  usePayments,
} from "@/queries/usePayments";

import type {
  Payment,
  PaymentMethod,
} from "@/types/payment";

export default function Payment() {
  const {
    data: payments = [],
    isLoading,
    isError,
    error,
  } = usePayments();

  const deletePayment = useDeletePayment();

  // ==========================
  // Filters
  // ==========================

  const [search, setSearch] = useState("");

  const [method, setMethod] =
    useState<PaymentMethod | "">("");

  const [status, setStatus] = useState("");

  // ==========================
  // Selected payment
  // ==========================

  const [selectedPayment, setSelectedPayment] =
    useState<Payment | null>(null);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  // ==========================
  // Filter payments
  // ==========================

  const filteredPayments = useMemo(() => {
    const query = search.toLowerCase().trim();

    return payments.filter((payment) => {
      const invoice =
        payment.sale?.InvoiceNumber?.toLowerCase() ?? "";

      const reference =
        payment.reference?.toLowerCase() ?? "";

      const matchesSearch =
        !query ||
        invoice.includes(query) ||
        reference.includes(query);

      const matchesMethod =
        !method || payment.method === method;

      const matchesStatus =
        !status || payment.status === status;

      return (
        matchesSearch &&
        matchesMethod &&
        matchesStatus
      );
    });
  }, [
    payments,
    search,
    method,
    status,
  ]);

  // ==========================
  // View payment
  // ==========================

  function handleView(payment: Payment) {
    setSelectedPayment(payment);
    setDetailsOpen(true);
  }

  // ==========================
  // Delete payment
  // ==========================

  function handleDelete(payment: Payment) {
    setSelectedPayment(payment);
    setDeleteOpen(true);
  }

  // ==========================
  // Confirm delete
  // ==========================

  async function handleConfirmDelete() {
    if (!selectedPayment) return;

    try {
      await deletePayment.mutateAsync(
        selectedPayment.id
      );

      setDeleteOpen(false);
      setSelectedPayment(null);
    } catch (error) {
      console.error(
        "Failed to delete payment:",
        error
      );
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* ==========================
            Header
        ========================== */}

        <PaymentsHeader
          total={payments.length}
        />

        {/* ==========================
            Toolbar
        ========================== */}

        <PaymentToolbar
          search={search}
          setSearch={setSearch}
          method={method}
          setMethod={setMethod}
          status={status}
          setStatus={setStatus}
        />

        {/* ==========================
            Content
        ========================== */}

        {isLoading ? (
          <LoadingPayments />
        ) : isError ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
            <p className="font-semibold">
              Failed to load payments
            </p>

            <p className="mt-1 text-sm">
              {error instanceof Error
                ? error.message
                : "Something went wrong."}
            </p>
          </div>
        ) : (
          <PaymentsTable
            payments={filteredPayments}
            onView={handleView}
            onDelete={handleDelete}
          />
        )}

        {/* ==========================
            Payment Details
        ========================== */}

        <PaymentDetailsDialog
          open={detailsOpen}
          payment={selectedPayment}
          onClose={() => {
            setDetailsOpen(false);
            setSelectedPayment(null);
          }}
        />

        {/* ==========================
            Delete Payment
        ========================== */}

        <DeletePaymentDialog
          open={deleteOpen}
          payment={selectedPayment}
          loading={deletePayment.isPending}
          onClose={() => {
            if (deletePayment.isPending) return;

            setDeleteOpen(false);
            setSelectedPayment(null);
          }}
          onConfirm={handleConfirmDelete}
        />

      </div>
    </DashboardLayout>
  );
}