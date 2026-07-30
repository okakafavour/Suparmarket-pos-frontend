import { useQuery } from "@tanstack/react-query";

import {
  getProducts,
  type ProductParams,
} from "@/services/inventory.service";

export function useProducts(params: ProductParams = {}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    placeholderData: (previousData) => previousData,
  });
}