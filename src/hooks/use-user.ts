"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";

type UseUserResult = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

export function useUser(): UseUserResult {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      if (!active) return;

      if (error) {
        setError(error.message);
        setUser(null);
      } else {
        setUser(data.user ?? null);
      }

      setLoading(false);
    };

    loadUser();

    return () => {
      active = false;
    };
  }, []);

  return { user, loading, error };
}
