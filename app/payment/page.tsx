import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/AppHeader";
import { Card, Eyebrow } from "@/components/Card";
import { Button } from "@/components/Button";
import type { Profile } from "@/lib/types";

export default async function PaymentPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("company")
    .eq("id", user.id)
    .maybeSingle();

  const company = (profile as Pick<Profile, "company"> | null)?.company ?? null;

  return (
    <>
      <AppHeader companyName={company} />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-16">
        <div className="w-full">
          <Eyebrow>Order Summary</Eyebrow>
          <Card className="mt-4 p-6">
            <h1 className="font-heading text-lg font-semibold text-text">
              Veris Pilot Retainer
            </h1>
            <p className="mt-1 font-data text-2xl font-semibold text-blue">$4,000/mo</p>
            <p className="mt-2 text-sm text-slate">One analyst &middot; one active deal &middot; 3 months</p>

            <div className="mt-6 border-t border-border pt-6">
              <Button withArrow={false} className="w-full justify-center" disabled>
                Pay with Flutterwave
              </Button>
              <p className="mt-3 text-center text-xs text-slate">
                Payment processing isn&apos;t connected yet — this button is a placeholder.
              </p>
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}
