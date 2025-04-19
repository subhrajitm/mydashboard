import { useState, useEffect, useCallback } from 'react';
import { analyticsApi, AnalyticsFilters, FinancialMetrics, TrendData, CategoryBreakdown } from '../api/analytics';

export const useAnalytics = (initialFilters: AnalyticsFilters) => {
  const [metrics, setMetrics] = useState<FinancialMetrics | null>(null);
  const [revenueTrend, setRevenueTrend] = useState<TrendData[]>([]);
  const [expenseTrend, setExpenseTrend] = useState<TrendData[]>([]);
  const [categoryBreakdown, setCategoryBreakdown] = useState<CategoryBreakdown[]>([]);
  const [forecast, setForecast] = useState<TrendData[]>([]);
  const [anomalies, setAnomalies] = useState<Array<{
    date: string;
    value: number;
    expectedValue: number;
    deviation: number;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<AnalyticsFilters>(initialFilters);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const [
        metricsData,
        revenueData,
        expenseData,
        categoryData,
        forecastData,
        anomaliesData,
      ] = await Promise.all([
        analyticsApi.getFinancialMetrics(filters),
        analyticsApi.getRevenueTrend(filters),
        analyticsApi.getExpenseTrend(filters),
        analyticsApi.getCategoryBreakdown(filters),
        analyticsApi.getForecast(filters),
        analyticsApi.getAnomalies(filters),
      ]);

      setMetrics(metricsData);
      setRevenueTrend(revenueData);
      setExpenseTrend(expenseData);
      setCategoryBreakdown(categoryData);
      setForecast(forecastData);
      setAnomalies(anomaliesData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch analytics data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const updateFilters = (newFilters: Partial<AnalyticsFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const getTrendData = (type: 'revenue' | 'expense'): TrendData[] => {
    return type === 'revenue' ? revenueTrend : expenseTrend;
  };

  const getCategoryPercentage = (category: string): number => {
    const categoryData = categoryBreakdown.find(c => c.category === category);
    return categoryData?.percentage || 0;
  };

  return {
    metrics,
    revenueTrend,
    expenseTrend,
    categoryBreakdown,
    forecast,
    anomalies,
    loading,
    error,
    filters,
    updateFilters,
    getTrendData,
    getCategoryPercentage,
    refetch: fetchAnalytics,
  };
}; 