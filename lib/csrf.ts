import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual, randomUUID } from 'crypto';

const CSRF_SECRET = process.env.CSRF_SECRET;

if (!CSRF_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('CSRF_SECRET environment variable is required in production');
}

const secret = CSRF_SECRET || 'dev-secret-key-at-least-32-chars-long-!!!';

export async function generateCsrfToken(): Promise<string> {
  const token = randomUUID();
  const signature = createHmac('sha256', secret).update(token).digest('base64');
  return `${token}.${signature}`;
}

export async function validateCsrfToken(token: string): Promise<boolean> {
  if (!token || typeof token !== 'string') return false;

  const [uuid, signature] = token.split('.');
  if (!uuid || !signature) return false;

  const cookieStore = await cookies();
  const cookieToken = cookieStore.get('csrf_token')?.value;

  if (!cookieToken || cookieToken !== token) return false;

  try {
    const expectedSignature = createHmac('sha256', secret).update(uuid).digest('base64');

    const signatureBuffer = Buffer.from(signature, 'base64');
    const expectedBuffer = Buffer.from(expectedSignature, 'base64');

    if (signatureBuffer.length !== expectedBuffer.length) {
      return false;
    }

    return timingSafeEqual(signatureBuffer, expectedBuffer);
  } catch {
    return false;
  }
}

export async function setCsrfCookie() {
  const token = await generateCsrfToken();
  const cookieStore = await cookies();
  cookieStore.set('csrf_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 3600, // 1 hour
  });
  return token;
}

export async function getCsrfToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('csrf_token');
  return token?.value;
}
