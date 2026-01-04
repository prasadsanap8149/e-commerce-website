"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { productService, Product } from "@/services/productService";
import { ProductList } from "@/components/product/ProductList";
import { Loader } from "@/components/common/Loader";
import { useCart } from "@/context/CartContext";

export default function ProductsPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await productService.getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      try {
        setIsLoading(true);
        setError("");
        const data = await productService.searchProducts(query);
        setProducts(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Search failed");
      } finally {
        setIsLoading(false);
      }
    } else {
      fetchProducts();
    }
  }, []);

  const handlePriceFilter = async () => {
    const minPrice = parseFloat(priceRange.min) || 0;
    const maxPrice = parseFloat(priceRange.max) || 99999;
    
    if (minPrice > maxPrice) {
      setError("Minimum price cannot be greater than maximum price");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      const data = await productService.getProductsByPriceRange(minPrice, maxPrice);
      setProducts(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Filter failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setPriceRange({ min: "", max: "" });
    fetchProducts();
  };

  const handleViewDetail = (id: string) => {
    router.push(`/products/${id}`);
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Products</h1>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-2">Search Products</label>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
            />
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium mb-2">Price Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
              />
              <span className="py-2">-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-end gap-2">
            <button
              onClick={handlePriceFilter}
              className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-blue-600 transition"
            >
              Apply Filter
            </button>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError("")} className="text-red-700 hover:text-red-900">
            ✕
          </button>
        </div>
      )}

      {/* Products Count */}
      {!isLoading && (
        <p className="mb-4 text-gray-600">
          Showing {products.length} product{products.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Products Grid */}
      {isLoading ? (
        <Loader message="Loading products..." />
      ) : (
        <ProductList
          products={products}
          onViewDetail={handleViewDetail}
          onAddToCart={handleAddToCart}
          isLoading={false}
        />
      )}
    </div>
  );
}
