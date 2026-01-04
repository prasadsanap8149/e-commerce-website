"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/services/productService";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 group">
      {/* Image Container */}
      <div className="relative bg-gray-100 h-56 overflow-hidden">
        <img
          src={product.image || "/images/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          onError={(e) => {
            e.currentTarget.src = "/images/placeholder.svg";
          }}
        />
        {/* Stock Badge */}
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
            Only {product.stock} left
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Out of Stock
          </span>
        )}
        {/* Rating Badge */}
        {product.rating && product.rating > 0 && (
          <span className="absolute top-3 right-3 bg-white/90 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            {product.rating.toFixed(1)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-secondary transition">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description || "No description available"}
        </p>
        
        {/* Price and Stock */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-secondary">
            ${product.price.toFixed(2)}
          </span>
          <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 bg-secondary text-white py-2.5 rounded-lg text-center font-medium hover:bg-blue-600 transition"
          >
            View Details
          </Link>
          {onAddToCart && product.stock > 0 && (
            <button
              onClick={() => onAddToCart(product)}
              className="px-4 py-2.5 bg-accent text-gray-800 rounded-lg font-medium hover:bg-yellow-400 transition"
              title="Add to Cart"
            >
              🛒
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
