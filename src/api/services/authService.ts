import api from "../config";

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
  // Login user
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<AuthResponse>("/users/login", credentials);
    if (response.data.success) {
      localStorage.setItem("token", response.data.data.token);
    }
    return response.data;
  },

  // Register user
  register: async (userData: RegisterData) => {
    const response = await api.post<AuthResponse>("/users/register", userData);
    if (response.data.success) {
      localStorage.setItem("token", response.data.data.token);
    }
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get<{ success: boolean; data: User }>(
      "/users/me"
    );
    return response.data;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  // Check if user is admin
  isAdmin: async () => {
    try {
      const { data } = await authService.getCurrentUser();
      return data.role === "admin";
    } catch {
      return false;
    }
  },
};
