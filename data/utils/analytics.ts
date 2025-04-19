import { TrendData, CategoryBreakdown } from '../api/analytics';

export const calculateGrowthRate = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const calculateMovingAverage = (data: TrendData[], windowSize: number = 7): TrendData[] => {
  if (data.length < windowSize) return data;

  return data.map((point, index) => {
    if (index < windowSize - 1) return point;

    const window = data.slice(index - windowSize + 1, index + 1);
    const average = window.reduce((sum, item) => sum + item.value, 0) / windowSize;

    return {
      date: point.date,
      value: average,
    };
  });
};

export const detectAnomalies = (
  data: TrendData[],
  threshold: number = 2
): Array<{ date: string; value: number; expectedValue: number; deviation: number }> => {
  const movingAverage = calculateMovingAverage(data);
  const standardDeviation = calculateStandardDeviation(data.map(d => d.value));

  return data.map((point, index) => {
    const expectedValue = movingAverage[index].value;
    const deviation = Math.abs(point.value - expectedValue) / standardDeviation;

    return {
      date: point.date,
      value: point.value,
      expectedValue,
      deviation,
    };
  }).filter(item => item.deviation > threshold);
};

export const calculateStandardDeviation = (values: number[]): number => {
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const squaredDifferences = values.map(val => Math.pow(val - mean, 2));
  const variance = squaredDifferences.reduce((sum, val) => sum + val, 0) / values.length;
  return Math.sqrt(variance);
};

export const groupByCategory = (breakdown: CategoryBreakdown[]): {
  labels: string[];
  values: number[];
  percentages: number[];
} => {
  return {
    labels: breakdown.map(item => item.category),
    values: breakdown.map(item => item.amount),
    percentages: breakdown.map(item => item.percentage),
  };
};

export const calculateForecast = (
  historicalData: TrendData[],
  periods: number = 12
): TrendData[] => {
  if (historicalData.length < 2) return [];

  const lastDate = new Date(historicalData[historicalData.length - 1].date);
  const averageGrowth = calculateAverageGrowth(historicalData);

  return Array.from({ length: periods }, (_, i) => {
    const date = new Date(lastDate);
    date.setMonth(date.getMonth() + i + 1);

    const lastValue = historicalData[historicalData.length - 1].value;
    const forecastValue = lastValue * Math.pow(1 + averageGrowth / 100, i + 1);

    return {
      date: date.toISOString().split('T')[0],
      value: forecastValue,
    };
  });
};

const calculateAverageGrowth = (data: TrendData[]): number => {
  const growthRates: number[] = [];

  for (let i = 1; i < data.length; i++) {
    const growth = calculateGrowthRate(data[i].value, data[i - 1].value);
    growthRates.push(growth);
  }

  return growthRates.reduce((sum, rate) => sum + rate, 0) / growthRates.length;
};

export const formatTrendData = (data: TrendData[], format: 'daily' | 'weekly' | 'monthly' = 'daily'): TrendData[] => {
  if (format === 'daily') return data;

  const groupedData = new Map<string, number>();

  data.forEach(item => {
    const date = new Date(item.date);
    let key: string;

    if (format === 'weekly') {
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      key = weekStart.toISOString().split('T')[0];
    } else {
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    }

    const currentValue = groupedData.get(key) || 0;
    groupedData.set(key, currentValue + item.value);
  });

  return Array.from(groupedData.entries()).map(([date, value]) => ({
    date,
    value,
  }));
}; 