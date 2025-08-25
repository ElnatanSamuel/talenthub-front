"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Role } from "@/data/types";

export type User = { id: string; name: string; email: string; role: Role; companyId?: string } | null;

type AuthContextType = {
  user: User;
  login: (user: Exclude<User, null>) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("th_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  // persist
  useEffect(() => {
    try {
      if (user) localStorage.setItem("th_user", JSON.stringify(user));
      else localStorage.removeItem("th_user");
    } catch {}
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      login: (u: Exclude<User, null>) => setUser(u),
      logout: () => setUser(null),
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
