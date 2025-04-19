import { useState, useEffect, useCallback } from 'react';
import { usersApi, User, UserProfile, CreateUserInput, UpdateUserInput } from '../api/users';
import { validateEmail, validatePassword } from '../utils/validators';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const usersData = await usersApi.getUsers();
      setUsers(usersData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = useCallback(async () => {
    try {
      // In a real app, you would get the current user's ID from your auth system
      const userId = 'current-user-id';
      const userData = await usersApi.getUser(userId);
      setCurrentUser(userData);
    } catch (err) {
      console.error('Failed to fetch current user', err);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchCurrentUser();
  }, [fetchUsers, fetchCurrentUser]);

  const createUser = async (user: CreateUserInput) => {
    if (!validateEmail(user.email)) {
      throw new Error('Invalid email address');
    }

    const passwordValidation = validatePassword(user.password);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.errors.join(', '));
    }

    try {
      const newUser = await usersApi.createUser(user);
      setUsers(prev => [...prev, newUser]);
      return newUser;
    } catch (err) {
      console.error('Failed to create user', err);
      throw err;
    }
  };

  const updateUser = async (id: string, user: UpdateUserInput) => {
    try {
      const updatedUser = await usersApi.updateUser(id, user);
      setUsers(prev =>
        prev.map(u => (u.id === id ? updatedUser : u))
      );
      if (currentUser?.id === id) {
        setCurrentUser(prev => prev ? { ...prev, ...updatedUser } : null);
      }
      return updatedUser;
    } catch (err) {
      console.error('Failed to update user', err);
      throw err;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await usersApi.deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      console.error('Failed to delete user', err);
      throw err;
    }
  };

  const updateUserPreferences = async (id: string, preferences: Partial<UserProfile['preferences']>) => {
    try {
      const updatedUser = await usersApi.updateUserPreferences(id, preferences);
      if (currentUser?.id === id) {
        setCurrentUser(prev => prev ? { ...prev, preferences: updatedUser.preferences } : null);
      }
      return updatedUser;
    } catch (err) {
      console.error('Failed to update user preferences', err);
      throw err;
    }
  };

  const updatePassword = async (id: string, currentPassword: string, newPassword: string) => {
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.errors.join(', '));
    }

    try {
      await usersApi.updatePassword(id, currentPassword, newPassword);
    } catch (err) {
      console.error('Failed to update password', err);
      throw err;
    }
  };

  const toggleTwoFactor = async (id: string, enable: boolean) => {
    try {
      await usersApi.toggleTwoFactor(id, enable);
      if (currentUser?.id === id) {
        setCurrentUser(prev =>
          prev
            ? {
                ...prev,
                security: {
                  ...prev.security,
                  twoFactorEnabled: enable,
                },
              }
            : null
        );
      }
    } catch (err) {
      console.error('Failed to toggle two-factor authentication', err);
      throw err;
    }
  };

  return {
    users,
    currentUser,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    updateUserPreferences,
    updatePassword,
    toggleTwoFactor,
    refetch: fetchUsers,
  };
}; 