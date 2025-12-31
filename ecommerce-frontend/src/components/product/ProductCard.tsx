"use client";

import React from "react";
import { Product } from "@/services/productService";

interface ProductCardProps {
  product: Product;
  onViewDetail: (id: string) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetail,
  onAddToCart,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="bg-gray-200 h-48 flex items-center justify-center">
        <img
          src={product.image || "/images/placeholder.png"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-secondary">${product.price.toFixed(2)}</span>
          <span className="text-sm text-gray-500">Stock: {product.stock}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onViewDetail(product.id)}
            className="flex-1 bg-secondary text-white py-2 rounded hover:bg-blue-600 transition"
          >
            View Details
          </button>
          {onAddToCart && product.stock > 0 && (
            <button
              onClick={() => onAddToCart(product)}
              className="flex-1 bg-accent text-white py-2 rounded hover:bg-yellow-500 transition"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
