import dynamic from "next/dynamic";
import type { ComponentType, ReactNode } from "react";

type LazyNamedOptions = {
  loading?: () => ReactNode;
  ssr?: boolean;
};

/**
 * Code-split a named export via `next/dynamic` (project uses named exports only).
 */
export function lazyNamed<P extends object>(
  loader: () => Promise<Record<string, ComponentType<P>>>,
  exportName: string,
  options?: LazyNamedOptions,
): ComponentType<P> {
  return dynamic(
    () =>
      loader().then((moduleExports) => {
        const selected = moduleExports[exportName];
        if (!selected) {
          throw new Error(`lazyNamed: missing export "${exportName}"`);
        }
        return { default: selected as ComponentType<P> };
      }),
    {
      loading: options?.loading,
      ssr: options?.ssr ?? true,
    },
  );
}
