// hooks/useAuthGuard.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function useAuthGuard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // client-only
    const token = typeof window !== "undefined" ? localStorage.getItem("access") : null;
    if (!token) {
      router.replace("/login");
      return;
    }
    setReady(true);
  }, [router]);

  return ready; // page should render only when ready === true
}
