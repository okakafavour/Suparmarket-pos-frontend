import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCustomer } from "@/services/customers.service";

import type { UpdateCustomerPayload } from "@/types/customers";

interface UpdateCustomerInput {
  id: string;
  payload: UpdateCustomerPayload;
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: UpdateCustomerInput) =>
      updateCustomer(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });

      queryClient.invalidateQueries({
        queryKey: ["customers", variables.id],
      });
    },
  });
}