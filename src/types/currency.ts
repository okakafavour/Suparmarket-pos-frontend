export type RateSource = "manual" | "api";

export interface ExchangeRate {
  id: string;
  created_at: string;
  updated_at: string;

  from_currency: string;
  to_currency: string;

  rate: number;

  source: RateSource;

  is_active: boolean;

  fetched_at?: string | null;
}

export interface CreateExchangeRateRequest {
  from_currency: string;
  to_currency: string;
  rate: number;
}

export interface UpdateExchangeRateRequest {
  rate?: number;
  is_active?: boolean;
}

export interface FetchExchangeRateRequest {
  from_currency: string;
  to_currency: string;
}

export interface ConvertCurrencyRequest {
  amount: number;
  from_currency: string;
  to_currency: string;
}

export interface ConvertCurrencyResponse {
  original_amount: number;
  converted_amount: number;
  from_currency: string;
  to_currency: string;
  rate: number;
}