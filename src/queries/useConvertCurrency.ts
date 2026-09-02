import { useMutation } from "@tanstack/react-query";

import currencyService from "@/services/currency.service";

export const useConvertCurrency = () => {
  return useMutation({
    mutationFn: currencyService.convert,
  });
};