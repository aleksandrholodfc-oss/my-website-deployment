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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Breadcrumbs items={[{ label: 'Услуги', href: '/services' }]} />
        </div>
        <SectionHeader title="О наших услугах" subtitle="Качество и надёжность" centered />
        <div className="max-w-4xl mx-auto px-2 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
            <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Почему выбирают нас</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">
                Мы специализируемся на ремонте холодильного и климатического оборудования всех типов:
                от торгового холодильного оборудования до промышленных холодильных камер и рефрижераторных установок.
              </p>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Опыт работы более 10 лет в сфере холодильной техники</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Собственный склад запчастей для быстрого ремонта</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Срочный выезд мастера в течение 2-4 часов</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Гарантия на все виды работ до 1 года</span>
                </li>
              </ul>
            </div>
            <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Наши преимущества</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">
                Мы работаем напрямую с производителями оборудования, что позволяет нам предлагать
                конкурентные цены и использовать только оригинальные запчасти.
              </p>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Работа без посредников — адекватные цены</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Бесплатная диагностика при проведении ремонта</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Работаем с оборудованием всех производителей</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Скидка 5% при оформлении заявки через сайт</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section background="light">
        <SectionHeader title="Виды оборудования" subtitle="Что мы ремонтируем" centered />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {content.services.map((service: any, i: number) => {
            const slug = serviceSlugs[service.category];
            return (
              <Link key={service.id} href={slug ? `/services/${slug}` : '#'}>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                  <Card hover className="h-full cursor-pointer flex flex-col p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 border border-blue-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg mb-4 sm:mb-6">
                      <Snowflake className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{service.category}</h3>
                    {service.description && (
                      <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-4 leading-relaxed">{service.description}</p>
                    )}
                    <ul className="space-y-1 sm:space-y-2 mb-3 sm:mb-4 flex-grow">
                      {service.items.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600 text-xs sm:text-sm">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center text-blue-600 font-medium mt-auto text-sm sm:text-base">
                      Подробнее <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                    </div>
                  </Card>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section background="light">
        <SectionHeader title="Как мы работаем" subtitle="4 простых шага" centered />
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {process.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-xl md:text-2xl font-bold text-white shadow-lg shadow-blue-500/30">{p.step}</div>
              <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">{p.title}</h4>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 border border-blue-500/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center shadow-xl shadow-blue-500/20">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-4">Не нашли нужную услугу?</h3>
          <p className="text-blue-100 text-sm sm:text-base mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed">Свяжитесь с нами — мы подберём решение под вашу задачу.</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            <a href={`tel:${content.contacts.phone}`} className="w-full sm:w-auto">
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto text-sm sm:text-base">
                <Phone className="w-4 h-4 mr-2" /> Позвонить сейчас
              </Button>
            </a>
            <a href="/contacts" className="w-full sm:w-auto">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto text-sm sm:text-base">Оставить заявку</Button>
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
