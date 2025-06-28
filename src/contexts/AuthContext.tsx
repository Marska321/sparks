import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  resetPassword: async () => {}
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock authentication functions for demo
  const login = async (email: string, password: string) => {
    // In production, this would authenticate with Firebase
    const mockUser: User = {
      uid: 'demo-user-' + Date.now(),
      email: email,
      displayName: email.split('@')[0]
    };
    setCurrentUser(mockUser);
    localStorage.setItem('sparkskill-user', JSON.stringify(mockUser));
  };

  const signup = async (email: string, password: string, displayName: string) => {
    // In production, this would create account with Firebase
    const mockUser: User = {
      uid: 'demo-user-' + Date.now(),
      email: email,
      displayName: displayName
    };
    setCurrentUser(mockUser);
    localStorage.setItem('sparkskill-user', JSON.stringify(mockUser));
  };

  const logout = async () => {
    setCurrentUser(null);
    localStorage.removeItem('sparkskill-user');
  };

  const resetPassword = async (email: string) => {
    // In production, this would send reset email via Firebase
    console.log('Password reset sent to:', email);
  };

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('sparkskill-user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
