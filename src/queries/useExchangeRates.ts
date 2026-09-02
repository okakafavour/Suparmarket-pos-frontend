import { useQuery } from "@tanstack/react-query";

import currencyService from "@/services/currency.service";

export const useExchangeRates = () => {
  return useQuery({
    queryKey: ["exchange-rates"],
    queryFn: currencyService.getRates,
  });
};