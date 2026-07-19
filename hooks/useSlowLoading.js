import { useEffect, useState } from "react";

/**
 * Returns true once `loading` has stayed true for longer than `thresholdMs`.
 *
 * Used to show a "this is taking longer than usual" message only when it's
 * actually warranted — e.g. Render's free tier can take 30-50s to wake a
 * service up after it's been idle, and a plain "Loading…" spinner makes the
 * site look broken during that window. Fast, normal loads never trigger this.
 */
export default function useSlowLoading(loading, thresholdMs = 4000) {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    if (!loading) {
      setSlow(false);
      return;
    }
    const timer = setTimeout(() => setSlow(true), thresholdMs);
    return () => clearTimeout(timer);
  }, [loading, thresholdMs]);

  return slow;
}