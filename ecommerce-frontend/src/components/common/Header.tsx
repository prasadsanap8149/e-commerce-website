"use client";

import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold">Ecommerce Store</div>
          <ul className="flex space-x-6">
            <li><a href="/" className="hover:text-secondary">Home</a></li>
            <li><a href="/products" className="hover:text-secondary">Products</a></li>
            <li><a href="/enquiry" className="hover:text-secondary">Enquiry</a></li>
            <li><a href="/cart" className="hover:text-secondary">Cart</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
