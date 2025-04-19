import { api, handleApiError } from './base';

export interface TimeRange {
  startDate: string;
  endDate: string;
}

export interface FinancialMetrics {
  totalRevenue: number;
  totalExpenses: number;
  netIncome: number;
  profitMargin: number;
  averageTransactionValue: number;
  transactionCount: number;
}

export interface TrendData {
  date: string;
  value: number;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

export interface AnalyticsFilters extends TimeRange {
  accountId?: string;
  category?: string;
  type?: 'income' | 'expense';
}

export const analyticsApi = {
  getFinancialMetrics: async (filters: AnalyticsFilters): Promise<FinancialMetrics> => {
    try {
      const response = await api.get<FinancialMetrics>('/analytics/metrics', { params: filters });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getRevenueTrend: async (filters: AnalyticsFilters): Promise<TrendData[]> => {
    try {
      const response = await api.get<TrendData[]>('/analytics/revenue-trend', { params: filters });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getExpenseTrend: async (filters: AnalyticsFilters): Promise<TrendData[]> => {
    try {
      const response = await api.get<TrendData[]>('/analytics/expense-trend', { params: filters });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getCategoryBreakdown: async (filters: AnalyticsFilters): Promise<CategoryBreakdown[]> => {
    try {
      const response = await api.get<CategoryBreakdown[]>('/analytics/category-breakdown', { params: filters });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getForecast: async (filters: AnalyticsFilters): Promise<TrendData[]> => {
    try {
      const response = await api.get<TrendData[]>('/analytics/forecast', { params: filters });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getAnomalies: async (filters: AnalyticsFilters): Promise<{
    date: string;
    value: number;
    expectedValue: number;
    deviation: number;
  }[]> => {
    try {
      const response = await api.get('/analytics/anomalies', { params: filters });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
}; 