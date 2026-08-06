import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getPurchases,
  createPurchase,
  receivePurchase,
  deletePurchase,
} from "@/services/purchase.service";

import type {
  PurchaseQueryParams,
  CreatePurchasePayload,
} from "@/types/purchase";

export function usePurchases(
  params?: PurchaseQueryParams
) {
  return useQuery({
    queryKey: ["purchases", params],

    queryFn: () => getPurchases(params),
  });
}

export function useCreatePurchase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePurchasePayload) =>
      createPurchase(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["purchases"],
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}

export function useReceivePurchase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: receivePurchase,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["purchases"],
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["inventory"],
      });
    },
  });
}

export function useDeletePurchase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePurchase,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["purchases"],
      });
    },
  });
}