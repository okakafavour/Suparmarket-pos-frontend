export interface SupportedCurrency {
  code: string;
  name: string;
  symbol: string;
}

export const supportedCurrencies: SupportedCurrency[] = [
  {
    code: "NGN",
    name: "Nigerian Naira",
    symbol: "₦",
  },
  {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
  },
  {
    code: "KES",
    name: "Kenyan Shilling",
    symbol: "KSh",
  },
  {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
  },
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
  },
  {
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "C$",
  },
  {
    code: "AUD",
    name: "Australian Dollar",
    symbol: "A$",
  },
  {
    code: "ZAR",
    name: "South African Rand",
    symbol: "R",
  },
];

export function getCurrency(
  code: string
): SupportedCurrency | undefined {
  return supportedCurrencies.find(
    (currency) =>
      currency.code === code.toUpperCase()
  );
}

export function getCurrencyName(
  code: string
): string {
  return (
    getCurrency(code)?.name ?? code
  );
}

export function getCurrencySymbol(
  code: string
): string {
  return (
    getCurrency(code)?.symbol ?? code
  );
}

export function formatCurrency(
  amount: number,
  currency: string
): string {
  return `${getCurrencySymbol(
    currency
  )}${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}