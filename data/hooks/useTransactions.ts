import { useState, useEffect, useCallback } from 'react';
import { transactionsApi, Transaction, TransactionFilters, TransactionSummary } from '../api/transactions';
import { validateTransaction } from '../utils/validators';

export const useTransactions = (initialFilters?: TransactionFilters) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<TransactionSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TransactionFilters>(initialFilters || {});

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const [transactionsData, summaryData] = await Promise.all([
        transactionsApi.getTransactions(filters),
        transactionsApi.getTransactionSummary(filters),
      ]);
      setTransactions(transactionsData);
      setSummary(summaryData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch transactions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const createTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    const validation = validateTransaction(transaction);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    try {
      const newTransaction = await transactionsApi.createTransaction(transaction);
      setTransactions(prev => [newTransaction, ...prev]);
      return newTransaction;
    } catch (err) {
      console.error('Failed to create transaction', err);
      throw err;
    }
  };

  const updateTransaction = async (id: string, transaction: Partial<Transaction>) => {
    try {
      const updatedTransaction = await transactionsApi.updateTransaction(id, transaction);
      setTransactions(prev =>
        prev.map(t => (t.id === id ? updatedTransaction : t))
      );
      return updatedTransaction;
    } catch (err) {
      console.error('Failed to update transaction', err);
      throw err;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await transactionsApi.deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Failed to delete transaction', err);
      throw err;
    }
  };

  const updateFilters = (newFilters: Partial<TransactionFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const exportTransactions = async () => {
    try {
      return await transactionsApi.exportTransactions(filters);
    } catch (err) {
      console.error('Failed to export transactions', err);
      throw err;
    }
  };

  return {
    transactions,
    summary,
    loading,
    error,
    filters,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    updateFilters,
    exportTransactions,
    refetch: fetchTransactions,
  };
}; 