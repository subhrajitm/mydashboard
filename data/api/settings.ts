import { api, handleApiError } from './base';

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  currency: string;
  dateFormat: string;
  notifications: {
    email: boolean;
    push: boolean;
    frequency: 'instant' | 'daily' | 'weekly';
  };
}

export interface ApplicationSettings {
  maintenanceMode: boolean;
  version: string;
  features: {
    [key: string]: boolean;
  };
}

export const settingsApi = {
  getUserSettings: async (): Promise<UserSettings> => {
    try {
      const response = await api.get<UserSettings>('/settings/user');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updateUserSettings: async (settings: Partial<UserSettings>): Promise<UserSettings> => {
    try {
      const response = await api.patch<UserSettings>('/settings/user', settings);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getApplicationSettings: async (): Promise<ApplicationSettings> => {
    try {
      const response = await api.get<ApplicationSettings>('/settings/application');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  resetUserSettings: async (): Promise<UserSettings> => {
    try {
      const response = await api.post<UserSettings>('/settings/user/reset');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
}; 