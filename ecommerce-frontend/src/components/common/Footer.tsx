"use client";

import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-gray-300">Your trusted e-commerce platform</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-gray-300">Email: info@ecommerce.com</p>
            <p className="text-gray-300">Phone: +1-800-123-4567</p>
          </div>
        </div>
        <hr className="my-8 border-gray-700" />
        <div className="text-center text-gray-400">
          <p>&copy; 2025 Ecommerce Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
