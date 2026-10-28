import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { getAllRegistrationsForExport } from '@/lib/storage';
import { sanitizeCsvField } from '@/lib/utils';

export async function GET(req: NextRequest) {
  const session = await verifyAdminSession(req);

  if (!session.isAdmin) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin authentication required.' },
      { status: 401 }
    );
  }

  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get('search') || '';
  const graduation_year = searchParams.get('graduation_year') || '';
  const source = searchParams.get('source') || '';

  const students = await getAllRegistrationsForExport({
    search,
    graduation_year,
    source,
    sort_by: 'created_at',
    sort_order: 'desc',
  });

  const headers = [
    'Registration ID',
    'Full Name',
    'Email Address',
    'College / University',
    'Engineering Branch',
    'Graduation Year',
    'Acquisition Source',
    'Referral Code',
    'Referred By Code',
    'UTM Source',
    'UTM Medium',
    'UTM Campaign',
    'Registered At (UTC)',
    'Record Type',
  ];

  const rows = students.map((s) => [
    sanitizeCsvField(s.id),
    sanitizeCsvField(s.full_name),
    sanitizeCsvField(s.email),
    sanitizeCsvField(s.college),
    sanitizeCsvField(s.branch),
    sanitizeCsvField(s.graduation_year),
    sanitizeCsvField(s.source),
    sanitizeCsvField(s.referral_code),
    sanitizeCsvField(s.referred_by_code || ''),
    sanitizeCsvField(s.utm_source || ''),
    sanitizeCsvField(s.utm_medium || ''),
    sanitizeCsvField(s.utm_campaign || ''),
    sanitizeCsvField(s.created_at),
    sanitizeCsvField(s.is_demo ? 'Demo Seed' : 'Live Submission'),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

  const today = new Date().toISOString().split('T')[0];
  const filename = `buildsprint_registrations_${today}.csv`;

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
