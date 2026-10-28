import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { getAdminMetrics, getStorageMode } from '@/lib/storage';

export async function GET(req: Request) {
  const session = await verifyAdminSession(req);

  if (!session.isAdmin) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin authentication required.' },
      { status: 401 }
    );
  }

  const metrics = await getAdminMetrics();

  return NextResponse.json({
    success: true,
    mode: getStorageMode(),
    metrics,
  });
}
