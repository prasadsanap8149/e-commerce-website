import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import { API_CONFIG } from "./featureToggle";

// Custom error class for API errors
export class ApiError extends Error {
  status: number;
  code: string;
  details?: Record<string, string>;

  constructor(message: string, status: number, code: string = "API_ERROR", details?: Record<string, string>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

// Error response type from backend
interface ErrorResponse {
  timestamp?: string;
  status?: number;
  error?: string;
  message?: string;
  details?: Record<string, string>;
}

// Helper to extract error message from various error formats
export const extractErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message;
  }
  
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    
    // Check for backend error response
    if (axiosError.response?.data) {
      const data = axiosError.response.data;
      if (data.message) {
        return data.message;
      }
      if (data.error) {
        return data.error;
      }
    }
    
    // Network errors
    if (axiosError.code === "ECONNABORTED") {
      return "Request timed out. Please try again.";
    }
    if (axiosError.code === "ERR_NETWORK" || !axiosError.response) {
      return "Unable to connect to server. Please check your internet connection.";
    }
    
    // HTTP status based messages
    switch (axiosError.response?.status) {
      case 400:
        return "Invalid request. Please check your input.";
      case 401:
        return "Please login to continue.";
      case 403:
        return "You do not have permission to perform this action.";
      case 404:
        return "The requested resource was not found.";
      case 409:
        return "This resource already exists.";
      case 422:
        return "Invalid data provided.";
      case 429:
        return "Too many requests. Please try again later.";
      case 500:
        return "An unexpected error occurred. Please try again later.";
      case 502:
      case 503:
        return "Service temporarily unavailable. Please try again later.";
      default:
        return axiosError.message || "An unexpected error occurred.";
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return "An unexpected error occurred.";
};

// Helper to extract field validation errors
export const extractFieldErrors = (error: unknown): Record<string, string> | null => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response?.data?.details) {
      return axiosError.response.data.details;
    }
  }
  return null;
};

class ApiClient {
  private client: AxiosInstance;
  private retryCount: number = 3;
  private retryDelay: number = 1000;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add request interceptor for auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError<ErrorResponse>) => {
        const originalRequest = error.config as any;
        
        // Handle 401 - Unauthorized
        if (error.response?.status === 401) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("authToken");
            // Only redirect if not already on login page
            if (!window.location.pathname.includes("/auth/login")) {
              window.location.href = "/auth/login";
            }
          }
          throw new ApiError("Please login to continue", 401, "UNAUTHORIZED");
        }
        
        // Handle network errors with retry
        if (
          !error.response && 
          originalRequest && 
          !originalRequest._retry && 
          originalRequest._retryCount < this.retryCount
        ) {
          originalRequest._retry = true;
          originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
          
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, this.retryDelay * originalRequest._retryCount));
          
          return this.client(originalRequest);
        }
        
        // Transform error for consistent handling
        const status = error.response?.status || 0;
        const message = extractErrorMessage(error);
        const details = error.response?.data?.details;
        
        throw new ApiError(message, status, error.code || "API_ERROR", details);
      }
    );
  }

  async get<T>(url: string, config?: any): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  async post<T>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  async put<T>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  async patch<T>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(url, data, config);
  }

  async delete<T>(url: string, config?: any): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }
}

export default new ApiClient();
