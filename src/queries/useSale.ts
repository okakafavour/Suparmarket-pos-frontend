import { useQuery } from "@tanstack/react-query";

import { getSale } from "@/services/sales.service";

export function useSale(id?: string) {
  return useQuery({
    queryKey: ["sale", id],

    queryFn: () => getSale(id!),

    enabled: !!id,

    staleTime: 1000 * 60 * 5,
  });
}