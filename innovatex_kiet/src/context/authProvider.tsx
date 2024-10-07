"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface AuthContextProps {
  isAuthenticated: boolean | null; // Allow null to signify loading state
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useSelector((state: any) => state.user.auth); // Access auth directly
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null indicates loading state

  useEffect(() => {
    setIsAuthenticated(!!auth); // Set to true or false based on auth state from Redux
  }, [auth]);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
