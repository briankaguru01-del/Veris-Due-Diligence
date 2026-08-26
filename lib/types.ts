export type RAG = "Green" | "Amber" | "Red";

export type DealStatus = "uploaded" | "processing" | "complete";

export type FindingStatus =
  | "Confirmed"
  | "Outstanding"
  | "Exception"
  | "Red Flag"
  | "Not Applicable";

export type SubscriptionStatus = "pending" | "active" | "cancelled";

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  company: string | null;
  country: string | null;
  email: string | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  status: SubscriptionStatus;
  plan: string | null;
  flutterwave_reference: string | null;
  created_at: string;
  updated_at: string;
}

export interface Deal {
  id: string;
  user_id: string;
  company_name: string;
  sector: string;
  status: DealStatus;
  overall_rag: RAG | null;
  recommendation: string | null;
  legacy_deal_id: string;
  created_at: string;
  updated_at: string;
}

export interface ChecklistSegment {
  id: string;
  deal_id: string;
  segment_id: number;
  segment_name: string;
  segment_rag: RAG;
  created_at: string;
}

export interface ChecklistFinding {
  id: string;
  segment_id: string;
  subsegment_name: string;
  verification_point: string;
  status: FindingStatus;
  evidence_reference: string | null;
  analyst_note: string | null;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  deal_id: string;
  sender: "analyst" | "veris";
  message: string;
  created_at: string;
}
