import { createContext } from "react";

export type Role = "customer" | "provider" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  initials: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  switchRole: (role: Role) => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
