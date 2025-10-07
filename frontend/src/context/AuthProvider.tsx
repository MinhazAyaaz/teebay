import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import type { AuthContextValue } from './AuthContext';

const LOCAL_STORAGE_KEY = 'x-user-id';

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [userId, setUserId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      return window.localStorage.getItem(LOCAL_STORAGE_KEY);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (userId) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, userId);
      } else {
        window.localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    } catch {
      // ignore storage errors
    }
  }, [userId]);

  const login = useCallback((id: string) => {
    setUserId(id);
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
  }, []);

  const isAuthenticated = !!userId;
  const value = useMemo<AuthContextValue>(
    () => ({ userId, login, logout, setUserId, isAuthenticated }),
    [userId, login, logout, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}


