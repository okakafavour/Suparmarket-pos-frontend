import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getPayments,
  getPayment,
  createPayment,
  deletePayment,
  restorePayment,
  permanentlyDeletePayment,
  getDeletedPayments,
} from "@/services/payment.service";

import type { CreatePaymentPayload } from "@/types/payment";

export function usePayments() {
  return useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
  });
}

export function usePayment(id: string) {
  return useQuery({
    queryKey: ["payments", id],
    queryFn: () => getPayment(id),
    enabled: !!id,
  });
}

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePaymentPayload) =>
      createPayment(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["sales"],
      });
    },
  });
}

export function useDeletePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePayment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
    },
  });
}

export function useRestorePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restorePayment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
    },
  });
}

export function usePermanentlyDeletePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: permanentlyDeletePayment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
    },
  });
}

export function useDeletedPayments() {
  return useQuery({
    queryKey: ["payments", "deleted"],
    queryFn: getDeletedPayments,
  });
}