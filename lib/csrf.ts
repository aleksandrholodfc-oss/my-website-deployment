import { cookies } from 'next/headers';

const CSRF_SECRET = process.env.CSRF_SECRET || 'your-secret-key-change-in-production';

export async function generateCsrfToken(): Promise<string> {
  const timestamp = Date.now().toString();
  const token = Buffer.from(`${CSRF_SECRET}:${timestamp}`).toString('base64');
  return token;
}

export async function validateCsrfToken(token: string): Promise<boolean> {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [secret, timestamp] = decoded.split(':');
    
    if (secret !== CSRF_SECRET) return false;
    
    // Token expires after 1 hour
    const tokenAge = Date.now() - parseInt(timestamp);
    return tokenAge < 3600000;
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
    maxAge: 3600, // 1 hour
  });
  return token;
}

export async function getCsrfToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('csrf_token');
  return token?.value;
}
