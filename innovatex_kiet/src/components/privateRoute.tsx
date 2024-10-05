// components/PrivateRoute.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authProvider';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    if (typeof window !== 'undefined') {
      router.push('/user/login');
    }
    return null; // Do not render the component until redirection happens
  }

  return <>{children}</>;
};

export default PrivateRoute;
