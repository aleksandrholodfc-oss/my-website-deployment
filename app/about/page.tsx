import { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';
import React from 'react';
import { Users, Clock, Shield, Star, Briefcase } from 'lucide-react';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Breadcrumbs from '@/components/Breadcrumbs';
import Image from 'next/image';
import { LOGO_SRC } from '@/lib/images';

export const metadata: Metadata = {
  title: 'О компании — Федерация Холода',
  description:
    'Федерация Холода — профессиональный ремонт холодильного оборудования в Иркутске с 2014 года. Более 10 лет опыта, 5000+ выполненных работ.',
  keywords:
    'Федерация Холода, о компании, ремонт холодильного оборудования Иркутск, история компании',
  alternates: {
    canonical: 'https://федерация-холода.рф/about',
  },
};

async function getContent() {
  const CONTENT_FILE = path.join(process.cwd(), 'data', 'content.json');
  const data = await fs.readFile(CONTENT_FILE, 'utf-8');
  return JSON.parse(data);
}

export default async function AboutPage() {
  const content = await getContent();

  return (
    <>
      <Section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Breadcrumbs items={[{ label: 'О компании', href: '/about' }]} />
        </div>
        <SectionHeader title="О компании" subtitle="Кто мы" centered titleColor="text-white" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-center max-w-6xl mx-auto">
          <div>
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 leading-relaxed">
              {content.about?.history || ''}
            </p>
            <p className="text-slate-400 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
              {content.about?.mission || ''}
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-green-500/30 backdrop-blur-sm">
                {content.about?.serviceArea || ''}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {content.about?.stats?.map((stat: any, i: number) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-slate-800/70 to-slate-900/80 rounded-lg sm:rounded-xl p-3 sm:p-5 text-center border border-slate-700/60 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative order-first lg:order-last">
            <div className="aspect-square bg-gradient-to-br from-blue-600/30 via-purple-500/20 to-cyan-500/30 rounded-xl sm:rounded-2xl flex items-center justify-center border border-blue-500/40 overflow-hidden relative shadow-2xl shadow-blue-500/20">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
              <Image
                src={LOGO_SRC}
                alt="Логотип компании"
                width={200}
                height={200}
                className="w-3/4 h-3/4 object-contain relative z-10"
                priority
                sizes="(max-width: 768px) 150px, 200px"
              />
            </div>
            <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-xl shadow-blue-500/20">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm sm:text-base">Гарантия</div>
                  <div className="text-xs sm:text-sm text-slate-400">до 1 года на все работы</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section background="light">
        <div className="max-w-4xl mx-auto px-2 sm:px-0">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-white shadow-xl shadow-blue-500/20">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
              Доверьте холод профессионалам.
            </h3>
            <p className="text-blue-100 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
              Свяжитесь с нами для бесплатной консультации, срочного выезда или заключения договора
              на сервисное обслуживание.
            </p>
            <p className="text-white font-medium mb-3 sm:mb-4 text-sm sm:text-base">
              «Федерация Холода» — ваш надёжный партнёр в Иркутске и Иркутской области.
            </p>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Мы работаем с магазинами, ресторанами, складами, медицинскими и фармацевтическими
              компаниями, производственными предприятиями и частными клиентами.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          title="Наши ценности"
          subtitle="Принципы нашей работы"
          centered
          titleColor="text-white"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {content.about?.values?.map((value: any, i: number) => (
            <Card
              key={value.id}
              hover
              className="text-center p-4 sm:p-6 bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/30 transition-all"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <Star className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">{value.title}</h4>
              <p className="text-slate-400 leading-relaxed">{value.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section background="light">
        <SectionHeader title="Наша команда" subtitle="Профессионалы своего дела" centered />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto">
          {content.about?.team?.map((member: any, i: number) => (
            <div key={member.id}>
              <Card
                hover
                className="bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <Users className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-blue-600 font-medium text-sm sm:text-lg">
                      {member.position}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
