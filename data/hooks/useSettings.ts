import { useState, useEffect } from 'react';
import { settingsApi, UserSettings, ApplicationSettings } from '../api/settings';

export const useSettings = () => {
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [appSettings, setAppSettings] = useState<ApplicationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserSettings = async () => {
    try {
      const data = await settingsApi.getUserSettings();
      setUserSettings(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch user settings');
      console.error(err);
    }
  };

  const fetchAppSettings = async () => {
    try {
      const data = await settingsApi.getApplicationSettings();
      setAppSettings(data);
    } catch (err) {
      console.error('Failed to fetch application settings', err);
    }
  };

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      await Promise.all([fetchUserSettings(), fetchAppSettings()]);
      setLoading(false);
    };

    loadSettings();
  }, []);

  const updateUserSettings = async (settings: Partial<UserSettings>) => {
    try {
      const updatedSettings = await settingsApi.updateUserSettings(settings);
      setUserSettings(updatedSettings);
    } catch (err) {
      console.error('Failed to update user settings', err);
      throw err;
    }
  };

  const resetUserSettings = async () => {
    try {
      const defaultSettings = await settingsApi.resetUserSettings();
      setUserSettings(defaultSettings);
    } catch (err) {
      console.error('Failed to reset user settings', err);
      throw err;
    }
  };

  return {
    userSettings,
    appSettings,
    loading,
    error,
    updateUserSettings,
    resetUserSettings,
    refetch: () => {
      setLoading(true);
      return Promise.all([fetchUserSettings(), fetchAppSettings()]).finally(() => {
        setLoading(false);
      });
    },
  };
}; 