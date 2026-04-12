'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Snowflake, CheckCircle, Phone, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function ServicesPage() {
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

  const process = [
    { step: '01', title: 'Заявка', desc: 'Оставьте заявку на сайте или по телефону' },
    { step: '02', title: 'Диагностика', desc: 'Мастер приедет и бесплатно определит неисправность' },
    { step: '03', title: 'Ремонт', desc: 'Согласуем стоимость и выполним работы с гарантией' },
    { step: '04', title: 'Результат', desc: 'Проверим оборудование и выдадим гарантийный талон' },
  ];

  const serviceSlugs: { [key: string]: string } = {
    'Торговое холодильное оборудование': 'trade',
    'Промышленное холодильное оборудование': 'industrial',
    'Климатическое оборудование': 'climate',
    'Автокондиционеры': 'auto',
    'Рефрижераторы': 'refrigerator',
  };

  return (
    <>
      <Section background="light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: 'Услуги', href: '/services' }]} />
        </div>
        <SectionHeader title="О наших услугах" subtitle="Качество и надёжность" centered />
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Почему выбирают нас</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Мы специализируемся на ремонте холодильного и климатического оборудования всех типов:
                от торгового холодильного оборудования до промышленных холодильных камер и рефрижераторных установок.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Опыт работы более 10 лет в сфере холодильной техники</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Собственный склад запчастей для быстрого ремонта</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Срочный выезд мастера в течение 2-4 часов</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Гарантия на все виды работ до 1 года</span>
                </li>
              </ul>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Наши преимущества</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Мы работаем напрямую с производителями оборудования, что позволяет нам предлагать
                конкурентные цены и использовать только оригинальные запчасти.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Работа без посредников — адекватные цены</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Бесплатная диагностика при проведении ремонта</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Работаем с оборудованием всех производителей</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Скидка 5% при оформлении заявки через сайт</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader title="Виды оборудования" subtitle="Что мы ремонтируем" centered />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.services.map((service: any, i: number) => {
            const slug = serviceSlugs[service.category];
            return (
              <Link key={service.id} href={slug ? `/services/${slug}` : '#'}>
                <Card hover className="h-full cursor-pointer">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">{service.category}</h3>
                    {service.description && (
                      <p className="text-slate-400 text-sm mb-4 leading-relaxed">{service.description}</p>
                    )}
                    <ul className="space-y-2 mb-4">
                      {service.items.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center text-blue-400 font-medium">
                      Подробнее <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section background="light">
        <SectionHeader title="Как мы работаем" subtitle="4 простых шага" centered />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-blue-500/30">{p.step}</div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">{p.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 border border-blue-500/30 rounded-2xl p-8 md:p-12 text-center shadow-xl shadow-blue-500/20">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Не нашли нужную услугу?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto leading-relaxed">Свяжитесь с нами — мы подберём решение под вашу задачу.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${content.contacts.phone}`}>
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                <Phone className="w-4 h-4 mr-2" /> Позвонить сейчас
              </Button>
            </a>
            <a href="/contacts">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">Оставить заявку</Button>
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
