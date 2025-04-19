import { api, handleApiError } from './base';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  notificationTypes: {
    transactions: boolean;
    alerts: boolean;
    updates: boolean;
  };
}

export const notificationsApi = {
  getNotifications: async (): Promise<Notification[]> => {
    try {
      const response = await api.get<Notification[]>('/notifications');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  markAsRead: async (notificationId: string): Promise<void> => {
    try {
      await api.patch(`/notifications/${notificationId}/read`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  markAllAsRead: async (): Promise<void> => {
    try {
      await api.patch('/notifications/read-all');
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getPreferences: async (): Promise<NotificationPreferences> => {
    try {
      const response = await api.get<NotificationPreferences>('/notifications/preferences');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updatePreferences: async (preferences: Partial<NotificationPreferences>): Promise<NotificationPreferences> => {
    try {
      const response = await api.patch<NotificationPreferences>('/notifications/preferences', preferences);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
}; 