import { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';
import Breadcrumbs from '@/components/Breadcrumbs';
import ServicesPageClient from '@/components/services/ServicesPageClient';

export const metadata: Metadata = {
  title: 'Услуги по ремонту холодильного оборудования в Иркутске | Федерация Холода',
  description: 'Ремонт торгового, промышленного и климатического холодильного оборудования, автокондиционеров и рефрижераторов в Иркутске. Выезд 24/7, диагностика, гарантия до 1 года.',
  keywords: 'ремонт холодильного оборудования Иркутск, ремонт торгового холодильного оборудования, ремонт промышленного холодильного оборудования, ремонт рефрижераторов, ремонт автокондиционеров, ремонт кондиционеров Иркутск, обслуживание холодильных камер',
  alternates: {
    canonical: 'https://федерация-холода.рф/services',
  },
  openGraph: {
    title: 'Услуги по ремонту холодильного оборудования в Иркутске',
    description: 'Полный комплекс ремонта и обслуживания холодильного и климатического оборудования. Срочный выезд, диагностика, гарантия до 1 года.',
    url: 'https://федерация-холода.рф/services',
    type: 'website',
    images: [{ url: '/images/og-cover.jpg', width: 1200, height: 630, alt: 'Услуги Федерации Холода' }],
  },
};

async function getContent() {
  const CONTENT_FILE = path.join(process.cwd(), 'data', 'content.json');
  const data = await fs.readFile(CONTENT_FILE, 'utf-8');
  return JSON.parse(data);
}

export default async function ServicesPage() {
  const content = await getContent();

  const serviceSlugs: Record<string, string> = {
    'Торговое холодильное оборудование': 'trade',
    'Промышленное холодильное оборудование': 'industrial',
    'Климатическое оборудование': 'climate',
    'Автокондиционеры': 'auto',
    'Рефрижераторы': 'refrigerator',
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Услуги по ремонту холодильного оборудования',
    itemListElement: content.services.map((service: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://федерация-холода.рф/services/${serviceSlugs[service.category]}`,
      name: service.category,
      description: service.description,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <div className="bg-slate-900 px-4 sm:px-6 lg:px-8 pt-6">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs items={[{ label: 'Услуги', href: '/services' }]} />
        </div>
      </div>
      <ServicesPageClient content={content} />
    </>
  );
}
