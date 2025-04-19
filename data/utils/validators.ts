import { Transaction } from '../api/transactions';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateTransaction = (transaction: Partial<Transaction>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!transaction.amount || transaction.amount <= 0) {
    errors.push('Amount must be greater than 0');
  }
  if (!transaction.type) {
    errors.push('Transaction type is required');
  }
  if (!transaction.category) {
    errors.push('Category is required');
  }
  if (!transaction.date) {
    errors.push('Date is required');
  }
  if (!transaction.accountId) {
    errors.push('Account ID is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateDateRange = (startDate: string, endDate: string): { isValid: boolean; error?: string } => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return {
      isValid: false,
      error: 'Invalid date format',
    };
  }

  if (start > end) {
    return {
      isValid: false,
      error: 'Start date must be before end date',
    };
  }

  return { isValid: true };
};

export const validateCurrency = (currency: string): boolean => {
  const currencyRegex = /^[A-Z]{3}$/;
  return currencyRegex.test(currency);
};

export const validateAmount = (amount: number | string): { isValid: boolean; error?: string } => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(num)) {
    return {
      isValid: false,
      error: 'Invalid amount',
    };
  }

  if (num < 0) {
    return {
      isValid: false,
      error: 'Amount cannot be negative',
    };
  }

  return { isValid: true };
}; 