"use client";

import React, { useState, useEffect } from "react";
import { productService, Product } from "@/services/productService";
import { ProductList } from "@/components/product/ProductList";
import { Loader } from "@/components/common/Loader";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const data = await productService.getProducts();
      setProducts(Array.isArray(data) ? data : data.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      try {
        setIsLoading(true);
        const data = await productService.searchProducts(query);
        setProducts(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || "Search failed");
      } finally {
        setIsLoading(false);
      }
    } else {
      fetchProducts();
    }
  };

  const handleViewDetail = (id: string) => {
    // Navigate to product detail page
    window.location.href = `/products/${id}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Products</h1>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
        />
      </div>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      {isLoading ? (
        <Loader />
      ) : (
        <ProductList
          products={products}
          onViewDetail={handleViewDetail}
          isLoading={false}
        />
      )}
    </div>
  );
}
