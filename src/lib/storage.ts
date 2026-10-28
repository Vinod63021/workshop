import {
  AdminMetrics,
  AmbassadorStats,
  BudgetChannel,
  DailyRegistrationMetric,
  PaginatedStudents,
  Registration,
  RegistrationInput,
  RegistrationResult,
  SourceCategory,
  SourceMetric,
  StudentFilterParams,
} from './types';
import { generateSeedRegistrations, INITIAL_BUDGET_CHANNELS } from './seed-data';
import { getSupabaseAdminClient, getSupabasePublicClient, isSupabaseConfigured } from './supabase';
import { generateReferralCode, isValidEmail, mapSourceCategory, normalizeEmail } from './utils';

// Global singleton in-memory storage for demo simulation mode
interface GlobalStore {
  registrations: Registration[];
  budget: BudgetChannel[];
  initialized: boolean;
}

declare global {
  // eslint-disable-next-line no-var
  var __buildSprintStore: GlobalStore | undefined;
}

function getStore(): GlobalStore {
  if (!globalThis.__buildSprintStore || !globalThis.__buildSprintStore.initialized) {
    globalThis.__buildSprintStore = {
      registrations: generateSeedRegistrations(),
      budget: JSON.parse(JSON.stringify(INITIAL_BUDGET_CHANNELS)),
      initialized: true,
    };
  }
  return globalThis.__buildSprintStore;
}

export function getStorageMode(): 'supabase' | 'demo' {
  return isSupabaseConfigured() ? 'supabase' : 'demo';
}

