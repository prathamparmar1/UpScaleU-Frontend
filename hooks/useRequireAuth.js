import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isLoggedIn } from "../utils/auth";

export default function useRequireAuth() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;

    const check = () => {
      // localStorage is only available in the browser
      const ok =
        typeof window !== "undefined" && isLoggedIn();

      if (!mounted) return;

      setAuthed(ok);
      setReady(true);

      // if not logged in, go to login
      if (!ok) {
        router.replace("/login");
      }
    };

    check();

    // keep multiple tabs in sync (optional but safe)
    const onStorage = (e) => {
      if (e.key === "access" || e.key === "refresh") check();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", onStorage);
    }

    return () => {
      mounted = false;
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", onStorage);
      }
    };
  }, [router]);

  return { ready, authed };
}
