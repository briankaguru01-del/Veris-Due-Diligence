import { requireSession } from "@/lib/auth-guard";
import { AppHeader } from "@/components/AppHeader";
import { NewDealForm } from "@/components/NewDealForm";
import type { Profile } from "@/lib/types";

export default async function NewDealPage() {
  const { user, supabase } = await requireSession();

  const { data: profile } = await supabase
    .from("profiles")
    .select("company")
    .eq("id", user.id)
    .maybeSingle();

  const company = (profile as Pick<Profile, "company"> | null)?.company ?? null;

  return (
    <>
      <AppHeader companyName={company} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <h1 className="font-heading text-2xl font-semibold text-text">New Deal</h1>
        <p className="mt-1 text-sm text-slate">
          Choose the sector and name the target company. You&apos;ll be sent to the data-room
          upload form next.
        </p>
        <div className="mt-8">
          <NewDealForm userId={user.id} />
        </div>
      </main>
    </>
  );
}
