import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ремонт автокондиционеров — Федерация Холода',
  description: 'Диагностика, заправка и ремонт автокондиционеров в Иркутске. Опытные мастера, быстрый выезд, гарантия на работы.',
  keywords: 'ремонт автокондиционеров, заправка кондиционеров, диагностика автокондиционера, Иркутск',
  alternates: {
    canonical: 'https://федерация-холода.рф/services/auto',
  },
};

export default function AutoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
