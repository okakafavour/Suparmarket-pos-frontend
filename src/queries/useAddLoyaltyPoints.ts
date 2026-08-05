import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addLoyaltyPoints } from "@/services/customers.service";

interface LoyaltyInput {
  id: string;
  points: number;
}

export function useAddLoyaltyPoints() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, points }: LoyaltyInput) =>
      addLoyaltyPoints(id, points),

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