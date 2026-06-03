import { NextRequest, NextResponse } from 'next/server';
import { validateCsrfToken } from '@/lib/csrf';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message, csrfToken } = body;

    // Validate CSRF token
    if (!csrfToken || !(await validateCsrfToken(csrfToken))) {
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
    }

    // Telegram Bot API configuration
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID || '@federation_cold';

    if (!BOT_TOKEN) {
      return NextResponse.json({ error: 'Telegram bot token not configured' }, { status: 500 });
    }

    // Format message
    const telegramMessage = `
🆕 *Новая заявка с сайта*

👤 *Имя:* ${name}
📞 *Телефон:* ${phone}
📝 *Сообщение:* ${message}
    `.trim();

    // Send to Telegram
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
    console.error('Error sending to Telegram:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
