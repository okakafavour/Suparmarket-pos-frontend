import { useQuery } from "@tanstack/react-query";

import { searchCustomers } from "@/services/customers.service";

export function useSearchCustomers(query: string) {
  return useQuery({
    queryKey: ["customers", "search", query],

    queryFn: () => searchCustomers(query),

    enabled: query.trim().length > 0,
  });
}