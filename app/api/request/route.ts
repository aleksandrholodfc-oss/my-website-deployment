import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email, description } = await request.json();

    // Here you can:
    // 1. Send email
    // 2. Save to database
    // 3. Send to Telegram
    // 4. Integrate with CRM

    console.log('New request:', { name, phone, email, description });

    // For now, just log the request
    // In production, implement actual notification logic

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Request error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
