
import api from "../config";
import { supabase } from '../supabase';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  eventsRegistered: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

export const authService = {
  // Supabase auth methods
  async signUp(email: string, password: string) {
    return await supabase.auth.signUp({ email, password });
  },

  async signIn(email: string, password: string) {
    return await supabase.auth.signInWithPassword({ email, password });
  },

  async signOut() {
    return await supabase.auth.signOut();
  },

  // Legacy API methods
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<AuthResponse>("/users/login", credentials);
    if (response.data.success) {
      localStorage.setItem("token", response.data.data.token);
    }
    return response.data;
  },

  register: async (userData: RegisterData) => {
    const response = await api.post<AuthResponse>("/users/register", userData);
    if (response.data.success) {
      localStorage.setItem("token", response.data.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  },

  getCurrentUser: async () => {
    const response = await api.get<{ success: boolean; data: User }>("/users/me");
    return response.data;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  isAdmin: async () => {
    try {
      const { data } = await authService.getCurrentUser();
      return data.role === "admin";
    } catch {
      return false;
    }
  },
};
