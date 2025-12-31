"use client";

import React from "react";
import { Product } from "@/services/productService";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  onViewDetail: (id: string) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  isLoading,
  onViewDetail,
  onAddToCart,
}) => {
  if (isLoading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-8 text-gray-500">No products found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onViewDetail={onViewDetail}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};
