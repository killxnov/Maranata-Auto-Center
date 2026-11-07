"use client";
import { useSyncExternalStore } from "react";
import { useCallback } from "react";
export function useMediaQuery(query: string, serverValue = false) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    [query],
  );
  const snapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, snapshot, () => serverValue);
}
