import type { Metadata } from 'next';
import ServicePageWrapper from '@/components/services/ServicePageWrapper';

type Props = {
  params: { slug: string };
};

const METADATA_CONFIGS: Record<string, Metadata> = {
  trade: {
    title: 'Ремонт торгового холодильного оборудования в Иркутске | Федерация Холода',
    description:
      'Ремонт холодильных витрин, ларей, шкафов, камер, горок и льдогенераторов в Иркутске. Диагностика, заправка фреоном, срочный выезд, гарантия до 1 года.',
    keywords:
      'ремонт торгового холодильного оборудования Иркутск, ремонт холодильных витрин, ремонт морозильных ларей, ремонт холодильных камер, заправка фреоном Иркутск',
    alternates: { canonical: 'https://федерация-холода.рф/services/trade' },
    openGraph: {
      title: 'Ремонт торгового холодильного оборудования в Иркутске',
      description:
        'Витрины, лари, холодильные шкафы, камеры и льдогенераторы. Срочный выезд и гарантия.',
      url: 'https://федерация-холода.рф/services/trade',
      type: 'website',
    },
  },
  industrial: {
    title: 'Ремонт промышленного холодильного оборудования в Иркутске | Федерация Холода',
    description:
      'Ремонт чиллеров, централей, скороморозильных аппаратов и агрегатов в Иркутске. Профессиональный монтаж и обслуживание.',
    alternates: { canonical: 'https://федерация-холода.рф/services/industrial' },
  },
  refrigerator: {
    title: 'Ремонт рефрижераторов и холодильных установок в Иркутске | Федерация Холода',
    description:
      'Обслуживание Thermo King, Carrier, Daikin и других марок. Пайка труб, замена компрессоров, ремонт электрики.',
    alternates: { canonical: 'https://федерация-холода.рф/services/refrigerator' },
  },
  auto: {
    title: 'Ремонт и заправка автокондиционеров в Иркутске | Федерация Холода',
    description:
      'Диагностика и ремонт автокондиционеров для легковых, грузовых авто и спецтехники. Поиск утечек, пайка радиаторов, заправка фреоном.',
    keywords:
      'ремонт автокондиционеров, заправка кондиционеров, диагностика автокондиционера, Иркутск',
    alternates: { canonical: 'https://федерация-холода.рф/services/auto' },
  },
  climate: {
    title: 'Ремонт и установка климатического оборудования в Иркутске | Федерация Холода',
    description:
      'Обслуживание сплит-систем, канальных и потолочных кондиционеров, вентиляции. Монтаж под ключ с гарантией.',
    alternates: { canonical: 'https://федерация-холода.рф/services/climate' },
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return METADATA_CONFIGS[params.slug] || { title: 'Услуги | Федерация Холода' };
}

export function generateStaticParams() {
  return [
    { slug: 'trade' },
    { slug: 'industrial' },
    { slug: 'refrigerator' },
    { slug: 'auto' },
    { slug: 'climate' },
  ];
}

export default function ServicePage({ params }: Props) {
  return <ServicePageWrapper slug={params.slug} />;
}
