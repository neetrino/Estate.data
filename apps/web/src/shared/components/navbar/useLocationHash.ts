"use client";

import { useEffect, useState } from "react";

/** Current `window.location.hash`, kept in sync with hashchange and section jumps. */
export function useLocationHash(): string {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => {
      setHash(window.location.hash);
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  return hash;
}
