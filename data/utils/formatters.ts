import { UserSettings } from '../api/settings';

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatDate = (date: string | Date, format: string = 'MM/dd/yyyy'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(dateObj);
};

export const formatNumber = (number: number, options: Intl.NumberFormatOptions = {}): string => {
  return new Intl.NumberFormat('en-US', options).format(number);
};

export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
};

export const getFormattedValue = (value: number | string, type: 'currency' | 'number' | 'percentage', settings?: UserSettings): string => {
  if (typeof value === 'string') return value;

  switch (type) {
    case 'currency':
      return formatCurrency(value, settings?.currency);
    case 'number':
      return formatNumber(value);
    case 'percentage':
      return formatPercentage(value);
    default:
      return value.toString();
  }
}; 