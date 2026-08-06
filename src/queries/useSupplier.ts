import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "@/services/supplier.service";

import type {
  CreateSupplierPayload,
  UpdateSupplierPayload,
  SupplierQueryParams,
} from "@/types/suppliers";

export function useSuppliers(
  params?: SupplierQueryParams
) {
  return useQuery({
    queryKey: ["suppliers", params],
    queryFn: () => getSuppliers(params),
  });
}

export function useCreateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSupplierPayload) =>
      createSupplier(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
  });
}

export function useUpdateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateSupplierPayload;
    }) => updateSupplier(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
  });
}

export function useDeleteSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      deleteSupplier(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
  });
}