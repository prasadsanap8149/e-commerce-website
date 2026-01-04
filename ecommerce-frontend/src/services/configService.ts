import apiClient from "@/config/apiClient";

export interface FeatureConfig {
  authEnabled: boolean;
  paymentEnabled: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
  storageEnabled: boolean;
}

export interface HealthStatus {
  status: string;
  service: string;
  timestamp: string;
  version: string;
}

export interface AppInfo {
  name: string;
  version: string;
  description: string;
  features: Record<string, boolean>;
}

export const configService = {
  // Get feature toggles from backend
  getFeatures: async (): Promise<FeatureConfig> => {
    try {
      const response = await apiClient.get<FeatureConfig>("/config/features");
      return response.data;
    } catch (error) {
      console.error("Error fetching features:", error);
      // Return default disabled features on error
      return {
        authEnabled: false,
        paymentEnabled: false,
        emailEnabled: false,
        smsEnabled: false,
        storageEnabled: false,
      };
    }
  },

  // Health check
  getHealth: async (): Promise<HealthStatus> => {
    try {
      const response = await apiClient.get<HealthStatus>("/config/health");
      return response.data;
    } catch (error) {
      console.error("Error checking health:", error);
      throw error;
    }
  },

  // Get app info
  getAppInfo: async (): Promise<AppInfo> => {
    try {
      const response = await apiClient.get<AppInfo>("/config/info");
      return response.data;
    } catch (error) {
      console.error("Error fetching app info:", error);
      throw error;
    }
  },
};
