import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { getBudgetChannels, updateBudgetChannel } from '@/lib/storage';

export async function GET(req: Request) {
  const session = await verifyAdminSession(req);

  if (!session.isAdmin) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin authentication required.' },
      { status: 401 }
    );
  }

  const channels = await getBudgetChannels();
  return NextResponse.json({ success: true, channels });
}

export async function POST(req: Request) {
  const session = await verifyAdminSession(req);

  if (!session.isAdmin) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin authentication required.' },
      { status: 401 }
    );
  }

  try {
    const { id, planned_spend, actual_spend, notes, is_assumption } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Channel ID is required' },
        { status: 400 }
      );
    }

    const updated = await updateBudgetChannel(id, {
      planned_spend: planned_spend !== undefined ? Number(planned_spend) : undefined,
      actual_spend: actual_spend !== undefined ? Number(actual_spend) : undefined,
      notes,
      is_assumption,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Budget channel not found' },
        { status: 404 }
      );
    }

    const allChannels = await getBudgetChannels();

    return NextResponse.json({
      success: true,
      channel: updated,
      channels: allChannels,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update budget';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
