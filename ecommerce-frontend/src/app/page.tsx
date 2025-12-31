"use client";

import React from "react";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-12 mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Ecommerce Store</h1>
        <p className="text-xl mb-6">
          Discover amazing products at unbeatable prices
        </p>
        <a
          href="/products"
          className="inline-block bg-accent text-primary px-6 py-3 rounded font-bold hover:bg-yellow-500 transition"
        >
          Shop Now
        </a>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-4">🚚</div>
          <h3 className="text-lg font-bold mb-2">Free Shipping</h3>
          <p className="text-gray-600">On orders over $50</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-4">💳</div>
          <h3 className="text-lg font-bold mb-2">Secure Payment</h3>
          <p className="text-gray-600">100% secure transactions</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-4">📞</div>
          <h3 className="text-lg font-bold mb-2">24/7 Support</h3>
          <p className="text-gray-600">Always ready to help</p>
        </div>
      </div>

      {/* Recent Products Section */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <p className="text-gray-600 text-center py-12">
          Browse our collection on the Products page
        </p>
      </div>
    </div>
  );
}
