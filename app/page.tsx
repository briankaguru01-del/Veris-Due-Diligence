import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Card, Eyebrow } from "@/components/Card";
import { LinkButton } from "@/components/Button";
import { HeroChecklist } from "@/components/HeroChecklist";

const OFFERINGS = [
  {
    title: "Structured checklist review",
    body: "Every data room is run against a fixed due-diligence checklist built for financial institutions — corporate, regulatory, financial, and legal segments, not a generic document scan.",
  },
  {
    title: "Automatic red-flag detection",
    body: "Missing licenses, unreconciled shareholder registers, related-party exposure — Veris flags what would take an associate a full day to find, in minutes.",
  },
  {
    title: "Reports on demand",
    body: "A Red/Amber/Green rating with a written recommendation, backed by evidence references back to the source documents in the data room.",
  },
  {
    title: "Built for the jurisdiction",
    body: "Checklist logic accounts for CBK, SASRA, and CMA requirements from day one — Kenyan financial services and fintech, not a US template with the labels swapped.",
  },
];

const STEPS = [
  { label: "Upload", body: "Analyst submits the data room through a single upload form." },
  { label: "Classify", body: "Veris sorts documents against the checklist's corporate, financial, regulatory, and legal segments." },
  { label: "Analyze", body: "Each verification point is checked for evidence, exceptions, and red flags." },
  { label: "Report", body: "A segment-by-segment RAG report is ready, with a chat interface for follow-up questions." },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Eyebrow>Financial Services &amp; Fintech Due Diligence</Eyebrow>
              <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight tracking-tight text-text sm:text-5xl">
                Due diligence, done at the pace of the deal.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate">
                Upload a data room and Veris analyzes it against a full financial-services
                due-diligence checklist — surfacing exceptions and red flags with evidence
                references, and a Red/Amber/Green rating your team can act on the same day.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <LinkButton href="/signup">Start a deal</LinkButton>
                <LinkButton href="#how-it-works" variant="secondary" withArrow={false}>
                  See how it works
                </LinkButton>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <HeroChecklist />
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section id="offer" className="border-t border-border/60 bg-navy-mid/40">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <Eyebrow>What We Offer</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-text">
              Everything a deal team needs from a first-pass review.
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {OFFERINGS.map((item) => (
                <Card key={item.title} className="p-6">
                  <h3 className="font-heading text-base font-semibold text-text">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{item.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-20">
          <Eyebrow>How It Works</Eyebrow>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-text">
            From data room to report.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => {
              const isLast = i === STEPS.length - 1;
              return (
                <div key={step.label} className="flex items-center gap-4">
                  <Card
                    className={`flex-1 p-5 ${isLast ? "border-green/50" : ""}`}
                  >
                    <p className="font-data text-xs text-slate">Step {i + 1}</p>
                    <h3
                      className={`mt-1 font-heading text-lg font-semibold ${
                        isLast ? "text-green" : "text-text"
                      }`}
                    >
                      {step.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate">{step.body}</p>
                  </Card>
                  {!isLast && (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="hidden shrink-0 text-slate lg:block"
                      aria-hidden
                    >
                      <path
                        d="M2 10H18M18 10L12 4M18 10L12 16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="border-t border-border/60 bg-navy-mid/40">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-20 text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              Ready to see the checklist run on your next deal?
            </h2>
            <p className="max-w-xl text-base text-slate">
              Set up an account and start a deal — your analyst gets a data-room upload link
              in the next screen.
            </p>
            <LinkButton href="/signup">Start a deal</LinkButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
