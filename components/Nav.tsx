import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LinkButton } from "@/components/Button";

export async function Nav() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-navy-deep/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-heading text-lg font-semibold tracking-tight text-text">
          Veris
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/#offer" className="text-sm text-slate transition-colors hover:text-text">
            What We Offer
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm text-slate transition-colors hover:text-text"
          >
            How It Works
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <LinkButton href="/dashboard" withArrow={false} className="px-4 py-2 text-sm">
              Dashboard
            </LinkButton>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-slate transition-colors hover:text-text"
              >
                Log in
              </Link>
              <LinkButton href="/signup" withArrow={false} className="px-4 py-2 text-sm">
                Start a deal
              </LinkButton>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
