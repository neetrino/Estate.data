"use client";

import {
  clearAdminAuthToken,
  readAdminAuthToken,
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

const ADMIN_AUTH_CHANGED_EVENT = "estate-admin-auth-changed";

type AdminAuthContextValue = {
  readonly token: string | null;
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

function notifyAdminAuthChanged(): void {
  window.dispatchEvent(new Event(ADMIN_AUTH_CHANGED_EVENT));
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

  const login = useCallback(async (email: string, password: string) => {
    const result = await submitAdminLogin({ email, password });
    writeAdminAuthToken(result.token);
    notifyAdminAuthChanged();
  }, []);

  const logout = useCallback(() => {
    clearAdminAuthToken();
    notifyAdminAuthChanged();
  }, []);

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      token,
      isAuthenticated: token !== null,
      isLoading: false,
      login,
      logout,
    }),
    [token, login, logout],
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
