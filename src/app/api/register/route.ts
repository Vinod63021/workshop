import { NextResponse } from 'next/server';
import { createRegistration } from '@/lib/storage';
import { RegistrationInput } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const input: RegistrationInput = {
      full_name: body.full_name,
      email: body.email,
      college: body.college,
      branch: body.branch,
      graduation_year: Number(body.graduation_year),
      referral_code: body.referral_code,
      source: body.source,
      utm_source: body.utm_source,
      utm_medium: body.utm_medium,
      utm_campaign: body.utm_campaign,
    };

    const result = await createRegistration(input);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Registration failed.',
          fieldErrors: result.fieldErrors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful! Your spot has been reserved.',
        registration: result.registration,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json(
      {
        success: false,
        error: `Unexpected server error: ${msg}`,
      },
      { status: 500 }
    );
  }
}
