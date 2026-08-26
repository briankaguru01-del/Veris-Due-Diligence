export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-border bg-navy-mid shadow-[0_8px_30px_rgba(0,0,0,0.35)] ${className}`}
    >
      {children}
    </div>
  );
}

export function FormCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative rounded-xl ${className}`}>
      <div
        className="absolute inset-x-0 top-0 h-px rounded-t-xl bg-gradient-to-r from-blue via-blue/40 to-gold"
        aria-hidden
      />
      <div className="rounded-xl border border-border bg-navy-card p-8 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
        {children}
      </div>
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-data text-xs font-medium uppercase tracking-[0.14em] text-gold">
      {children}
    </p>
  );
}
