import { requireSession } from "@/lib/auth-guard";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/Card";
import { SubscriptionStatusBadge } from "@/components/Badge";
import type { Profile, Subscription } from "@/lib/types";

export default async function BillingPage() {
  const { user, supabase } = await requireSession();

  const [{ data: profile }, { data: subscription }] = await Promise.all([
    supabase.from("profiles").select("company").eq("id", user.id).maybeSingle(),
    supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const company = (profile as Pick<Profile, "company"> | null)?.company ?? null;
  const sub = subscription as Subscription | null;

  return (
    <>
      <AppHeader companyName={company} />
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
        <h1 className="font-heading text-2xl font-semibold text-text">Billing</h1>
        <p className="mt-1 text-sm text-slate">Your plan and subscription status.</p>

        <Card className="mt-8 p-6">
          {sub ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate">Plan</span>
                <span className="text-sm font-medium text-text">{sub.plan ?? "—"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate">Status</span>
                <SubscriptionStatusBadge status={sub.status} />
              </div>
              <div className="flex items-center justify-between border-t border-border pt-5">
                <span className="text-sm text-slate">Payment method</span>
                <span className="text-sm text-slate">
                  Not connected — billing management isn&apos;t wired up yet.
                </span>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-text">No subscription on file.</p>
              <p className="mt-2 text-sm text-slate">
                Billing management isn&apos;t wired up yet — payment is currently disabled for
                all accounts.
              </p>
            </div>
          )}
        </Card>
      </main>
    </>
  );
}
