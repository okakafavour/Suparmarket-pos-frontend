import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCustomer } from "@/services/customers.service";

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCustomer,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
  });
}