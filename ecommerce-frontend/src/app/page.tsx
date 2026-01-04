"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { productService, Product } from "@/services/productService";
import { ProductCard } from "@/components/product/ProductCard";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setIsLoading(true);
      const products = await productService.getProducts();
      // Get first 4 products as featured
      setFeaturedProducts(products.slice(0, 4));
    } catch (error) {
      console.error("Failed to fetch featured products:", error);
    } finally {
      setIsLoading(false);
    }
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to Our Store
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Discover amazing products at unbeatable prices
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/products"
                className="inline-block bg-accent text-primary px-8 py-4 rounded-lg font-bold hover:bg-yellow-400 transition transform hover:scale-105"
              >
                Shop Now
              </Link>
              <Link
                href="/enquiry"
                className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition">
            <div className="text-5xl mb-4">🚚</div>
            <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
            <p className="text-gray-600">On orders over $50</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition">
            <div className="text-5xl mb-4">💳</div>
            <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
            <p className="text-gray-600">100% secure transactions</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition">
            <div className="text-5xl mb-4">📞</div>
            <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
            <p className="text-gray-600">Always ready to help</p>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link 
              href="/products" 
              className="text-secondary hover:underline font-medium"
            >
              View All →
            </Link>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetail={(id) => window.location.href = `/products/${id}`}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No products available yet</p>
              <Link 
                href="/enquiry" 
                className="text-secondary hover:underline"
              >
                Contact us to learn more
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-secondary text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
          <p className="text-lg mb-8 text-blue-100">
            We're here to help! Send us an enquiry and we'll get back to you shortly.
          </p>
          <Link
            href="/enquiry"
            className="inline-block bg-white text-secondary px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
