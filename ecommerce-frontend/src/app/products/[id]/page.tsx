"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { productService, Product } from "@/services/productService";
import { Loader } from "@/components/common/Loader";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await productService.getProductById(id);
      setProduct(data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to load product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (isLoading) return <Loader message="Loading product..." />;

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="p-4 bg-red-100 text-red-700 rounded">{error}</div>
        <a href="/products" className="inline-block mt-4 text-secondary hover:underline">
          ← Back to Products
        </a>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <a href="/products" className="text-secondary hover:underline">
            ← Back to Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <a href="/" className="text-gray-500 hover:text-secondary">Home</a>
        <span className="mx-2 text-gray-400">/</span>
        <a href="/products" className="text-gray-500 hover:text-secondary">Products</a>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-700">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="text-gray-400 text-6xl">📷</div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          {product.rating && product.rating > 0 && (
            <div className="flex items-center mb-4">
              <span className="text-yellow-400 text-lg">{"★".repeat(Math.round(product.rating))}</span>
              <span className="text-gray-400 text-lg">{"★".repeat(5 - Math.round(product.rating || 0))}</span>
              <span className="ml-2 text-gray-600">({product.rating.toFixed(1)})</span>
            </div>
          )}
          
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
          
          <div className="mb-6">
            <span className="text-4xl font-bold text-secondary">${product.price.toFixed(2)}</span>
          </div>
          
          <div className="mb-6">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              product.stock > 0 
                ? product.stock > 10 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {product.stock > 0 
                ? product.stock > 10 
                  ? `In Stock (${product.stock} available)` 
                  : `Low Stock (${product.stock} left)`
                : 'Out of Stock'}
            </span>
          </div>

          {product.stock > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-20 text-center px-3 py-2 border border-gray-300 rounded"
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {product.stock > 0 ? (
            <div className="space-y-3">
              <button 
                onClick={handleAddToCart}
                className={`w-full py-3 rounded font-bold transition ${
                  addedToCart 
                    ? 'bg-green-500 text-white' 
                    : 'bg-accent text-primary hover:bg-yellow-500'
                }`}
              >
                {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
              <a 
                href="/cart" 
                className="block w-full bg-secondary text-white py-3 rounded font-bold hover:bg-blue-600 transition text-center"
              >
                Go to Cart
              </a>
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 font-medium">This product is currently out of stock</p>
              <p className="text-yellow-600 text-sm mt-1">Submit an enquiry below to be notified when it's available</p>
            </div>
          )}
        </div>
      </div>

      {/* Enquiry Form */}
      <div className="border-t pt-12">
        <h2 className="text-2xl font-bold mb-6">Have Questions?</h2>
        <div className="max-w-2xl">
          <EnquiryForm productId={product.id} />
        </div>
      </div>
    </div>
  );
}
