import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MatrixAuthService } from '../services/matrix-auth';

interface AuthState {
  accessToken: string | null;
  userId: string | null;
  homeServer: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  userId: string | null;
  homeServer: string | null;
  login: (token: string, userId: string, homeServer: string) => void;
  logout: () => void;
  getAuthHeader: () => { Authorization: string } | {};
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'matrix_auth_state';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : { accessToken: null, userId: null, homeServer: null };
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
  }, [authState]);

  const login = (token: string, userId: string, homeServer: string) => {
    setAuthState({ accessToken: token, userId, homeServer });
  };

  const logout = () => {
    setAuthState({ accessToken: null, userId: null, homeServer: null });
    localStorage.removeItem(AUTH_STORAGE_KEY);
    navigate('/matrix/login');
  };

  const getAuthHeader = () => {
    return authState.accessToken ? { Authorization: `Bearer ${authState.accessToken}` } : {};
  };

  const value = {
    isAuthenticated: !!authState.accessToken,
    accessToken: authState.accessToken,
    userId: authState.userId,
    homeServer: authState.homeServer,
    login,
    logout,
    getAuthHeader
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}