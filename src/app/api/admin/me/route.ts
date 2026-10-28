import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { getStorageMode } from '@/lib/storage';

export async function GET(req: Request) {
  const session = await verifyAdminSession(req);

  if (!session.isAdmin) {
    return NextResponse.json(
      { isAdmin: false, mode: getStorageMode() },
      { status: 401 }
    );
  }

  return NextResponse.json({
    isAdmin: true,
    email: session.email,
    mode: session.mode,
  });
}
