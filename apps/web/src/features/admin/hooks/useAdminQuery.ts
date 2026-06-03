"use client";

import { useCallback, useEffect, useState, type DependencyList } from "react";

type UseAdminQueryResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
  setLoading: (value: boolean) => void;
};

/**
 * Fetches admin API data on mount and when `deps` change.
 * State updates run inside the async IIFE to satisfy react-hooks/set-state-in-effect.
 */
export function useAdminQuery<T>(
  queryFn: () => Promise<T>,
  deps: DependencyList,
): UseAdminQueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  const reload = useCallback(() => {
    setLoading(true);
    setVersion((current) => current + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      setError(null);
      try {
        const result = await queryFn();
        if (!cancelled) {
          setData(result);
        }
      } catch (queryError) {
        if (!cancelled) {
          setError(queryError instanceof Error ? queryError.message : "Request failed");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller controls refetch keys
  }, [...deps, version]);

  return { data, loading, error, reload, setLoading };
}
