import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { getRegistrations } from '@/lib/storage';
import { StudentFilterParams } from '@/lib/types';

export async function GET(req: NextRequest) {
  const session = await verifyAdminSession(req);

  if (!session.isAdmin) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin authentication required.' },
      { status: 401 }
    );
  }

  const searchParams = req.nextUrl.searchParams;

  const filters: StudentFilterParams = {
    search: searchParams.get('search') || '',
    graduation_year: searchParams.get('graduation_year') || '',
    source: searchParams.get('source') || '',
    sort_by: (searchParams.get('sort_by') as 'created_at' | 'full_name' | 'college') || 'created_at',
    sort_order: (searchParams.get('sort_order') as 'asc' | 'desc') || 'desc',
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 20,
  };

  const paginated = await getRegistrations(filters);

  return NextResponse.json({
    success: true,
    ...paginated,
  });
}
