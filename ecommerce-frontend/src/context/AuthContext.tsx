"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { FEATURES } from "@/config/featureToggle";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);

  const login = async (email: string, password: string) => {
    if (!FEATURES.AUTH) {
      throw new Error("Authentication is disabled");
    }
    // TODO: Implement actual login API call
    console.log("Login:", email, password);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("authToken");
  };

  const register = async (name: string, email: string, password: string) => {
    if (!FEATURES.AUTH) {
      throw new Error("Authentication is disabled");
    }
    // TODO: Implement actual registration API call
    console.log("Register:", name, email, password);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
