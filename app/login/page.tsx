"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { FormCard, Eyebrow } from "@/components/Card";
import { Button } from "@/components/Button";

const CALLBACK_ERROR_MESSAGE =
  "That sign-in link didn't work — it may have expired or already been used. Request a new one below.";

function getInitialError(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("error") === "auth_callback_failed" ? CALLBACK_ERROR_MESSAGE : null;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(getInitialError);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    setSubmitted(true);
  }

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="font-heading text-lg font-semibold text-text">
            Veris
          </Link>
          <div className="mt-3">
            <Eyebrow>Log in</Eyebrow>
          </div>
        </div>

        <FormCard>
          {submitted ? (
            <div className="text-center">
              <h1 className="font-heading text-xl font-semibold text-text">
                Check your email
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                We&apos;ve sent a sign-in link to <span className="text-text">{email}</span>.
                Open it on this device to continue.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h1 className="font-heading text-xl font-semibold text-text">
                Welcome back
              </h1>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text">
                  Work email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-border bg-navy-deep px-3 py-2.5 text-sm text-text outline-none focus:border-blue-dim"
                />
              </div>

              {error && <p className="text-sm text-red">{error}</p>}

              <Button type="submit" disabled={loading} className="w-full justify-center">
                {loading ? "Sending link…" : "Send sign-in link"}
              </Button>

              <p className="text-center text-sm text-slate">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-blue hover:text-blue-dim">
                  Sign up
                </Link>
              </p>
            </form>
          )}
        </FormCard>
      </div>
    </main>
  );
}
