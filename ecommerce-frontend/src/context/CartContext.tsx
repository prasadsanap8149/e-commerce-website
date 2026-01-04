"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "ecommerce_cart";
const MAX_QUANTITY_PER_ITEM = 99;
const MAX_ITEMS_IN_CART = 50;

// Type guard for CartItem
const isValidCartItem = (item: unknown): item is CartItem => {
  if (!item || typeof item !== "object") return false;
  const cartItem = item as CartItem;
  return (
    typeof cartItem.productId === "string" &&
    typeof cartItem.quantity === "number" &&
    typeof cartItem.price === "number" &&
    typeof cartItem.name === "string" &&
    cartItem.quantity > 0 &&
    cartItem.price >= 0
  );
};

// Type guard for CartItem array
const isValidCartItemArray = (data: unknown): data is CartItem[] => {
  return Array.isArray(data) && data.every(isValidCartItem);
};

// Sanitize cart item
const sanitizeCartItem = (item: CartItem): CartItem => ({
  productId: String(item.productId).trim(),
  quantity: Math.max(1, Math.min(MAX_QUANTITY_PER_ITEM, Math.floor(item.quantity))),
  price: Math.max(0, Number(item.price) || 0),
  name: String(item.name).trim().substring(0, 255),
  image: item.image ? String(item.image).trim() : undefined,
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoading(true);
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          const parsed = JSON.parse(savedCart);
          if (isValidCartItemArray(parsed)) {
            // Sanitize each item when loading
            setItems(parsed.map(sanitizeCartItem));
          } else {
            console.warn("Invalid cart data found in localStorage, resetting cart");
            localStorage.removeItem(CART_STORAGE_KEY);
          }
        }
      } catch (e) {
        console.error("Failed to parse cart from localStorage:", e);
        // Clear corrupted data
        try {
          localStorage.removeItem(CART_STORAGE_KEY);
        } catch {}
      } finally {
        setIsInitialized(true);
        setIsLoading(false);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error("Failed to save cart to localStorage:", e);
        // Storage might be full - try to clear old data
        if (e instanceof DOMException && e.name === "QuotaExceededError") {
          console.warn("Storage quota exceeded, clearing cart");
        }
      }
    }
  }, [items, isInitialized]);

  const addToCart = useCallback((item: CartItem) => {
    // Validate item
    if (!item || !item.productId) {
      console.error("Cannot add invalid item to cart");
      return;
    }
    
    const sanitizedItem = sanitizeCartItem(item);
    
    setItems((prev) => {
      // Check cart limit
      if (prev.length >= MAX_ITEMS_IN_CART && !prev.find((i) => i.productId === sanitizedItem.productId)) {
        console.warn(`Cart limit reached (max ${MAX_ITEMS_IN_CART} items)`);
        return prev;
      }
      
      const existing = prev.find((i) => i.productId === sanitizedItem.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === sanitizedItem.productId
            ? { ...i, quantity: Math.min(MAX_QUANTITY_PER_ITEM, i.quantity + sanitizedItem.quantity) }
            : i
        );
      }
      return [...prev, sanitizedItem];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    if (!productId) {
      console.error("Cannot remove item without productId");
      return;
    }
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (!productId) {
      console.error("Cannot update item without productId");
      return;
    }
    
    // Validate quantity
    const sanitizedQuantity = Math.floor(quantity);
    
    if (sanitizedQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const finalQuantity = Math.min(MAX_QUANTITY_PER_ITEM, sanitizedQuantity);
    
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity: finalQuantity } : i))
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(CART_STORAGE_KEY);
      } catch (e) {
        console.error("Failed to clear cart from localStorage:", e);
      }
    }
  }, []);

  // Calculate total with proper decimal handling
  const total = items.reduce((sum, item) => {
    const itemTotal = (item.price || 0) * (item.quantity || 0);
    return sum + itemTotal;
  }, 0);
  
  // Round to 2 decimal places to avoid floating point issues
  const roundedTotal = Math.round(total * 100) / 100;
  
  const itemCount = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total: roundedTotal,
        itemCount,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    // Return a default context if not within provider (for SSR)
    return {
      items: [],
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      total: 0,
      itemCount: 0,
      isLoading: false,
    };
  }
  return context;
};
