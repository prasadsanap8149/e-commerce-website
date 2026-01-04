import apiClient, { extractErrorMessage, ApiError } from "@/config/apiClient";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId?: number;
  category?: string;
  image: string;
  stock: number;
  rating?: number;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
}

// Type guard for Product
const isValidProduct = (data: unknown): data is Product => {
  if (!data || typeof data !== "object") return false;
  const product = data as Product;
  return (
    typeof product.id !== "undefined" &&
    typeof product.name === "string" &&
    typeof product.price === "number"
  );
};

// Type guard for Product array
const isValidProductArray = (data: unknown): data is Product[] => {
  return Array.isArray(data) && (data.length === 0 || data.every(isValidProduct));
};

// Sanitize product data
const sanitizeProduct = (product: Product): Product => ({
  ...product,
  name: product.name?.trim() || "",
  description: product.description?.trim() || "",
  price: Math.max(0, product.price || 0),
  stock: Math.max(0, product.stock || 0),
  rating: product.rating ? Math.min(5, Math.max(0, product.rating)) : undefined,
  image: product.image?.trim() || "/placeholder.svg",
});

export const productService = {
  // Get all products
  getProducts: async (filters?: ProductFilter): Promise<Product[]> => {
    try {
      // Sanitize filters
      const sanitizedFilters = filters ? {
        ...filters,
        search: filters.search?.trim().substring(0, 200),
        minPrice: filters.minPrice !== undefined ? Math.max(0, filters.minPrice) : undefined,
        maxPrice: filters.maxPrice !== undefined ? Math.max(0, filters.maxPrice) : undefined,
        page: filters.page !== undefined ? Math.max(1, filters.page) : undefined,
        limit: filters.limit !== undefined ? Math.min(100, Math.max(1, filters.limit)) : undefined,
      } : undefined;

      const response = await apiClient.get<Product[]>("/products", {
        params: sanitizedFilters,
      });
      
      if (!isValidProductArray(response.data)) {
        console.warn("Invalid product data received from API");
        return [];
      }
      
      return response.data.map(sanitizeProduct);
    } catch (error) {
      console.error("Error fetching products:", extractErrorMessage(error));
      throw new ApiError(
        extractErrorMessage(error),
        error instanceof ApiError ? error.status : 500,
        "FETCH_PRODUCTS_ERROR"
      );
    }
  },

  // Get product by ID
  getProductById: async (id: string): Promise<Product> => {
    if (!id || id.trim() === "") {
      throw new ApiError("Product ID is required", 400, "INVALID_ID");
    }
    
    try {
      const response = await apiClient.get<Product>(`/products/${encodeURIComponent(id)}`);
      
      if (!isValidProduct(response.data)) {
        throw new ApiError("Invalid product data received", 500, "INVALID_DATA");
      }
      
      return sanitizeProduct(response.data);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(`Error fetching product ${id}:`, extractErrorMessage(error));
      throw new ApiError(
        extractErrorMessage(error),
        error instanceof ApiError ? error.status : 500,
        "FETCH_PRODUCT_ERROR"
      );
    }
  },

  // Search products
  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      // Sanitize and validate search query
      const sanitizedQuery = query?.trim().substring(0, 200) || "";
      
      if (sanitizedQuery.length === 0) {
        return productService.getProducts();
      }
      
      const response = await apiClient.get<Product[]>("/products/search", {
        params: { q: sanitizedQuery },
      });
      
      if (!isValidProductArray(response.data)) {
        console.warn("Invalid product data received from search API");
        return [];
      }
      
      return response.data.map(sanitizeProduct);
    } catch (error) {
      console.error("Error searching products:", extractErrorMessage(error));
      throw new ApiError(
        extractErrorMessage(error),
        error instanceof ApiError ? error.status : 500,
        "SEARCH_PRODUCTS_ERROR"
      );
    }
  },

  // Get products by category
  getProductsByCategory: async (categoryId: string): Promise<Product[]> => {
    if (!categoryId || categoryId.trim() === "") {
      throw new ApiError("Category ID is required", 400, "INVALID_CATEGORY_ID");
    }
    
    try {
      const response = await apiClient.get<Product[]>(
        `/products/category/${encodeURIComponent(categoryId)}`
      );
      
      if (!isValidProductArray(response.data)) {
        console.warn("Invalid product data received from category API");
        return [];
      }
      
      return response.data.map(sanitizeProduct);
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, extractErrorMessage(error));
      throw new ApiError(
        extractErrorMessage(error),
        error instanceof ApiError ? error.status : 500,
        "FETCH_CATEGORY_PRODUCTS_ERROR"
      );
    }
  },

  // Get products by price range
  getProductsByPriceRange: async (minPrice: number, maxPrice: number): Promise<Product[]> => {
    // Validate and sanitize price range
    let sanitizedMin = Math.max(0, minPrice || 0);
    let sanitizedMax = Math.max(0, maxPrice || Number.MAX_SAFE_INTEGER);
    
    // Swap if min > max
    if (sanitizedMin > sanitizedMax) {
      [sanitizedMin, sanitizedMax] = [sanitizedMax, sanitizedMin];
    }
    
    try {
      const response = await apiClient.get<Product[]>("/products/price-range", {
        params: { minPrice: sanitizedMin, maxPrice: sanitizedMax },
      });
      
      if (!isValidProductArray(response.data)) {
        console.warn("Invalid product data received from price range API");
        return [];
      }
      
      return response.data.map(sanitizeProduct);
    } catch (error) {
      console.error("Error fetching products by price range:", extractErrorMessage(error));
      throw new ApiError(
        extractErrorMessage(error),
        error instanceof ApiError ? error.status : 500,
        "FETCH_PRICE_RANGE_ERROR"
      );
    }
  },

  // Create a new product (admin)
  createProduct: async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    // Validate required fields
    if (!product.name?.trim()) {
      throw new ApiError("Product name is required", 400, "VALIDATION_ERROR");
    }
    if (product.price === undefined || product.price <= 0) {
      throw new ApiError("Product price must be greater than 0", 400, "VALIDATION_ERROR");
    }
    if (product.stock === undefined || product.stock < 0) {
      throw new ApiError("Product stock cannot be negative", 400, "VALIDATION_ERROR");
    }
    
    try {
      const sanitizedProduct = {
        ...product,
        name: product.name.trim(),
        description: product.description?.trim() || "",
        price: Math.max(0.01, product.price),
        stock: Math.max(0, product.stock),
      };
      
      const response = await apiClient.post<Product>("/products", sanitizedProduct);
      
      if (!isValidProduct(response.data)) {
        throw new ApiError("Invalid product data received", 500, "INVALID_DATA");
      }
      
      return sanitizeProduct(response.data);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error("Error creating product:", extractErrorMessage(error));
      throw new ApiError(
        extractErrorMessage(error),
        error instanceof ApiError ? error.status : 500,
        "CREATE_PRODUCT_ERROR"
      );
    }
  },

  // Update a product (admin)
  updateProduct: async (id: string, product: Partial<Product>): Promise<Product> => {
    if (!id || id.trim() === "") {
      throw new ApiError("Product ID is required", 400, "INVALID_ID");
    }
    
    try {
      const sanitizedProduct = {
        ...product,
        name: product.name?.trim(),
        description: product.description?.trim(),
        price: product.price !== undefined ? Math.max(0.01, product.price) : undefined,
        stock: product.stock !== undefined ? Math.max(0, product.stock) : undefined,
      };
      
      const response = await apiClient.put<Product>(
        `/products/${encodeURIComponent(id)}`,
        sanitizedProduct
      );
      
      if (!isValidProduct(response.data)) {
        throw new ApiError("Invalid product data received", 500, "INVALID_DATA");
      }
      
      return sanitizeProduct(response.data);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(`Error updating product ${id}:`, extractErrorMessage(error));
      throw new ApiError(
        extractErrorMessage(error),
        error instanceof ApiError ? error.status : 500,
        "UPDATE_PRODUCT_ERROR"
      );
    }
  },

  // Delete a product (admin)
  deleteProduct: async (id: string): Promise<void> => {
    if (!id || id.trim() === "") {
      throw new ApiError("Product ID is required", 400, "INVALID_ID");
    }
    
    try {
      await apiClient.delete(`/products/${encodeURIComponent(id)}`);
    } catch (error) {
      console.error(`Error deleting product ${id}:`, extractErrorMessage(error));
      throw new ApiError(
        extractErrorMessage(error),
        error instanceof ApiError ? error.status : 500,
        "DELETE_PRODUCT_ERROR"
      );
    }
  },
};
