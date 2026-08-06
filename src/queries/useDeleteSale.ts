import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteSale } from "@/services/sales.service";

export function useDeleteSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSale,

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
    },
  });
}