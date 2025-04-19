import { api, handleApiError } from './base';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user' | 'viewer';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  preferences: {
    language: string;
    timezone: string;
    notifications: {
      email: boolean;
      push: boolean;
    };
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
  };
}

export interface CreateUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: User['role'];
}

export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  role?: User['role'];
  status?: User['status'];
}

export const usersApi = {
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await api.get<User[]>('/users');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getUser: async (id: string): Promise<UserProfile> => {
    try {
      const response = await api.get<UserProfile>(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  createUser: async (user: CreateUserInput): Promise<User> => {
    try {
      const response = await api.post<User>('/users', user);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updateUser: async (id: string, user: UpdateUserInput): Promise<User> => {
    try {
      const response = await api.patch<User>(`/users/${id}`, user);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  deleteUser: async (id: string): Promise<void> => {
    try {
      await api.delete(`/users/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updateUserPreferences: async (id: string, preferences: Partial<UserProfile['preferences']>): Promise<UserProfile> => {
    try {
      const response = await api.patch<UserProfile>(`/users/${id}/preferences`, preferences);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updatePassword: async (id: string, currentPassword: string, newPassword: string): Promise<void> => {
    try {
      await api.post(`/users/${id}/password`, { currentPassword, newPassword });
    } catch (error) {
      throw handleApiError(error);
    }
  },

  toggleTwoFactor: async (id: string, enable: boolean): Promise<void> => {
    try {
      await api.post(`/users/${id}/two-factor`, { enable });
    } catch (error) {
      throw handleApiError(error);
    }
  },
}; 