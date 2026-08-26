import { requireSession } from "@/lib/auth-guard";
import { AppHeader } from "@/components/AppHeader";
import { DealCard } from "@/components/DealCard";
import { LinkButton } from "@/components/Button";
import type { Deal, Profile } from "@/lib/types";

export default async function DashboardPage() {
  const { user, supabase } = await requireSession();

  const [{ data: profile }, { data: deals }] = await Promise.all([
    supabase.from("profiles").select("company").eq("id", user.id).maybeSingle(),
    supabase.from("deals").select("*").order("updated_at", { ascending: false }),
  ]);

  const company = (profile as Pick<Profile, "company"> | null)?.company ?? null;
  const dealList = (deals as Deal[] | null) ?? [];

  return (
    <>
      <AppHeader companyName={company} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-semibold text-text">Deals</h1>
            <p className="mt-1 text-sm text-slate">
              {dealList.length === 0
                ? "No deals yet."
                : `${dealList.length} deal${dealList.length === 1 ? "" : "s"} in progress.`}
            </p>
          </div>
          <LinkButton href="/deals/new">New Deal</LinkButton>
        </div>

        {dealList.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              className="text-slate"
              aria-hidden
            >
              <path
                d="M4 4h11l5 5v11a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
              <path d="M15 4v5h5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <h2 className="mt-4 font-heading text-lg font-semibold text-text">
              No deals yet
            </h2>
            <p className="mt-2 max-w-sm text-sm text-slate">
              Start a new deal to get an upload link for the data room — Veris will run the
              checklist as soon as it&apos;s in.
            </p>
            <div className="mt-6">
              <LinkButton href="/deals/new">New Deal</LinkButton>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dealList.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
