import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/inventory.service";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}