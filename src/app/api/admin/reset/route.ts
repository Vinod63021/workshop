import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { resetDemoStore } from '@/lib/storage';

export async function POST(req: Request) {
  const session = await verifyAdminSession(req);

  if (!session.isAdmin) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin authentication required.' },
      { status: 401 }
    );
  }

  await resetDemoStore();
  return NextResponse.json({ success: true, message: 'Demo store reset to default seed records.' });
}
