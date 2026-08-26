import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { REQUIRE_PAYMENT } from "@/lib/config";
import type { User } from "@supabase/supabase-js";

/**
 * Enforces the two-part protected-page gate: (1) a logged-in session, and
 * (2) when REQUIRE_PAYMENT is flipped on, an active subscription. Call at
 * the top of every protected page's server component.
 */
export async function requireSession(): Promise<{
  user: User;
  supabase: Awaited<ReturnType<typeof createClient>>;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (REQUIRE_PAYMENT) {
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("status")
      .eq("user_id", user.id)
      .eq("status", "active")
      .maybeSingle();

    if (!subscription) {
      redirect("/payment");
    }
  }

  return { user, supabase };
}
