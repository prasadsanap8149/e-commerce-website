"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export const Header: React.FC = () => {
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold hover:text-accent transition">
            🛒 E-Commerce
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 items-center">
            <li>
              <Link href="/" className="hover:text-accent transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-accent transition">
                Products
              </Link>
            </li>
            <li>
              <Link href="/enquiry" className="hover:text-accent transition">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/cart" className="relative hover:text-accent transition">
                <span className="flex items-center">
                  🛒 Cart
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-4 bg-accent text-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount > 99 ? '99+' : itemCount}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/" 
                  className="block hover:text-accent transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  className="block hover:text-accent transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  href="/enquiry" 
                  className="block hover:text-accent transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/cart" 
                  className="block hover:text-accent transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🛒 Cart {itemCount > 0 && `(${itemCount})`}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
