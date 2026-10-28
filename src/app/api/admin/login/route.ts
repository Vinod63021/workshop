import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE_NAME, createSessionCookieValue, DEMO_ADMIN_CREDENTIALS } from '@/lib/auth';
import { getSupabaseAdminClient, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    // If Supabase is configured, authenticate via Supabase Auth
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdminClient();
      if (!supabase) {
        return NextResponse.json(
          { success: false, error: 'Supabase client unavailable' },
          { status: 500 }
        );
      }

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (authError || !authData.user) {
        return NextResponse.json(
          { success: false, error: authError?.message || 'Invalid email or password' },
          { status: 401 }
        );
      }

      // Verify that the user has admin role in app_admins table
      const { data: adminRecord, error: adminError } = await supabase
        .from('app_admins')
        .select('id, role')
        .eq('id', authData.user.id)
        .maybeSingle();

      if (adminError || !adminRecord || adminRecord.role !== 'admin') {
        return NextResponse.json(
          { success: false, error: 'Access denied: You do not have administrator permissions.' },
          { status: 403 }
        );
      }

      const cookieStore = await cookies();
      const cookieValue = createSessionCookieValue(trimmedEmail, 'admin');
      cookieStore.set(ADMIN_COOKIE_NAME, cookieValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return NextResponse.json({
        success: true,
        user: { email: trimmedEmail, role: 'admin' },
        mode: 'supabase',
      });
    }

    // Demo Mode Authentication
    if (
      trimmedEmail === DEMO_ADMIN_CREDENTIALS.email.toLowerCase() &&
      password === DEMO_ADMIN_CREDENTIALS.password
    ) {
      const cookieStore = await cookies();
      const cookieValue = createSessionCookieValue(trimmedEmail, 'admin');
      cookieStore.set(ADMIN_COOKIE_NAME, cookieValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return NextResponse.json({
        success: true,
        user: { email: trimmedEmail, role: 'admin' },
        mode: 'demo',
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid admin credentials. Use the Demo Credentials shown on the screen.',
      },
      { status: 401 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Login error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
