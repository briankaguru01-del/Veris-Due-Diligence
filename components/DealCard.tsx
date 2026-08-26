import Link from "next/link";
import { RagBadge, DealStatusBadge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { relativeTime } from "@/lib/format";
import type { Deal } from "@/lib/types";

export function DealCard({ deal }: { deal: Deal }) {
  return (
    <Link href={`/deals/${deal.id}`}>
      <Card className="p-5 transition-colors hover:border-blue-dim">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-base font-semibold text-text">
            {deal.company_name}
          </h3>
          {deal.status === "complete" && deal.overall_rag ? (
            <RagBadge rag={deal.overall_rag} />
          ) : (
            <DealStatusBadge status={deal.status} />
          )}
        </div>
        <p className="mt-2 text-sm text-slate">{deal.sector}</p>
        <p className="mt-4 font-data text-xs text-slate">
          Updated {relativeTime(deal.updated_at)}
        </p>
      </Card>
    </Link>
  );
}
