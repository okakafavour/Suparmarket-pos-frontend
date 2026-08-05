import { useQuery } from "@tanstack/react-query";

import {
  getSales,
  type SalesQueryParams,
} from "@/services/sales.service";

export function useSales(params: SalesQueryParams = {}) {
  return useQuery({
    queryKey: ["sales", params],

    queryFn: () => getSales(params),

    staleTime: 1000 * 60 * 5,
  });
}