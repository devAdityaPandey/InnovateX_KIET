// context/authProvider.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface AuthContextProps {
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth } = useSelector((state: any) => state.user); // Get auth state from redux
  const [isAuthenticated, setIsAuthenticated] = useState(!!auth); // Initialize auth state

  useEffect(() => {
    setIsAuthenticated(!!auth); // Sync with redux auth state
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
