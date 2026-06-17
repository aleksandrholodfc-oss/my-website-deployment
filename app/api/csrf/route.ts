import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { setCsrfCookie } from '@/lib/csrf';

export async function GET() {
  const token = await setCsrfCookie();
  return NextResponse.json({ token });
}
