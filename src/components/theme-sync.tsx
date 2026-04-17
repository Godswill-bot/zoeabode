"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/session";
import { useUserProfile } from "@/lib/user-space";

export function ThemeSync() {
  const session = useSession();
  const profile = useUserProfile(session?.id);

  useEffect(() => {
    const theme = profile?.theme ?? session?.theme ?? "light";
    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;
  }, [profile?.theme, session]);

  return null;
}
