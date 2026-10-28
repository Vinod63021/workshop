import { ALLOWED_SOURCES, SourceCategory } from './types';

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(normalizeEmail(email));
}

export function generateReferralCode(name: string): string {
  // Take first 3 letters of name without spaces, uppercase
  const prefix = name
    .replace(/[^a-zA-Z]/g, '')
    .substring(0, 3)
    .toUpperCase()
    .padEnd(3, 'AI');
  // Random 4 digit alphanumeric
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `BS-${prefix}-${rand}`;
}

export function mapSourceCategory(
  rawSource?: string | null,
  utmSource?: string | null,
  hasReferralCode: boolean = false
): SourceCategory {
  if (hasReferralCode) {
    return 'student referral';
  }

  const candidate = (utmSource || rawSource || '').toLowerCase().trim();

  if (!candidate) {
    return 'other';
  }

  if (
    candidate.includes('club') ||
    candidate.includes('ieee') ||
    candidate.includes('gdsc') ||
    candidate.includes('acm') ||
    candidate.includes('campus_ambassador')
  ) {
    return 'college club';
  }

  if (
    candidate.includes('referral') ||
    candidate.includes('friend') ||
    candidate.includes('ref')
  ) {
    return 'student referral';
  }

  if (candidate.includes('mail') || candidate.includes('newsletter')) {
    return 'email';
  }

  if (
    candidate.includes('whatsapp') ||
    candidate.includes('wa') ||
    candidate.includes('community') ||
    candidate.includes('telegram') ||
    candidate.includes('group')
  ) {
    return 'WhatsApp/community';
  }

  if (
    candidate.includes('ad') ||
    candidate.includes('paid') ||
    candidate.includes('meta') ||
    candidate.includes('instagram') ||
    candidate.includes('facebook') ||
    candidate.includes('linkedin_ad')
  ) {
    return 'paid promotion';
  }

  for (const allowed of ALLOWED_SOURCES) {
    if (allowed.toLowerCase() === candidate) {
      return allowed;
    }
  }

  return 'other';
}

export function formatCurrencyINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 1,
  }).format(amount);
}

export function formatDateIndian(isoDate: string): string {
  try {
    const d = new Date(isoDate);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(d);
  } catch {
    return isoDate;
  }
}

export function sanitizeCsvField(field: unknown): string {
  if (field === null || field === undefined) return '""';
  const str = String(field).replace(/"/g, '""');
  return `"${str}"`;
}
