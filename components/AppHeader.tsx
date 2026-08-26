import Link from "next/link";
import { SignOutButton } from "@/components/SignOutButton";

export function AppHeader({ companyName }: { companyName: string | null }) {
  return (
    <header className="border-b border-border/60 bg-navy-deep/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="font-heading text-lg font-semibold text-text">
            Veris
          </Link>
          {companyName && (
            <span className="font-data text-xs uppercase tracking-[0.1em] text-slate">
              {companyName}
            </span>
          )}
        </div>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-sm text-slate transition-colors hover:text-text">
            Dashboard
          </Link>
          <Link href="/billing" className="text-sm text-slate transition-colors hover:text-text">
            Billing
          </Link>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
