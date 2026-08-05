import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createSale } from "@/services/sales.service";

export function useCreateSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSale,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sales"],
      });

      queryClient.invalidateQueries({
        queryKey: ["sales-dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["sales-analytics"],
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}