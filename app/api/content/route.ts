import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const CONTENT_FILE = path.join(process.cwd(), 'data', 'content.json');

export async function GET() {
  try {
    const data = await fs.readFile(CONTENT_FILE, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Failed to read content:', error);
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const content = await request.json();
    await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save content:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
