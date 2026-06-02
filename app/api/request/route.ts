import { NextResponse } from 'next/server';
import { validateCsrfToken } from '@/lib/csrf';
import { contactFormSchema, escapeHtml } from '@/lib/validation';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const requests = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 3;

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const lastRequest = requests.get(ip) || 0;

  if (now - lastRequest < RATE_LIMIT_WINDOW / MAX_REQUESTS) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  requests.set(ip, now);

  try {
    const body = await request.json();
    const csrfToken = request.headers.get('x-csrf-token');

    if (!csrfToken || !(await validateCsrfToken(csrfToken))) {
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
    }

    const validation = contactFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Validation failed', details: validation.error.issues }, { status: 400 });
    }

    const { name, phone, email, description, website } = validation.data;

    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json({ error: 'Telegram API not configured' }, { status: 500 });
    }

    const message = `
<b>Новая заявка (Форма обратной связи)</b>
<b>Имя:</b> ${escapeHtml(name)}
<b>Телефон:</b> ${escapeHtml(phone)}
${email ? `<b>Email:</b> ${escapeHtml(email)}` : ''}
${description ? `<b>Сообщение:</b> ${escapeHtml(description)}` : ''}
    `.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to send Telegram message');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Request error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
