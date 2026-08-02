import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  updateProduct,
  type CreateProductPayload,
} from "@/services/inventory.service";

interface UpdatePayload {
  id: string;
  payload: Partial<CreateProductPayload> & {
    is_active?: boolean;
  };
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdatePayload) =>
      updateProduct(id, payload),

    onSuccess: () => {
      toast.success("Product updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to update product"
      );
    },
  });
}