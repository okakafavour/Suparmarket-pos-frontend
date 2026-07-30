import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProduct } from "@/services/inventory.service";

interface UpdatePayload {
  id: string;
  payload: any;
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdatePayload) =>
      updateProduct(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}