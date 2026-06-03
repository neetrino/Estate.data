"use client";

import { ADMIN_AUTH_CHANGED_EVENT } from "@/features/admin/lib/admin-auth-events";
import {
  clearAdminAuthToken,
  readAdminAuthEmail,
  readAdminAuthToken,
  writeAdminAuthEmail,
  writeAdminAuthToken,
} from "@/features/admin/lib/admin-auth-storage";
import { submitAdminLogin } from "@/features/admin/services/submitAdminLogin";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type AdminAuthContextValue = {
  readonly token: string | null;
  readonly email: string | null;
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
  readonly login: (email: string, password: string) => Promise<void>;
  readonly logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

function subscribeAdminAuth(onStoreChange: () => void): () => void {
  const handleChange = () => onStoreChange();

  window.addEventListener(ADMIN_AUTH_CHANGED_EVENT, handleChange);
  window.addEventListener("storage", handleChange);

  return () => {
    window.removeEventListener(ADMIN_AUTH_CHANGED_EVENT, handleChange);
    window.removeEventListener("storage", handleChange);
  };
}

function getAdminAuthSnapshot(): string | null {
  return readAdminAuthToken();
}

function getAdminAuthServerSnapshot(): null {
  return null;
}

type AdminAuthProviderProps = {
  readonly children: ReactNode;
};

export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const token = useSyncExternalStore(
    subscribeAdminAuth,
    getAdminAuthSnapshot,
    getAdminAuthServerSnapshot,
  );

  const email = useSyncExternalStore(
    subscribeAdminAuth,
    () => readAdminAuthEmail(),
    () => null,
  );

  const login = useCallback(async (loginEmail: string, password: string) => {
    const normalizedEmail = loginEmail.toLowerCase();
    const result = await submitAdminLogin({ email: normalizedEmail, password });
    writeAdminAuthToken(result.token);
    writeAdminAuthEmail(normalizedEmail);
    window.dispatchEvent(new Event(ADMIN_AUTH_CHANGED_EVENT));
  }, []);

  const logout = useCallback(() => {
    clearAdminAuthToken();
    window.dispatchEvent(new Event(ADMIN_AUTH_CHANGED_EVENT));
  }, []);

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      token,
      email,
      isAuthenticated: token !== null,
      isLoading: false,
      login,
      logout,
    }),
    [token, email, login, logout],
  );

  return (
    <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
  );
}

/** Access admin auth state within `/supersudo` routes. */
export function useAdminAuth(): AdminAuthContextValue {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }

  return context;
}
