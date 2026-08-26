import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth-guard";
import { AppHeader } from "@/components/AppHeader";
import { RagBanner } from "@/components/RagBanner";
import { DownloadPdfButton } from "@/components/DownloadPdfButton";
import { DealTabs } from "@/components/DealTabs";
import { ChatPanel } from "@/components/ChatPanel";
import type { ChatMessage, ChecklistFinding, ChecklistSegment, Deal, Profile } from "@/lib/types";

export default async function DealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { user, supabase } = await requireSession();

  const [{ data: profile }, { data: deal }] = await Promise.all([
    supabase.from("profiles").select("company").eq("id", user.id).maybeSingle(),
    supabase.from("deals").select("*").eq("id", id).maybeSingle(),
  ]);

  if (!deal) {
    notFound();
  }

  const [{ data: segments }, { data: chatMessages }] = await Promise.all([
    supabase
      .from("checklist_segments")
      .select("*")
      .eq("deal_id", id)
      .order("segment_id", { ascending: true }),
    supabase
      .from("chat_messages")
      .select("*")
      .eq("deal_id", id)
      .order("created_at", { ascending: true }),
  ]);

  const segmentList = (segments as ChecklistSegment[] | null) ?? [];
  const segmentIds = segmentList.map((s) => s.id);

  const { data: findings } = segmentIds.length
    ? await supabase
        .from("checklist_findings")
        .select("*")
        .in("segment_id", segmentIds)
    : { data: [] as ChecklistFinding[] };

  const findingsBySegment: Record<string, ChecklistFinding[]> = {};
  for (const finding of (findings as ChecklistFinding[] | null) ?? []) {
    (findingsBySegment[finding.segment_id] ??= []).push(finding);
  }

  const company = (profile as Pick<Profile, "company"> | null)?.company ?? null;
  const dealData = deal as Deal;

  return (
    <>
      <AppHeader companyName={company} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-semibold text-text">
              {dealData.company_name}
            </h1>
            <p className="mt-1 text-sm text-slate">{dealData.sector}</p>
            <p className="mt-1 font-data text-xs text-slate">{dealData.legacy_deal_id}</p>
          </div>
          <DownloadPdfButton />
        </div>

        <div className="mt-6">
          <RagBanner deal={dealData} />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <DealTabs segments={segmentList} findingsBySegment={findingsBySegment} />
          <ChatPanel
            dealId={id}
            initialMessages={(chatMessages as ChatMessage[] | null) ?? []}
          />
        </div>
      </main>
    </>
  );
}
