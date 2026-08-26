import type { Deal } from "@/lib/types";

const RAG_STYLES: Record<string, { border: string; bg: string; text: string }> = {
  Green: { border: "border-green/40", bg: "bg-green-bg", text: "text-green" },
  Amber: { border: "border-amber/40", bg: "bg-amber-bg", text: "text-amber" },
  Red: { border: "border-red/40", bg: "bg-red-bg", text: "text-red" },
};

export function RagBanner({ deal }: { deal: Deal }) {
  if (deal.status !== "complete" || !deal.overall_rag) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-border bg-navy-mid px-6 py-5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue" />
        </span>
        <div>
          <p className="font-heading text-sm font-semibold text-text">
            Analysis in progress
          </p>
          <p className="mt-0.5 text-sm text-slate">
            Veris is working through the checklist against the uploaded data room. This
            page updates automatically once segment findings are ready.
          </p>
        </div>
      </div>
    );
  }

  const styles = RAG_STYLES[deal.overall_rag];

  return (
    <div className={`rounded-xl border px-6 py-5 ${styles.border} ${styles.bg}`}>
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${styles.text.replace("text-", "bg-")}`} />
        <p className={`font-heading text-base font-semibold ${styles.text}`}>
          Overall: {deal.overall_rag}
        </p>
      </div>
      {deal.recommendation && (
        <p className="mt-2 text-sm leading-relaxed text-text/90">{deal.recommendation}</p>
      )}
    </div>
  );
}
