"use client";

import { useState } from "react";

export function DownloadPdfButton() {
  const [showNotice, setShowNotice] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotice((v) => !v)}
        className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium text-text transition-colors hover:border-blue-dim"
      >
        Download PDF
      </button>
      {showNotice && (
        <div className="absolute right-0 top-full z-10 mt-2 w-72 rounded-lg border border-border bg-navy-card p-4 text-sm text-slate shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          Report storage isn&apos;t set up yet — there&apos;s no PDF to download for this
          deal at the moment. This will link to a generated report once that&apos;s built.
        </div>
      )}
    </div>
  );
}
