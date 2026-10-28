import { cookies } from 'next/headers';
import { getSupabaseAdminClient, isSupabaseConfigured } from './supabase';
import { ADMIN_COOKIE_NAME, DEMO_ADMIN_CREDENTIALS } from './auth-constants';

export { ADMIN_COOKIE_NAME, DEMO_ADMIN_CREDENTIALS };

export interface AdminSession {
  isAdmin: boolean;
  email?: string;
  mode: 'supabase' | 'demo';
}

export async function verifyAdminSession(req?: Request): Promise<AdminSession> {
  // Check cookie
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    // If request headers contain Authorization Bearer token
    if (req) {
      const authHeader = req.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        if (token === 'demo-admin-token-valid') {
          return { isAdmin: true, email: DEMO_ADMIN_CREDENTIALS.email, mode: 'demo' };
        }
      }
    }
    return { isAdmin: false, mode: isSupabaseConfigured() ? 'supabase' : 'demo' };
  }

  // Parse session cookie
  try {
    const parsed = JSON.parse(Buffer.from(sessionCookie, 'base64').toString('utf-8'));
    if (!parsed || !parsed.email || !parsed.exp) {
      return { isAdmin: false, mode: isSupabaseConfigured() ? 'supabase' : 'demo' };
    }

    if (Date.now() > parsed.exp) {
      return { isAdmin: false, mode: isSupabaseConfigured() ? 'supabase' : 'demo' };
    }

    if (isSupabaseConfigured()) {
      // In Supabase mode, verify that the email exists in app_admins table
      const supabase = getSupabaseAdminClient();
      if (supabase) {
        const { data: adminRecord } = await supabase
          .from('app_admins')
          .select('id, role')
          .eq('email', parsed.email.toLowerCase())
          .maybeSingle();

        if (adminRecord && adminRecord.role === 'admin') {
          return { isAdmin: true, email: parsed.email, mode: 'supabase' };
        }
      }
      return { isAdmin: false, mode: 'supabase' };
    }

    // Demo Mode session
    if (parsed.email === DEMO_ADMIN_CREDENTIALS.email || parsed.role === 'admin') {
      return { isAdmin: true, email: parsed.email, mode: 'demo' };
    }

    return { isAdmin: false, mode: 'demo' };
  } catch {
    return { isAdmin: false, mode: isSupabaseConfigured() ? 'supabase' : 'demo' };
  }
}

export function createSessionCookieValue(email: string, role = 'admin'): string {
  const payload = {
    email,
    role,
    exp: Date.now() + 1000 * 60 * 60 * 24, // 24 hours
    mode: isSupabaseConfigured() ? 'supabase' : 'demo',
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}
