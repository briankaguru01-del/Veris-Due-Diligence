"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { SECTORS } from "@/lib/config";
import { generateLegacyDealId } from "@/lib/format";
import { Button } from "@/components/Button";

const SECTOR_OPTIONS = [
  {
    value: SECTORS.MFI,
    title: "Microfinance Institution / SACCO",
    description: "Deposit-taking or credit-only MFIs and SACCOs regulated by CBK or SASRA.",
  },
  {
    value: SECTORS.BANK,
    title: "Investment Bank",
    description: "Investment banks and capital markets intermediaries regulated by the CMA.",
  },
];

export function NewDealForm({ userId }: { userId: string }) {
  const [sector, setSector] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!sector || !companyName.trim()) return;

    setLoading(true);
    setError(null);

    const supabase = createClient();
    const legacyDealId = generateLegacyDealId(companyName);

    const { data, error: insertError } = await supabase
      .from("deals")
      .insert({
        user_id: userId,
        company_name: companyName.trim(),
        sector,
        status: "uploaded",
        legacy_deal_id: legacyDealId,
      })
      .select("id")
      .single();

    if (insertError || !data) {
      setLoading(false);
      setError(insertError?.message ?? "Could not create the deal. Please try again.");
      return;
    }

    const params = new URLSearchParams({
      "Deal ID": legacyDealId,
      "Company Name": companyName.trim(),
      "Upload Type": "new",
      Sector: sector,
    });

    // Real redirect to the external n8n upload form — not an internal route.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = `${process.env.NEXT_PUBLIC_UPLOAD_FORM_URL}?${params.toString()}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-text">Sector</label>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {SECTOR_OPTIONS.map((option) => {
            const selected = sector === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSector(option.value)}
                className={`rounded-xl border p-6 text-left transition-colors ${
                  selected
                    ? "border-blue bg-blue/[0.06] shadow-[0_0_0_1px_rgba(0,194,255,0.4)]"
                    : "border-border bg-navy-mid hover:border-blue-dim"
                }`}
              >
                <h3 className="font-heading text-base font-semibold text-text">
                  {option.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-text">
          Company name
        </label>
        <input
          id="companyName"
          type="text"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="e.g. Amani Capital"
          className="mt-1.5 w-full max-w-md rounded-md border border-border bg-navy-card px-3 py-2.5 text-sm text-text outline-none focus:border-blue-dim"
        />
      </div>

      {error && <p className="text-sm text-red">{error}</p>}

      <Button type="submit" disabled={!sector || !companyName.trim() || loading}>
        {loading ? "Creating deal…" : "Continue to upload"}
      </Button>
    </form>
  );
}
