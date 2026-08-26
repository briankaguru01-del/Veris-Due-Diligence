import type { RAG, FindingStatus, DealStatus, SubscriptionStatus } from "@/lib/types";

type BadgeTone = "green" | "amber" | "red" | "slate" | "blue";

const TONE_STYLES: Record<BadgeTone, { fg: string; bg: string; dot: string }> = {
  green: { fg: "text-green", bg: "bg-green-bg", dot: "bg-green" },
  amber: { fg: "text-amber", bg: "bg-amber-bg", dot: "bg-amber" },
  red: { fg: "text-red", bg: "bg-red-bg", dot: "bg-red" },
  slate: { fg: "text-slate", bg: "bg-white/[0.04]", dot: "bg-slate" },
  blue: { fg: "text-blue", bg: "bg-blue/10", dot: "bg-blue" },
};

const RAG_TONE: Record<RAG, BadgeTone> = {
  Green: "green",
  Amber: "amber",
  Red: "red",
};

const FINDING_STATUS_TONE: Record<FindingStatus, BadgeTone> = {
  Confirmed: "green",
  Outstanding: "slate",
  Exception: "amber",
  "Red Flag": "red",
  "Not Applicable": "slate",
};

const DEAL_STATUS_LABEL: Record<DealStatus, string> = {
  uploaded: "Uploaded",
  processing: "Processing",
  complete: "Complete",
};

const DEAL_STATUS_TONE: Record<DealStatus, BadgeTone> = {
  uploaded: "slate",
  processing: "blue",
  complete: "green",
};

function BadgeBase({ tone, label }: { tone: BadgeTone; label: string }) {
  const styles = TONE_STYLES[tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium font-data ${styles.fg} ${styles.bg}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} aria-hidden />
      {label}
    </span>
  );
}

export function RagBadge({ rag }: { rag: RAG }) {
  return <BadgeBase tone={RAG_TONE[rag]} label={rag} />;
}

export function FindingStatusBadge({ status }: { status: FindingStatus }) {
  return <BadgeBase tone={FINDING_STATUS_TONE[status]} label={status} />;
}

export function DealStatusBadge({ status }: { status: DealStatus }) {
  return <BadgeBase tone={DEAL_STATUS_TONE[status]} label={DEAL_STATUS_LABEL[status]} />;
}

const SUBSCRIPTION_STATUS_TONE: Record<SubscriptionStatus, BadgeTone> = {
  active: "green",
  pending: "amber",
  cancelled: "red",
};

export function SubscriptionStatusBadge({ status }: { status: SubscriptionStatus }) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return <BadgeBase tone={SUBSCRIPTION_STATUS_TONE[status]} label={label} />;
}
