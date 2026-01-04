import apiClient, { extractErrorMessage, ApiError } from "@/config/apiClient";

export interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Type guard for Category
const isValidCategory = (data: unknown): data is Category => {
  if (!data || typeof data !== "object") return false;
  const category = data as Category;
  return (
    typeof category.id === "number" &&
    typeof category.name === "string"
  );
};

// Type guard for Category array
const isValidCategoryArray = (data: unknown): data is Category[] => {
  return Array.isArray(data) && (data.length === 0 || data.every(isValidCategory));
};

// Sanitize category data
const sanitizeCategory = (category: Category): Category => ({
  ...category,
  name: category.name?.trim() || "",
  description: category.description?.trim() || undefined,
  image: category.image?.trim() || undefined,
});

export const categoryService = {
  // Get all categories
  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await apiClient.get<Category[]>("/categories");
      
      if (!isValidCategoryArray(response.data)) {
        console.warn("Invalid category data received from API");
        return [];
      }
      
      return response.data.map(sanitizeCategory);
    } catch (error) {
      console.error("Error fetching categories:", extractErrorMessage(error));
      throw new ApiError(
        extractErrorMessage(error),
        error instanceof ApiError ? error.status : 500,
        "FETCH_CATEGORIES_ERROR"
      );
    }
  },

  // Get category by ID
  getCategoryById: async (id: number): Promise<Category> => {
    if (!id || id <= 0) {
      throw new ApiError("Category ID must be a positive number", 400, "INVALID_ID");
    }
    
    try {
      const response = await apiClient.get<Category>(`/categories/${encodeURIComponent(id)}`);
      
      if (!isValidCategory(response.data)) {
        throw new ApiError("Invalid category data received", 500, "INVALID_DATA");
      }
      
      return sanitizeCategory(response.data);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(`Error fetching category ${id}:`, extractErrorMessage(error));
      throw new ApiError(
        extractErrorMessage(error),
        error instanceof ApiError ? error.status : 500,
        "FETCH_CATEGORY_ERROR"
      );
    }
  },

  // Create a new category (admin)
  createCategory: async (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> => {
    // Validate required fields
    if (!category.name?.trim()) {
      throw new ApiError("Category name is required", 400, "VALIDATION_ERROR");
    }
    if (category.name.trim().length > 100) {
      throw new ApiError("Category name must be less than 100 characters", 400, "VALIDATION_ERROR");
    }
    
    try {
      const sanitizedCategory = {
        ...category,
        name: category.name.trim(),
        description: category.description?.trim() || undefined,
        image: category.image?.trim() || undefined,
      };
      
      const response = await apiClient.post<Category>("/categories", sanitizedCategory);
      
      if (!isValidCategory(response.data)) {
        throw new ApiError("Invalid category data received", 500, "INVALID_DATA");
      }
      
      return sanitizeCategory(response.data);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error("Error creating category:", extractErrorMessage(error));
      throw new ApiError(
        extractErrorMessage(error),
        error instanceof ApiError ? error.status : 500,
        "CREATE_CATEGORY_ERROR"
      );
    }
  },

  // Update a category (admin)
  updateCategory: async (id: number, category: Partial<Category>): Promise<Category> => {
    if (!id || id <= 0) {
      throw new ApiError("Category ID must be a positive number", 400, "INVALID_ID");
    }
    
    // Validate name if provided
    if (category.name !== undefined && !category.name.trim()) {
      throw new ApiError("Category name cannot be empty", 400, "VALIDATION_ERROR");
    }
    if (category.name && category.name.trim().length > 100) {
      throw new ApiError("Category name must be less than 100 characters", 400, "VALIDATION_ERROR");
    }
    
    try {
      const sanitizedCategory = {
        ...category,
        name: category.name?.trim(),
        description: category.description?.trim(),
        image: category.image?.trim(),
      };
      
      const response = await apiClient.put<Category>(
        `/categories/${encodeURIComponent(id)}`,
        sanitizedCategory
      );
      
      if (!isValidCategory(response.data)) {
        throw new ApiError("Invalid category data received", 500, "INVALID_DATA");
      }
      
      return sanitizeCategory(response.data);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error(`Error updating category ${id}:`, extractErrorMessage(error));
      throw new ApiError(
        extractErrorMessage(error),
        error instanceof ApiError ? error.status : 500,
        "UPDATE_CATEGORY_ERROR"
      );
    }
  },

  // Delete a category (admin)
  deleteCategory: async (id: number): Promise<void> => {
    if (!id || id <= 0) {
      throw new ApiError("Category ID must be a positive number", 400, "INVALID_ID");
    }
    
    try {
      await apiClient.delete(`/categories/${encodeURIComponent(id)}`);
    } catch (error) {
      console.error(`Error deleting category ${id}:`, extractErrorMessage(error));
      throw new ApiError(
        extractErrorMessage(error),
        error instanceof ApiError ? error.status : 500,
        "DELETE_CATEGORY_ERROR"
      );
    }
  },
};
