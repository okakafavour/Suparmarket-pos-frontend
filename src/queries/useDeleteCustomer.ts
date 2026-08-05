import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCustomer } from "@/services/customers.service";

export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCustomer,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
  });
}