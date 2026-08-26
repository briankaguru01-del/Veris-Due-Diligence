"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/Card";

interface Item {
  label: string;
  status: "Confirmed" | "Outstanding";
}

const INITIAL_ITEMS: Item[] = [
  { label: "Shareholder register reconciled", status: "Confirmed" },
  { label: "CBK / SASRA licensing status", status: "Outstanding" },
  { label: "AML/KYC policy on file", status: "Outstanding" },
];

function StatusPill({ status }: { status: Item["status"] }) {
  const isConfirmed = status === "Confirmed";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-data text-[11px] font-medium transition-colors duration-500 ${
        isConfirmed ? "bg-green-bg text-green" : "bg-white/[0.04] text-slate"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
          isConfirmed ? "bg-green" : "bg-slate"
        }`}
      />
      {status}
    </span>
  );
}

export function HeroChecklist() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems((prev) =>
        prev.map((item, i) => (i === 1 ? { ...item, status: "Confirmed" } : item)),
      );
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="w-full max-w-sm p-5">
      <p className="font-data text-[11px] uppercase tracking-[0.14em] text-slate">
        Segment 3 &middot; Regulatory Compliance
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex items-center justify-between gap-4 rounded-lg border border-border/70 bg-navy-deep/40 px-3 py-2.5"
          >
            <span className="text-sm text-text">{item.label}</span>
            <StatusPill status={item.status} />
          </li>
        ))}
      </ul>
    </Card>
  );
}
