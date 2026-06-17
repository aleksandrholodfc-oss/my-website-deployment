import { NextResponse } from 'next/server';
import { pbkdf2Sync, timingSafeEqual, createHmac } from 'crypto';

export const dynamic = 'force-dynamic';

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const CSRF_SECRET = process.env.CSRF_SECRET || 'dev-secret';

// Simple in-memory rate limiting
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const BAN_TIME = 15 * 60 * 1000; // 15 minutes

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();

  const attempts = loginAttempts.get(ip);
  if (attempts && attempts.count >= MAX_ATTEMPTS && now - attempts.lastAttempt < BAN_TIME) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });
  }

  try {
    const { password } = await request.json();

    if (!ADMIN_PASSWORD_HASH) {
      console.error('ADMIN_PASSWORD_HASH is not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Hash format: salt:hash
    const [salt, storedHash] = ADMIN_PASSWORD_HASH.split(':');
    const hash = pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');

    if (timingSafeEqual(Buffer.from(hash), Buffer.from(storedHash))) {
      // Clear attempts on success
      loginAttempts.delete(ip);

      // Create a signed session token
      const sessionData = `admin:${now}`;
      const signature = createHmac('sha256', CSRF_SECRET).update(sessionData).digest('base64');
      const token = `${sessionData}.${signature}`;

      const response = NextResponse.json({ success: true });
      response.cookies.set('admin_auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600 * 24, // 24 hours
      });

      return response;
    } else {
      // Record failed attempt
      const newCount = (attempts?.count || 0) + 1;
      loginAttempts.set(ip, { count: newCount, lastAttempt: now });

      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
