"use client";

import { useState } from "react";
import { RagBadge, FindingStatusBadge } from "@/components/Badge";
import { Card } from "@/components/Card";
import type { ChecklistFinding, ChecklistSegment } from "@/lib/types";

type Tab = "segments" | "risk" | "outstanding";

const TABS: { id: Tab; label: string }[] = [
  { id: "segments", label: "Segment Findings" },
  { id: "risk", label: "Risk Register" },
  { id: "outstanding", label: "Outstanding Requests" },
];

interface Props {
  segments: ChecklistSegment[];
  findingsBySegment: Record<string, ChecklistFinding[]>;
}

function FindingsTable({ findings, showSegment = false, segmentNameById }: {
  findings: (ChecklistFinding & { segmentName?: string })[];
  showSegment?: boolean;
  segmentNameById?: Record<string, string>;
}) {
  if (findings.length === 0) {
    return <p className="px-1 py-6 text-sm text-slate">No findings in this category.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wide text-slate">
            {showSegment && <th className="px-4 py-3 font-medium">Segment</th>}
            <th className="px-4 py-3 font-medium">Subsegment</th>
            <th className="px-4 py-3 font-medium">Verification point</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Evidence</th>
            <th className="px-4 py-3 font-medium">Analyst note</th>
          </tr>
        </thead>
        <tbody>
          {findings.map((finding) => (
            <tr key={finding.id} className="border-b border-border/60 align-top">
              {showSegment && (
                <td className="px-4 py-3 text-slate">
                  {segmentNameById?.[finding.segment_id] ?? "—"}
                </td>
              )}
              <td className="px-4 py-3 text-text">{finding.subsegment_name}</td>
              <td className="px-4 py-3 text-slate">{finding.verification_point}</td>
              <td className="px-4 py-3">
                <FindingStatusBadge status={finding.status} />
              </td>
              <td className="px-4 py-3 font-data text-xs text-slate">
                {finding.evidence_reference ?? "—"}
              </td>
              <td className="px-4 py-3 text-slate">{finding.analyst_note ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DealTabs({ segments, findingsBySegment }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("segments");

  const segmentNameById: Record<string, string> = Object.fromEntries(
    segments.map((s) => [s.id, s.segment_name]),
  );

  const allFindings = segments.flatMap((s) => findingsBySegment[s.id] ?? []);
  const riskFindings = allFindings.filter(
    (f) => f.status === "Red Flag" || f.status === "Exception",
  );
  const outstandingFindings = allFindings.filter((f) => f.status === "Outstanding");

  return (
    <div>
      <div className="flex gap-1 border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-blue text-text"
                : "border-transparent text-slate hover:text-text"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === "segments" && (
          <div className="space-y-5">
            {segments.length === 0 && (
              <p className="text-sm text-slate">No checklist segments yet.</p>
            )}
            {segments
              .sort((a, b) => a.segment_id - b.segment_id)
              .map((segment) => (
                <Card key={segment.id}>
                  <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
                    <h3 className="font-heading text-sm font-semibold text-text">
                      {segment.segment_id}. {segment.segment_name}
                    </h3>
                    <RagBadge rag={segment.segment_rag} />
                  </div>
                  <FindingsTable findings={findingsBySegment[segment.id] ?? []} />
                </Card>
              ))}
          </div>
        )}

        {activeTab === "risk" && (
          <Card>
            <FindingsTable
              findings={riskFindings}
              showSegment
              segmentNameById={segmentNameById}
            />
          </Card>
        )}

        {activeTab === "outstanding" && (
          <Card className="p-5">
            {outstandingFindings.length === 0 ? (
              <p className="text-sm text-slate">Nothing outstanding.</p>
            ) : (
              <ul className="space-y-3">
                {outstandingFindings.map((finding) => (
                  <li
                    key={finding.id}
                    className="flex items-start justify-between gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm text-text">{finding.verification_point}</p>
                      <p className="mt-1 font-data text-xs text-slate">
                        {segmentNameById[finding.segment_id]} &middot; {finding.subsegment_name}
                      </p>
                    </div>
                    <FindingStatusBadge status={finding.status} />
                  </li>
                ))}
              </ul>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
