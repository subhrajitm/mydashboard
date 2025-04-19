import { api, handleApiError } from './base';

export interface DashboardMetrics {
  totalRevenue: number;
  activeUsers: number;
  pendingOrders: number;
  recentTransactions: Array<{
    id: string;
    amount: number;
    date: string;
    status: string;
  }>;
}

export const dashboardApi = {
  getMetrics: async (): Promise<DashboardMetrics> => {
    try {
      const response = await api.get<DashboardMetrics>('/dashboard/metrics');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getRecentTransactions: async (limit: number = 5) => {
    try {
      const response = await api.get(`/dashboard/transactions?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getRevenueData: async (period: 'day' | 'week' | 'month' = 'month') => {
    try {
      const response = await api.get(`/dashboard/revenue?period=${period}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
}; 