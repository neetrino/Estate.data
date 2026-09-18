"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { StudioServiceExample } from "@/features/home/content/studioServiceExamples";

const ExampleCatalogContext = createContext<Readonly<Record<string, StudioServiceExample>>>({});

type StudioExampleCatalogProviderProps = {
  readonly examples: Readonly<Record<string, StudioServiceExample>>;
  readonly children: ReactNode;
};

/** View Example lookup shared while visitors page through services. */
export function StudioExampleCatalogProvider({
  examples,
  children,
}: StudioExampleCatalogProviderProps) {
  return <ExampleCatalogContext.Provider value={examples}>{children}</ExampleCatalogContext.Provider>;
}

export function useStudioExampleCatalog(): Readonly<Record<string, StudioServiceExample>> {
  return useContext(ExampleCatalogContext);
}
