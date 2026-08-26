import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

const VARIANT_STYLES: Record<Variant, string> = {
  primary:
    "bg-blue text-navy-deep shadow-[0_0_24px_rgba(0,194,255,0.35)] hover:bg-blue-dim",
  secondary:
    "bg-transparent border border-border text-text hover:border-blue-dim",
  ghost: "bg-transparent text-slate hover:text-text",
};

const baseClasses =
  "group inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium font-body transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed";

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="transition-transform duration-150 group-hover:translate-x-1"
      aria-hidden
    >
      <path
        d="M1 7H13M13 7L8 2M13 7L8 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface CommonProps {
  variant?: Variant;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  withArrow = true,
  className = "",
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${baseClasses} ${VARIANT_STYLES[variant]} ${className}`}
      {...rest}
    >
      {children}
      {withArrow && <Arrow />}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  withArrow = true,
  className = "",
  children,
  external = false,
}: CommonProps & { href: string; external?: boolean }) {
  const classes = `${baseClasses} ${VARIANT_STYLES[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} className={classes}>
        {children}
        {withArrow && <Arrow />}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {withArrow && <Arrow />}
    </Link>
  );
}
