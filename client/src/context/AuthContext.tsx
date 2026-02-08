import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiFetch } from "@/lib/api";

interface User {
  id: number;
  email: string;
  role: "patient" | "doctor";
  fullName: string;
  dateOfBirth?: string;
  age?: number;
  sex?: string;
  weight?: string;
  allergies?: string;
  emergencyContact?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: Record<string, any>) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("bridgecare_token");
    if (token) {
      apiFetch<User>("/auth/me")
        .then(setUser)
        .catch(() => localStorage.removeItem("bridgecare_token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiFetch<{ token: string; user: User }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem("bridgecare_token", data.token);
    setUser(data.user);
  };

  const register = async (formData: Record<string, any>) => {
    const data = await apiFetch<{ token: string; user: User }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    localStorage.setItem("bridgecare_token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("bridgecare_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
