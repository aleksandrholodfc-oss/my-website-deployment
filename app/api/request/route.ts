import { NextRequest, NextResponse } from 'next/server';
import { validateCsrfToken } from '@/lib/csrf';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, description, csrfToken } = body;

    if (!csrfToken || !(await validateCsrfToken(csrfToken))) {
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID || '@federation_cold';

    if (!BOT_TOKEN) {
      return NextResponse.json({ error: 'Telegram bot token not configured' }, { status: 500 });
    }

    const telegramMessage = `
🆕 *Новая заявка с сайта*

👤 *Имя:* ${name}
📞 *Телефон:* ${phone}
📧 *Email:* ${email || '—'}
📝 *Описание:* ${description || '—'}
    `.trim();

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: telegramMessage,
        parse_mode: 'Markdown',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.description || 'Failed to send message to Telegram');
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Request error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
