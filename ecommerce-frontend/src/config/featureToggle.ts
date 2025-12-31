// Feature toggle configuration based on environment variables
export const FEATURES = {
  AUTH: process.env.NEXT_PUBLIC_AUTH === "true",
  PAYMENT: process.env.NEXT_PUBLIC_PAYMENT === "true",
  EMAIL: process.env.NEXT_PUBLIC_EMAIL === "true",
  SMS: process.env.NEXT_PUBLIC_SMS === "true",
} as const;

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
} as const;

// Application modes
export enum AppMode {
  CATALOG = "catalog", // Read-only product catalog
  COMMERCE = "commerce", // Full shopping capabilities
  ENTERPRISE = "enterprise", // All features enabled
}

// Determine app mode based on enabled features
export const getAppMode = (): AppMode => {
  if (FEATURES.PAYMENT && FEATURES.AUTH && FEATURES.EMAIL) {
    return AppMode.ENTERPRISE;
  }
  if (FEATURES.AUTH && FEATURES.PAYMENT) {
    return AppMode.COMMERCE;
  }
  return AppMode.CATALOG;
};
