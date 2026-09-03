import { useQuery } from "@tanstack/react-query";

import { getSettings } from "@/services/settings.service";

export function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,

    // Settings should always stay fresh because
    // currency changes affect the whole application.
    staleTime: 0,

    // Automatically refresh settings when needed.
    refetchOnWindowFocus: true,
  });
}