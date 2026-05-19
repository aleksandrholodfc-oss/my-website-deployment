import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ремонт торгового холодильного оборудования в Иркутске | Федерация Холода',
  description: 'Ремонт холодильных витрин, ларей, шкафов, камер, горок и льдогенераторов в Иркутске. Диагностика, заправка фреоном, срочный выезд, гарантия до 1 года.',
  keywords: 'ремонт торгового холодильного оборудования Иркутск, ремонт холодильных витрин, ремонт морозильных ларей, ремонт холодильных камер, заправка фреоном Иркутск',
  alternates: { canonical: 'https://федерация-холода.рф/services/trade' },
  openGraph: {
    title: 'Ремонт торгового холодильного оборудования в Иркутске',
    description: 'Витрины, лари, холодильные шкафы, камеры и льдогенераторы. Срочный выезд и гарантия.',
    url: 'https://федерация-холода.рф/services/trade',
    type: 'website',
  },
};

export default function TradeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
