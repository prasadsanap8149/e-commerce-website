import apiClient from "@/config/apiClient";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  rating?: number;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
}

export const productService = {
  getProducts: async (filters?: ProductFilter) => {
    const response = await apiClient.get<{ data: Product[]; total: number }>("/products", {
      params: filters,
    });
    return response.data;
  },

  getProductById: async (id: string) => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  searchProducts: async (query: string) => {
    const response = await apiClient.get<Product[]>("/products/search", {
      params: { q: query },
    });
    return response.data;
  },

  getProductsByCategory: async (category: string) => {
    const response = await apiClient.get<Product[]>(`/products/category/${category}`);
    return response.data;
  },
};
