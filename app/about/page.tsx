'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Shield, Star, Briefcase } from 'lucide-react';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Breadcrumbs from '@/components/Breadcrumbs';
import Image from 'next/image';

export default function AboutPage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load content:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-xl">Ошибка загрузки данных</div>
      </div>
    );
  }

  return (
    <>
      <Section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Breadcrumbs items={[{ label: 'О компании', href: '/about' }]} />
        </div>
        <SectionHeader title="О компании" subtitle="Кто мы" centered titleColor="text-white" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-center max-w-6xl mx-auto">
          <div>
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 leading-relaxed">{content.about?.history || ''}</p>
            <p className="text-slate-400 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">{content.about?.mission || ''}</p>
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
              <span className="bg-green-500/20 text-green-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-green-500/30">{content.about?.serviceArea || ''}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {content.about?.stats?.map((stat: any, i: number) => (
                <div key={i} className="bg-slate-800/50 rounded-lg sm:rounded-xl p-3 sm:p-5 text-center border border-slate-700/50 hover:bg-slate-800/70 transition-colors">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative order-first lg:order-last">
            <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center border border-blue-500/30 overflow-hidden relative">
              <Image src="/images/logo.png" alt="Логотип компании" width={200} height={200} className="w-3/4 h-3/4 object-contain relative z-10" />
            </div>
            <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-slate-800 border border-slate-700 rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-xl">
              <div className="flex items-center gap-2 sm:gap-3">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
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
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Доверьте холод профессионалам.</h3>
            <p className="text-blue-100 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">Свяжитесь с нами для бесплатной консультации, срочного выезда или заключения договора на сервисное обслуживание.</p>
            <p className="text-white font-medium mb-3 sm:mb-4 text-sm sm:text-base">«Федерация Холода» — ваш надёжный партнёр в Иркутске и Иркутской области.</p>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">Мы работаем с магазинами, ресторанами, складами, медицинскими и фармацевтическими компаниями, производственными предприятиями и частными клиентами.</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader title="Наши ценности" subtitle="Принципы нашей работы" centered titleColor="text-white" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {content.about?.values?.map((value: any, i: number) => (
            <Card key={value.id} hover className="text-center p-4 sm:p-6 bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/30 transition-all">
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
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card hover className="bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group">
                <div className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <Users className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors">{member.name}</h4>
                    <p className="text-blue-600 font-medium text-sm sm:text-lg">{member.position}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
