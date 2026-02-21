"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/hooks/use-user";

type UseRoleResult = {
  role: string | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
};

export function useRole(): UseRoleResult {
  const { user, loading: userLoading, error: userError } = useUser();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadRole = async () => {
      setLoading(true);
      setError(null);

      if (userLoading) {
        return;
      }

      if (userError) {
        setError(userError);
        setLoading(false);
        return;
      }

      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .limit(1)
        .maybeSingle();

      if (!active) return;

      if (error) {
        setError(error.message);
        setRole(null);
      } else {
        setRole(data?.role ?? null);
      }

      setLoading(false);
    };

    loadRole();

    return () => {
      active = false;
    };
  }, [user, userLoading, userError]);

  return {
    role,
    isAdmin: role === "admin",
    loading,
    error,
  };
}
