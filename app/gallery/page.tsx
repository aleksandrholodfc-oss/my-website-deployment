import { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';
import React from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Breadcrumbs from '@/components/Breadcrumbs';
import Image from 'next/image';
import GalleryClient from '@/components/GalleryClient';

export const metadata: Metadata = {
  title: 'Галерея работ — Федерация Холода',
  description:
    'Фотографии выполненных работ по ремонту холодильного оборудования. Ремонт камер, чиллеров, рефрижераторов, кондиционеров.',
  keywords: 'галерея, фото работ, ремонт холодильного оборудования, примеры работ',
  alternates: {
    canonical: 'https://федерация-холода.рф/gallery',
  },
};

async function getContent() {
  const CONTENT_FILE = path.join(process.cwd(), 'data', 'content.json');
  const data = await fs.readFile(CONTENT_FILE, 'utf-8');
  return JSON.parse(data);
}

export default async function GalleryPage() {
  const content = await getContent();

  return (
    <>
      <Section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Breadcrumbs items={[{ label: 'Галерея', href: '/gallery' }]} />
        </div>
        <SectionHeader
          title="Галерея работ"
          subtitle="Наши выполненные проекты"
          centered
          titleColor="text-white"
        />
        <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto text-center mb-8 sm:mb-12 px-2">
          Фотографии наших работ по ремонту и обслуживанию холодильного оборудования различного типа
        </p>
      </Section>

      <Section background="light">
        <GalleryClient gallery={content.gallery || []} />
      </Section>
    </>
  );
}
