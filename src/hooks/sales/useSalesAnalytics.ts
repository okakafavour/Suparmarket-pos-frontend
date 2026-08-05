import { useQuery } from "@tanstack/react-query";

import { getSalesAnalytics } from "@/services/sales.service";

export function useSalesAnalytics() {
  return useQuery({
    queryKey: ["sales-analytics"],

    queryFn: getSalesAnalytics,

    staleTime: 1000 * 60 * 5,
  });
}