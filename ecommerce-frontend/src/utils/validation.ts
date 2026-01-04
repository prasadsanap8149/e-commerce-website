/**
 * Common validation utilities for the e-commerce frontend
 */

// Email validation regex
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Phone validation regex - allows international formats
export const PHONE_REGEX = /^[+]?[0-9\-\s()]{7,20}$/;

// URL validation regex
export const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

/**
 * Validates an email address
 */
export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  return EMAIL_REGEX.test(email.trim());
};

/**
 * Validates a phone number
 */
export const isValidPhone = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return false;
  return PHONE_REGEX.test(phone.trim());
};

/**
 * Validates a URL
 */
export const isValidUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  return URL_REGEX.test(url.trim());
};

/**
 * Validates a price value
 */
export const isValidPrice = (price: number): boolean => {
  return typeof price === 'number' && !isNaN(price) && price >= 0 && price <= 999999.99;
};

/**
 * Validates a quantity value
 */
export const isValidQuantity = (quantity: number, max: number = 999999): boolean => {
  return typeof quantity === 'number' && !isNaN(quantity) && Number.isInteger(quantity) && quantity >= 0 && quantity <= max;
};

/**
 * Validates a string length
 */
export const isValidLength = (str: string, min: number, max: number): boolean => {
  if (!str || typeof str !== 'string') return false;
  const length = str.trim().length;
  return length >= min && length <= max;
};

/**
 * Sanitizes a string by removing potential XSS characters
 */
export const sanitizeString = (str: string): string => {
  if (!str || typeof str !== 'string') return '';
  return str
    .trim()
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/javascript:/gi, '');
};

/**
 * Sanitizes a phone number
 */
export const sanitizePhone = (phone: string): string => {
  if (!phone || typeof phone !== 'string') return '';
  return phone.trim().replace(/[^0-9+\-()\\s]/g, '');
};

/**
 * Sanitizes an email address
 */
export const sanitizeEmail = (email: string): string => {
  if (!email || typeof email !== 'string') return '';
  return email.trim().toLowerCase();
};

/**
 * Sanitizes a search query
 */
export const sanitizeSearchQuery = (query: string, maxLength: number = 200): string => {
  if (!query || typeof query !== 'string') return '';
  return query
    .trim()
    .replace(/[<>"';()&+]/g, '')
    .substring(0, maxLength);
};

/**
 * Formats a price for display
 */
export const formatPrice = (price: number): string => {
  if (typeof price !== 'number' || isNaN(price)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

/**
 * Safely parses a number from string
 */
export const parseNumber = (value: string | number, defaultValue: number = 0): number => {
  if (typeof value === 'number') {
    return isNaN(value) ? defaultValue : value;
  }
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Safely parses an integer from string
 */
export const parseInteger = (value: string | number, defaultValue: number = 0): number => {
  if (typeof value === 'number') {
    return isNaN(value) ? defaultValue : Math.floor(value);
  }
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Validates and returns a bounded number
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(max, Math.max(min, value));
};

/**
 * Checks if a value is empty (null, undefined, empty string, or empty array)
 */
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Validates a product ID
 */
export const isValidProductId = (id: string | number): boolean => {
  if (typeof id === 'number') {
    return Number.isInteger(id) && id > 0;
  }
  if (typeof id === 'string') {
    const trimmed = id.trim();
    return trimmed.length > 0 && trimmed.length <= 50;
  }
  return false;
};

/**
 * Creates a debounced version of a function
 */
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
};
