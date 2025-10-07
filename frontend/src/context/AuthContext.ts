import { createContext } from 'react';

export type AuthContextValue = {
  userId: string | null;
  login: (id: string) => void;
  logout: () => void;
  setUserId: (id: string | null) => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);


