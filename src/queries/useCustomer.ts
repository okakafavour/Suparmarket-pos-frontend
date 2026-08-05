import { useQuery } from "@tanstack/react-query";

import { getCustomer } from "@/services/customers.service";

export function useCustomer(id: string) {
  return useQuery({
    queryKey: ["customers", id],

    queryFn: () => getCustomer(id),

    enabled: !!id,
  });
}