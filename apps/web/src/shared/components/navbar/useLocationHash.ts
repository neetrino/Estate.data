"use client";

import { useEffect, useState } from "react";
import { LOCATION_HASH_SYNC_EVENT } from "@/shared/lib/scrollToHomeSection";

/** Current `window.location.hash`, including `replaceState` section jumps. */
export function useLocationHash(): string {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => {
      setHash(window.location.hash);
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    window.addEventListener(LOCATION_HASH_SYNC_EVENT, syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
      window.removeEventListener(LOCATION_HASH_SYNC_EVENT, syncHash);
    };
  }, []);

  return hash;
}
