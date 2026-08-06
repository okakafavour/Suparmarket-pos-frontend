import { useQuery } from "@tanstack/react-query";

import { getCustomerDashboard } from "@/services/customers.service";

export function useCustomerDashboard() {
  return useQuery({
    queryKey: ["customer-dashboard"],
    queryFn: getCustomerDashboard,
  });
}