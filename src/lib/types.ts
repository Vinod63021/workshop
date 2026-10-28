export type SourceCategory =
  | 'college club'
  | 'student referral'
  | 'email'
  | 'WhatsApp/community'
  | 'paid promotion'
  | 'other';

export const ALLOWED_SOURCES: SourceCategory[] = [
  'college club',
  'student referral',
  'email',
  'WhatsApp/community',
  'paid promotion',
  'other',
];

export const GRADUATION_YEARS = [2025, 2026, 2027] as const;
export type GraduationYear = (typeof GRADUATION_YEARS)[number];

export const ENGINEERING_BRANCHES = [
  'Computer Science & Engineering (CSE)',
  'Information Technology (IT)',
  'Artificial Intelligence & Data Science (AI/DS)',
  'Electronics & Communication (ECE)',
  'Electrical & Electronics (EEE)',
  'Mechanical Engineering (ME)',
  'Civil Engineering (CE)',
  'Biotechnology / Chemical Engineering',
  'Other Engineering Branch',
] as const;

export interface Registration {
  id: string;
  full_name: string;
  email: string;
  college: string;
  branch: string;
  graduation_year: number;
  referral_code: string;
  referred_by_code: string | null;
  source: SourceCategory;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  created_at: string;
  is_demo?: boolean;
}

export interface RegistrationInput {
  full_name: string;
  email: string;
  college: string;
  branch: string;
  graduation_year: number;
  referral_code?: string; // referred by someone
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface RegistrationResult {
  success: boolean;
  registration?: Registration;
  error?: string;
  fieldErrors?: Record<string, string>;
}

export interface AmbassadorStats {
  referral_code: string;
  student_name: string;
  college: string;
  referrals_count: number;
}

export interface SourceMetric {
  source: SourceCategory;
  count: number;
  percentage: number;
}

export interface DailyRegistrationMetric {
  date: string;
  day_label: string; // "Day 1", "Day 2", etc.
  count: number;
  cumulative: number;
  target_run_rate: number;
}

export interface BudgetChannel {
  id: string;
  channel_name: string;
  category: SourceCategory;
  planned_spend: number;
  actual_spend: number;
  registrations: number;
  cost_per_registration: number | null; // null if 0 registrations or no spend
  notes: string;
  is_assumption: boolean;
}

export interface AdminMetrics {
  total_registrations: number;
  target_goal: number; // 500
  target_percentage: number;
  campaign_days_total: number; // 7 days
  current_campaign_day: number; // e.g. Day 4
  remaining_registrations: number;
  daily_run_rate_needed: number;
  actual_daily_run_rate: number;
  sources: SourceMetric[];
  timeline: DailyRegistrationMetric[];
  top_ambassadors: AmbassadorStats[];
  recent_registrations: Registration[];
  budget_summary: {
    total_budget: number; // ₹2000
    planned_total: number;
    actual_spent: number;
    remaining_budget: number;
    blended_cpr: number | null;
  };
}

export interface StudentFilterParams {
  search?: string;
  graduation_year?: string;
  source?: string;
  sort_by?: 'created_at' | 'full_name' | 'college';
  sort_order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface PaginatedStudents {
  students: Registration[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}
