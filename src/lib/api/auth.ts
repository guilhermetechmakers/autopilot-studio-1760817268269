import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const authApi = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    company: string;
    role: string;
  };
  token: string;
  refreshToken: string;
}

export interface SocialLoginRequest {
  provider: "google" | "github";
  code: string;
  state?: string;
}

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await authApi.post("/login", data);
    return response.data;
  },

  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await authApi.post("/signup", data);
    return response.data;
  },

  socialLogin: async (data: SocialLoginRequest): Promise<AuthResponse> => {
    const response = await authApi.post("/social", data);
    return response.data;
  },

  ssoLogin: async (ssoProvider: string): Promise<{ redirectUrl: string }> => {
    const response = await authApi.post("/sso", { provider: ssoProvider });
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<{ token: string }> => {
    const response = await authApi.post("/refresh", { refreshToken });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await authApi.post("/logout");
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
  },

  forgotPassword: async (email: string): Promise<void> => {
    await authApi.post("/forgot-password", { email });
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    await authApi.post("/reset-password", { token, password });
  },

  verifyEmail: async (token: string): Promise<void> => {
    await authApi.post("/verify-email", { token });
  },

  resendVerification: async (email: string): Promise<void> => {
    await authApi.post("/resend-verification", { email });
  },
};