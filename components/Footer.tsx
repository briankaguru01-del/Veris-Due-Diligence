export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate sm:flex-row">
        <p className="font-heading font-semibold text-text">Veris</p>
        <p className="font-data text-xs">
          Financial Services &amp; Fintech due diligence for African M&amp;A. Kenya first.
        </p>
        <p className="text-xs">&copy; {new Date().getFullYear()} Veris. All rights reserved.</p>
      </div>
    </footer>
  );
}