export async function createRegistration(input: RegistrationInput): Promise<RegistrationResult> {
  const errors: Record<string, string> = {};

  const fullName = (input.full_name || '').trim();
  if (fullName.length < 2) {
    errors.full_name = 'Full name must be at least 2 characters.';
  }

  const rawEmail = input.email || '';
  const email = normalizeEmail(rawEmail);
  if (!isValidEmail(email)) {
    errors.email = 'Please provide a valid university or personal email address.';
  }

  const college = (input.college || '').trim();
  if (college.length < 2) {
    errors.college = 'College/university name is required.';
  }

  const branch = (input.branch || '').trim();
  if (!branch) {
    errors.branch = 'Please select your engineering branch.';
  }

  const gradYear = Number(input.graduation_year);
  if (![2024, 2025, 2026, 2027, 2028].includes(gradYear)) {
    errors.graduation_year = 'Please select a valid graduation year.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      fieldErrors: errors,
      error: 'Please fix the errors in the form.',
    };
  }

  const referralCode = generateReferralCode(fullName);
  const referredBy = input.referral_code?.trim().toUpperCase() || null;
  const determinedSource = mapSourceCategory(input.source, input.utm_source, Boolean(referredBy));

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabasePublicClient();
      if (!supabase) throw new Error('Supabase client failed to initialize');

      // Check duplicate
      const { data: existing } = await supabase
        .from('registrations')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (existing) {
        return {
          success: false,
          error: 'This email is already registered for the workshop. Check your inbox for confirmation details!',
        };
      }

      const newRecord = {
        full_name: fullName,
        email,
        college,
        branch,
        graduation_year: gradYear,
        referral_code: referralCode,
        referred_by_code: referredBy,
        source: determinedSource,
        utm_source: input.utm_source || null,
        utm_medium: input.utm_medium || null,
        utm_campaign: input.utm_campaign || null,
      };

      const { data, error } = await supabase
        .from('registrations')
        .insert(newRecord)
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          return {
            success: false,
            error: 'This email is already registered for the workshop.',
          };
        }
        return {
          success: false,
          error: `Registration failed: ${error.message}`,
        };
      }

      return {
        success: true,
        registration: data as Registration,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Database error';
      return {
        success: false,
        error: `Database connection error: ${msg}. Please try again.`,
      };
    }
  }

  // Demo store mode
  const store = getStore();

  const isDuplicate = store.registrations.some(
    (r) => normalizeEmail(r.email) === email
  );

  if (isDuplicate) {
    return {
      success: false,
      error: 'This email is already registered for the workshop. Check your inbox or use a different email to register.',
    };
  }

  const newReg: Registration = {
    id: `reg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    full_name: fullName,
    email,
    college,
    branch,
    graduation_year: gradYear,
    referral_code: referralCode,
    referred_by_code: referredBy,
    source: determinedSource,
    utm_source: input.utm_source || null,
    utm_medium: input.utm_medium || null,
    utm_campaign: input.utm_campaign || null,
    created_at: new Date().toISOString(),
    is_demo: false, // Live submitted record
  };

  store.registrations.unshift(newReg);

  // Update budget channel registrations count
  const budgetChannel = store.budget.find((b) => b.category === determinedSource);
  if (budgetChannel) {
    budgetChannel.registrations += 1;
    if (budgetChannel.actual_spend > 0) {
      budgetChannel.cost_per_registration = Number(
        (budgetChannel.actual_spend / budgetChannel.registrations).toFixed(2)
      );
    }
  }

  return {
    success: true,
    registration: newReg,
  };
}

export async function getRegistrations(
  params: StudentFilterParams = {}
): Promise<PaginatedStudents> {
  const {
    search = '',
    graduation_year = '',
    source = '',
    sort_by = 'created_at',
    sort_order = 'desc',
    page = 1,
    limit = 20,
  } = params;

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdminClient();
    if (supabase) {
      let query = supabase.from('registrations').select('*', { count: 'exact' });

      if (search.trim()) {
        const term = `%${search.trim().toLowerCase()}%`;
        query = query.or(
          `full_name.ilike.${term},email.ilike.${term},college.ilike.${term},branch.ilike.${term},referral_code.ilike.${term}`
        );
      }

      if (graduation_year) {
        query = query.eq('graduation_year', Number(graduation_year));
      }

      if (source && source !== 'all') {
        query = query.eq('source', source);
      }

      query = query.order(sort_by, { ascending: sort_order === 'asc' });

      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, count, error } = await query;
      if (!error && data) {
        return {
          students: data as Registration[],
          total: count || 0,
          page,
          limit,
          total_pages: Math.ceil((count || 0) / limit),
        };
      }
    }
  }

  // Demo store mode
  const store = getStore();
  let list = [...store.registrations];

  if (search.trim()) {
    const term = search.trim().toLowerCase();
    list = list.filter(
      (r) =>
        r.full_name.toLowerCase().includes(term) ||
        r.email.toLowerCase().includes(term) ||
        r.college.toLowerCase().includes(term) ||
        r.branch.toLowerCase().includes(term) ||
        r.referral_code.toLowerCase().includes(term) ||
        (r.referred_by_code && r.referred_by_code.toLowerCase().includes(term))
    );
  }

  if (graduation_year && graduation_year !== 'all') {
    list = list.filter((r) => r.graduation_year === Number(graduation_year));
  }

  if (source && source !== 'all') {
    list = list.filter((r) => r.source === source);
  }

  list.sort((a, b) => {
    let comp = 0;
    if (sort_by === 'created_at') {
      comp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    } else if (sort_by === 'full_name') {
      comp = a.full_name.localeCompare(b.full_name);
    } else if (sort_by === 'college') {
      comp = a.college.localeCompare(b.college);
    }
    return sort_order === 'asc' ? comp : -comp;
  });

  const total = list.length;
  const startIndex = (page - 1) * limit;
  const paginated = list.slice(startIndex, startIndex + limit);

  return {
    students: paginated,
    total,
    page,
    limit,
    total_pages: Math.max(1, Math.ceil(total / limit)),
  };
}

export async function getAllRegistrationsForExport(
  params: StudentFilterParams = {}
): Promise<Registration[]> {
  const result = await getRegistrations({ ...params, page: 1, limit: 10000 });
  return result.students;
}

export async function getAdminMetrics(): Promise<AdminMetrics> {
  const TARGET_GOAL = 500;
  const CAMPAIGN_DAYS = 7;
  const CURRENT_DAY = 4; // Configurable current progress day

  let allRegistrations: Registration[] = [];
  let budgetChannels: BudgetChannel[] = [];

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdminClient();
    if (supabase) {
      const { data: regs } = await supabase.from('registrations').select('*');
      if (regs) allRegistrations = regs as Registration[];

      const { data: budget } = await supabase.from('campaign_budget').select('*');
      if (budget) budgetChannels = budget as BudgetChannel[];
    }
  }

  if (allRegistrations.length === 0) {
    const store = getStore();
    allRegistrations = store.registrations;
    budgetChannels = store.budget;
  }

  const totalRegistrations = allRegistrations.length;
  const targetPercentage = Number(Math.min(100, (totalRegistrations / TARGET_GOAL) * 100).toFixed(1));
  const remainingRegistrations = Math.max(0, TARGET_GOAL - totalRegistrations);
  const remainingDays = Math.max(1, CAMPAIGN_DAYS - CURRENT_DAY);
  const dailyRunRateNeeded = Math.ceil(remainingRegistrations / remainingDays);
  const actualDailyRunRate = Number((totalRegistrations / CURRENT_DAY).toFixed(1));

  // Sources breakdown
  const sourceCounts: Record<string, number> = {
    'college club': 0,
    'student referral': 0,
    'email': 0,
    'WhatsApp/community': 0,
    'paid promotion': 0,
    'other': 0,
  };

  for (const r of allRegistrations) {
    if (sourceCounts[r.source] !== undefined) {
      sourceCounts[r.source]++;
    } else {
      sourceCounts['other']++;
    }
  }

  const sources: SourceMetric[] = Object.entries(sourceCounts).map(([src, count]) => ({
    source: src as SourceCategory,
    count,
    percentage: totalRegistrations > 0 ? Number(((count / totalRegistrations) * 100).toFixed(1)) : 0,
  }));

  // Timeline across 7 days
  const baseDate = new Date('2026-10-24T00:00:00Z');
  const timeline: DailyRegistrationMetric[] = [];
  let runningCumulative = 0;

  for (let day = 1; day <= CAMPAIGN_DAYS; day++) {
    const dayDate = new Date(baseDate.getTime() + (day - 1) * 86400000);
    const dateStr = dayDate.toISOString().split('T')[0];

    // Filter registrations on this day
    const dayRegs = allRegistrations.filter((r) => {
      const rDate = new Date(r.created_at).toISOString().split('T')[0];
      return rDate === dateStr;
    });

    const dayCount = day <= CURRENT_DAY ? dayRegs.length : 0;
    runningCumulative += dayCount;

    timeline.push({
      date: dateStr,
      day_label: `Day ${day}`,
      count: dayCount,
      cumulative: runningCumulative,
      target_run_rate: Math.round((TARGET_GOAL / CAMPAIGN_DAYS) * day),
    });
  }

  // Top Ambassadors / Referral Leaderboard
  const referralCounts: Record<string, number> = {};
  for (const r of allRegistrations) {
    if (r.referred_by_code) {
      referralCounts[r.referred_by_code] = (referralCounts[r.referred_by_code] || 0) + 1;
    }
  }

  const topAmbassadors: AmbassadorStats[] = Object.entries(referralCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([code, count]) => {
      const owner = allRegistrations.find((r) => r.referral_code === code);
      return {
        referral_code: code,
        student_name: owner ? owner.full_name : 'Student Ambassador',
        college: owner ? owner.college : 'Engineering Campus',
        referrals_count: count,
      };
    });

  // Recent registrations (latest 8)
  const recentRegistrations = [...allRegistrations]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 8);

  // Budget summary
  const totalBudget = 2000;
  const plannedTotal = budgetChannels.reduce((sum, b) => sum + Number(b.planned_spend), 0);
  const actualSpent = budgetChannels.reduce((sum, b) => sum + Number(b.actual_spend), 0);
  const remainingBudget = totalBudget - actualSpent;
  const blendedCpr = totalRegistrations > 0 ? Number((actualSpent / totalRegistrations).toFixed(2)) : null;

  return {
    total_registrations: totalRegistrations,
    target_goal: TARGET_GOAL,
    target_percentage: targetPercentage,
    campaign_days_total: CAMPAIGN_DAYS,
    current_campaign_day: CURRENT_DAY,
    remaining_registrations: remainingRegistrations,
    daily_run_rate_needed: dailyRunRateNeeded,
    actual_daily_run_rate: actualDailyRunRate,
    sources,
    timeline,
    top_ambassadors: topAmbassadors,
    recent_registrations: recentRegistrations,
    budget_summary: {
      total_budget: totalBudget,
      planned_total: plannedTotal,
      actual_spent: actualSpent,
      remaining_budget: remainingBudget,
      blended_cpr: blendedCpr,
    },
  };
}

export async function getBudgetChannels(): Promise<BudgetChannel[]> {
  const store = getStore();
  // Recalculate registrations per category
  for (const b of store.budget) {
    b.registrations = store.registrations.filter((r) => r.source === b.category).length;
    if (b.actual_spend > 0 && b.registrations > 0) {
      b.cost_per_registration = Number((b.actual_spend / b.registrations).toFixed(2));
    } else if (b.actual_spend === 0) {
      b.cost_per_registration = 0;
    } else {
      b.cost_per_registration = null;
    }
  }
  return store.budget;
}

export async function updateBudgetChannel(
  id: string,
  updates: Partial<BudgetChannel>
): Promise<BudgetChannel | null> {
  const store = getStore();
  const channel = store.budget.find((b) => b.id === id);
  if (!channel) return null;

  if (updates.planned_spend !== undefined) {
    channel.planned_spend = Number(updates.planned_spend);
  }
  if (updates.actual_spend !== undefined) {
    channel.actual_spend = Number(updates.actual_spend);
  }
  if (updates.notes !== undefined) {
    channel.notes = updates.notes;
  }
  if (updates.is_assumption !== undefined) {
    channel.is_assumption = Boolean(updates.is_assumption);
  }

  // Recalculate CPR
  if (channel.actual_spend > 0 && channel.registrations > 0) {
    channel.cost_per_registration = Number((channel.actual_spend / channel.registrations).toFixed(2));
  } else if (channel.actual_spend === 0) {
    channel.cost_per_registration = 0;
  } else {
    channel.cost_per_registration = null;
  }

  return channel;
}

export async function resetDemoStore(): Promise<void> {
  globalThis.__buildSprintStore = {
    registrations: generateSeedRegistrations(),
    budget: JSON.parse(JSON.stringify(INITIAL_BUDGET_CHANNELS)),
    initialized: true,
  };
}
