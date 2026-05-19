import { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';
import HomeClient from '@/components/HomeClient';

export const metadata: Metadata = {
  title: 'Ремонт холодильного оборудования в Иркутске | Федерация Холода',
  description: 'Профессиональный ремонт холодильников, рефрижераторов, торгового и промышленного холодильного оборудования в Иркутске. Выезд мастера 24/7, гарантия до 1 года.',
  alternates: {
    canonical: 'https://федерация-холода.рф',
  },
};

async function getContent() {
  const CONTENT_FILE = path.join(process.cwd(), 'data', 'content.json');
  const data = await fs.readFile(CONTENT_FILE, 'utf-8');
  return JSON.parse(data);
}

export default async function Home() {
  const content = await getContent();
  return <HomeClient content={content} />;
}
