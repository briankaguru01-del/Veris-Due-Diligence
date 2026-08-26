"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { COUNTRIES } from "@/lib/config";
import { FormCard, Eyebrow } from "@/components/Card";
import { Button } from "@/components/Button";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Kenya");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          full_name: fullName,
          phone,
          company,
          country,
        },
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
            <Eyebrow>Create an account</Eyebrow>
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
                Open it on this device to finish setting up your account.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h1 className="font-heading text-xl font-semibold text-text">
                Start a deal
              </h1>

              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-text">
                  Full name
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-border bg-navy-deep px-3 py-2.5 text-sm text-text outline-none focus:border-blue-dim"
                />
              </div>

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
                <p className="mt-1.5 text-xs text-slate">
                  Used to sign in and to deliver your due-diligence reports.
                </p>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-text">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-border bg-navy-deep px-3 py-2.5 text-sm text-text outline-none focus:border-blue-dim"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-text">
                  Country
                </label>
                <select
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-border bg-navy-deep px-3 py-2.5 text-sm text-text outline-none focus:border-blue-dim"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-text">
                  Company name
                </label>
                <input
                  id="company"
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-border bg-navy-deep px-3 py-2.5 text-sm text-text outline-none focus:border-blue-dim"
                />
              </div>

              {error && <p className="text-sm text-red">{error}</p>}

              <Button type="submit" disabled={loading} className="w-full justify-center">
                {loading ? "Sending link…" : "Create account"}
              </Button>

              <p className="text-center text-sm text-slate">
                Already have an account?{" "}
                <Link href="/login" className="text-blue hover:text-blue-dim">
                  Log in
                </Link>
              </p>
            </form>
          )}
        </FormCard>
      </div>
    </main>
  );
}
