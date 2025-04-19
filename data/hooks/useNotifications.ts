import { useState, useEffect } from 'react';
import { notificationsApi, Notification, NotificationPreferences } from '../api/notifications';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await notificationsApi.getNotifications();
      setNotifications(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch notifications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPreferences = async () => {
    try {
      const data = await notificationsApi.getPreferences();
      setPreferences(data);
    } catch (err) {
      console.error('Failed to fetch notification preferences', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchPreferences();
  }, []);

  const markAsRead = async (notificationId: string) => {
    try {
      await notificationsApi.markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (err) {
      console.error('Failed to mark notification as read', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationsApi.markAllAsRead();
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, read: true }))
      );
    } catch (err) {
      console.error('Failed to mark all notifications as read', err);
    }
  };

  const updatePreferences = async (newPreferences: Partial<NotificationPreferences>) => {
    try {
      const updatedPreferences = await notificationsApi.updatePreferences(newPreferences);
      setPreferences(updatedPreferences);
    } catch (err) {
      console.error('Failed to update notification preferences', err);
    }
  };

  return {
    notifications,
    preferences,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    updatePreferences,
    refetch: fetchNotifications,
  };
}; 