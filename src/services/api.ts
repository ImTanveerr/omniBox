import axios from 'axios';
import { AuthRequest, AuthResponse, User } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  async register(data: AuthRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
        throw (error.response as any).data;
      }
      throw { success: false, message: 'Network error. Please try again.' };
    }
  },

  async login(data: AuthRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', data);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
        throw (error.response as any).data;
      }
      throw { success: false, message: 'Network error. Please try again.' };
    }
  },

  async getProfile(): Promise<{ success: boolean; user: User }> {
    try {
      const response = await api.get<{ success: boolean; user: User }>('/auth/profile');
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
        throw (error.response as any).data;
      }
      throw { success: false, message: 'Network error. Please try again.' };
    }
  },

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};

export const healthAPI = {
  async check(): Promise<{ status: string; message: string }> {
    try {
      const response = await api.get<{ status: string; message: string }>('/health');
      return response.data;
    } catch {
      throw new Error('Failed to connect to server');
    }
  }
};

export default api;