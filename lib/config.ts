// Single flag gating the subscription/payment check across every protected
// page. Flip to true once billing is actually wired up.
export const REQUIRE_PAYMENT = false;

export const SECTORS = {
  MFI: "Financial Services & Fintech — Microfinance Institution/SACCO",
  BANK: "Financial Services & Fintech — Investment Banks",
} as const;

export const COUNTRIES = [
  "Kenya",
  "Nigeria",
  "Ghana",
  "South Africa",
  "Rwanda",
  "Uganda",
  "Tanzania",
  "Côte d'Ivoire",
  "Other",
] as const;
