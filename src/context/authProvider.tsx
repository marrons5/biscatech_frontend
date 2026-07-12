import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type AuthUser } from "./authContext";

const STORAGE_KEY = "biscatech:auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  const persist = (u: AuthUser | null) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: persist,
        logout: () => persist(null),
        switchRole: (role) => user && persist({ ...user, role }),
      }}>
      {children}
    </AuthContext.Provider>
  );
};
