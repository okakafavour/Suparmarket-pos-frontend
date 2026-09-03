import { useQuery } from "@tanstack/react-query";

import { getSalesDashboard } from "@/services/sales.service";

export function useSalesDashboard() {
  return useQuery({
    queryKey: ["sales-dashboard"],
    queryFn: getSalesDashboard,

    staleTime: 0,

    refetchOnWindowFocus: true,
  });
}