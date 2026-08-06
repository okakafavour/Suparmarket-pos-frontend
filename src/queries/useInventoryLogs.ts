    import { useQuery } from "@tanstack/react-query";
    import { getInventoryLogs } from "@/services/inventory.service";

    export function useInventoryLogs() {
    return useQuery({
        queryKey: ["inventory-logs"],
        queryFn: getInventoryLogs,
    });
    }