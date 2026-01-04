"use client";

import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-bold text-accent">
              E-Commerce Store
            </Link>
            <p className="text-gray-300 mt-4">
              Your trusted destination for quality products at great prices. 
              Shop with confidence and enjoy fast, reliable delivery.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a 
                href="#" 
                aria-label="Facebook"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition"
              >
                f
              </a>
              <a 
                href="#" 
                aria-label="Twitter"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition"
              >
                t
              </a>
              <a 
                href="#" 
                aria-label="Instagram"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition"
              >
                ig
              </a>
              <a 
                href="#" 
                aria-label="LinkedIn"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition"
              >
                in
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/products" className="hover:text-accent transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-accent transition">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/enquiry" className="hover:text-accent transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="#" className="hover:text-accent transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Size Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span>📍</span>
                <span>123 Commerce Street<br />Business District, City 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <span>📧</span>
                <a href="mailto:support@ecommerce.com" className="hover:text-accent transition">
                  support@ecommerce.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span>📞</span>
                <a href="tel:+18001234567" className="hover:text-accent transition">
                  +1 (800) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span>⏰</span>
                <span>Mon-Fri: 9am - 6pm EST</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-700 mt-10 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-gray-300">Get the latest updates on new products and special offers!</p>
            </div>
            <div>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-secondary"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-blue-600 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} E-Commerce Store. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Cookie Policy</a>
            </div>
            <div className="flex gap-2">
              <span className="bg-white/10 px-3 py-1 rounded text-xs">💳 Visa</span>
              <span className="bg-white/10 px-3 py-1 rounded text-xs">💳 Mastercard</span>
              <span className="bg-white/10 px-3 py-1 rounded text-xs">📱 PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
