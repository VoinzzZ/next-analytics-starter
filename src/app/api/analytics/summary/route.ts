import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import type { AnalyticsSummary } from "@/types/analytics";

export const revalidate = 3600;

export async function GET() {
  const supabase = await createClient();

  const [trafficRes, conversionRes, sourcesRes, pagesRes] = await Promise.all([
    supabase.from("traffic_stats").select("month, visits, uniques, avg_session_seconds").order("month", { ascending: true }),
    supabase.from("conversion_stats").select("month, rate").order("month", { ascending: true }),
    supabase.from("source_stats").select("name, value").order("value", { ascending: false }),
    supabase.from("page_stats").select("page, views, uniques, bounce").order("views", { ascending: false }),
  ]);

  if (trafficRes.error || conversionRes.error || sourcesRes.error || pagesRes.error) {
    const message =
      trafficRes.error?.message ??
      conversionRes.error?.message ??
      sourcesRes.error?.message ??
      pagesRes.error?.message ??
      "Unknown error fetching analytics data";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const payload: AnalyticsSummary = {
    traffic: trafficRes.data ?? [],
    conversion: conversionRes.data ?? [],
    sources: sourcesRes.data ?? [],
    pages: pagesRes.data ?? [],
  };

  return NextResponse.json(payload, { status: 200 });
}
