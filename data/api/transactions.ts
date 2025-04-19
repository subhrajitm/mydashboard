import { api, handleApiError } from './base';

export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  category: string;
  description: string;
  date: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  accountId: string;
  tags?: string[];
  attachments?: string[];
}

export interface TransactionFilters {
  startDate?: string;
  endDate?: string;
  type?: Transaction['type'];
  category?: string;
  status?: Transaction['status'];
  minAmount?: number;
  maxAmount?: number;
  tags?: string[];
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpenses: number;
  netAmount: number;
  byCategory: {
    [category: string]: number;
  };
  byType: {
    [type: string]: number;
  };
}

export const transactionsApi = {
  getTransactions: async (filters?: TransactionFilters): Promise<Transaction[]> => {
    try {
      const response = await api.get<Transaction[]>('/transactions', { params: filters });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getTransaction: async (id: string): Promise<Transaction> => {
    try {
      const response = await api.get<Transaction>(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  createTransaction: async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
    try {
      const response = await api.post<Transaction>('/transactions', transaction);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updateTransaction: async (id: string, transaction: Partial<Transaction>): Promise<Transaction> => {
    try {
      const response = await api.patch<Transaction>(`/transactions/${id}`, transaction);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  deleteTransaction: async (id: string): Promise<void> => {
    try {
      await api.delete(`/transactions/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getTransactionSummary: async (filters?: TransactionFilters): Promise<TransactionSummary> => {
    try {
      const response = await api.get<TransactionSummary>('/transactions/summary', { params: filters });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  exportTransactions: async (filters?: TransactionFilters): Promise<Blob> => {
    try {
      const response = await api.get('/transactions/export', {
        params: filters,
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
}; 