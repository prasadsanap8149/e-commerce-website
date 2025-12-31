"use client";

import React, { useState, useEffect } from "react";
import { productService, Product } from "@/services/productService";
import { Loader } from "@/components/common/Loader";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const data = await productService.getProductById(params.id);
      setProduct(data);
    } catch (err: any) {
      setError(err.message || "Failed to load product");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="p-4 bg-red-100 text-red-700 rounded">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">Product not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
          <img
            src={product.image || "/images/placeholder.png"}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="mb-6">
            <span className="text-3xl font-bold text-secondary">${product.price.toFixed(2)}</span>
            <span className="ml-4 text-gray-600">Stock: {product.stock}</span>
          </div>
          <div className="mb-6">
            <label className="text-sm font-medium">Category:</label>
            <p className="text-gray-600">{product.category}</p>
          </div>

          {product.stock > 0 ? (
            <div className="mb-6">
              <button className="w-full bg-accent text-primary py-3 rounded font-bold hover:bg-yellow-500 transition">
                Add to Cart
              </button>
            </div>
          ) : (
            <div className="mb-6 p-3 bg-yellow-100 text-yellow-700 rounded">
              Out of Stock
            </div>
          )}
        </div>
      </div>

      {/* Enquiry Form */}
      <div className="max-w-2xl">
        <EnquiryForm productId={product.id} />
      </div>
    </div>
  );
}
