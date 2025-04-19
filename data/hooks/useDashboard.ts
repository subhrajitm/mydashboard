import { useState, useEffect } from 'react';
import { dashboardApi, DashboardMetrics } from '../api/dashboard';

export const useDashboard = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const data = await dashboardApi.getMetrics();
      setMetrics(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch dashboard metrics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const refetch = () => {
    fetchMetrics();
  };

  return {
    metrics,
    loading,
    error,
    refetch,
  };
}; 