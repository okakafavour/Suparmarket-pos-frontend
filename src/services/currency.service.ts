import api from "@/lib/axios";

import type {
  ConvertCurrencyRequest,
  ConvertCurrencyResponse,
  CreateExchangeRateRequest,
  ExchangeRate,
  FetchExchangeRateRequest,
  UpdateExchangeRateRequest,
} from "@/types/currency";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const currencyService = {
  // ============================================
  // GET ALL EXCHANGE RATES
  // ============================================

  async getRates(): Promise<ExchangeRate[]> {
    const response = await api.get<ApiResponse<ExchangeRate[]>>(
      "/currencies/rates",
    );

    return response.data.data;
  },

  // ============================================
  // GET RATE BY ID
  // ============================================

  async getRate(id: string): Promise<ExchangeRate> {
    const response = await api.get<ApiResponse<ExchangeRate>>(
      `/currencies/rates/${id}`,
    );

    return response.data.data;
  },

  // ============================================
  // CREATE MANUAL RATE
  // ============================================

  async createRate(
    data: CreateExchangeRateRequest,
  ): Promise<ExchangeRate> {
    const response = await api.post<ApiResponse<ExchangeRate>>(
      "/currencies/rates",
      data,
    );

    return response.data.data;
  },

  // ============================================
  // FETCH API RATE
  // ============================================

  async fetchRate(
    data: FetchExchangeRateRequest,
  ): Promise<ExchangeRate> {
    const response = await api.post<ApiResponse<ExchangeRate>>(
      "/currencies/rates/fetch",
      data,
    );

    return response.data.data;
  },

  // ============================================
  // CONVERT CURRENCY
  // ============================================

  async convert(
    data: ConvertCurrencyRequest,
  ): Promise<ConvertCurrencyResponse> {
    const response = await api.post<ApiResponse<ConvertCurrencyResponse>>(
      "/currencies/convert",
      data,
    );

    return response.data.data;
  },

  // ============================================
  // UPDATE RATE
  // ============================================

  async updateRate(
    id: string,
    data: UpdateExchangeRateRequest,
  ): Promise<ExchangeRate> {
    const response = await api.patch<ApiResponse<ExchangeRate>>(
      `/currencies/rates/${id}`,
      data,
    );

    return response.data.data;
  },

  // ============================================
  // DELETE RATE
  // ============================================

  async deleteRate(id: string): Promise<void> {
    await api.delete(`/currencies/rates/${id}`);
  },
};

export default currencyService;