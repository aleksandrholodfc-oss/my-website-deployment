'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, CheckCircle, ArrowRight, Clock, Wrench, Shield, Star,
  Snowflake, Wind, Car, Truck, ChevronDown, ChevronRight,
  ThumbsUp,
} from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const categoryIcons: Record<string, React.ElementType> = {
  'Торговое холодильное оборудование': Snowflake,
  'Промышленное холодильное оборудование': Wrench,
  'Климатическое оборудование': Wind,
  'Автокондиционеры': Car,
  'Рефрижераторы': Truck,
};

const categorySlugs: Record<string, string> = {
  'Торговое холодильное оборудование': 'trade',
  'Промышленное холодильное оборудование': 'industrial',
  'Климатическое оборудование': 'climate',
  'Автокондиционеры': 'auto',
  'Рефрижераторы': 'refrigerator',
};

interface ServicesPageClientProps {
  content: any;
}

export default function ServicesPageClient({ content }: ServicesPageClientProps) {
  const [activeService, setActiveService] = useState(0);
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const [showAllFaq, setShowAllFaq] = useState(false);

  const services = content.services as any[];
  const phone = content.contacts?.phone || '+7 (3952) 69-70-02';

  const advantages = [
    { icon: Clock,   title: 'Выезд за 2–4 часа',    desc: 'Работаем круглосуточно. Срочный выезд в ночное время — без доплат за ожидание.' },
    { icon: Shield,  title: 'Гарантия до 12 мес.',  desc: 'Письменная гарантия на все виды работ и использованные запчасти.' },
    { icon: ThumbsUp,title: 'Бесплатная диагностика', desc: 'При заказе ремонта диагностика бесплатно. Только оригинальные запчасти.' },
    { icon: Star,    title: 'Скидка 5% онлайн',     desc: 'Оформите заявку через сайт и получите скидку 5% на все виды работ.' },
  ];

  const current = services[activeService];
  const CurrentIcon = categoryIcons[current?.category] || Snowflake;
  const currentSlug = categorySlugs[current?.category];

  return (
    <>
      {/* ─── INTERACTIVE SERVICE CATALOG ─── */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-sm font-semibold mb-4">Виды оборудования</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Что мы ремонтируем</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Выберите тип оборудования, чтобы узнать подробности, сроки и список брендов</p>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {services.map((service, i) => {
              const Icon = categoryIcons[service.category] || Snowflake;
              return (
                <motion.button
                  key={i}
                  onClick={() => setActiveService(i)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                    activeService === i
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 border-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-blue-500/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">{service.category}</span>
                  <span className="sm:hidden">{service.category.split(' ')[0]}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            {current && (
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6"
              >
                {/* Left panel */}
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                      <CurrentIcon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">{current.category}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-cyan-400 font-medium">{current.timeEstimate}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">{current.description}</p>

                  {/* Process chain */}
                  {current.process && (
                    <div className="mb-6">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Схема работы</div>
                      <div className="flex flex-wrap gap-2">
                        {current.process.split(' → ').map((step: string, idx: number, arr: string[]) => (
                          <React.Fragment key={idx}>
                            <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-300 text-xs font-medium">{step}</span>
                            {idx < arr.length - 1 && <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0 self-center" />}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Items list */}
                  <div className="mb-6">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Виды работ</div>
                    <ul className="space-y-2">
                      {current.items.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={currentSlug ? `/services/${currentSlug}` : '#'}>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/20 cursor-pointer"
                    >
                      Подробнее об услуге <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </Link>
                </div>

                {/* Right panel: time */}
                <div className="flex flex-col gap-4">
                  {/* Quick facts */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-4 text-center">
                      <Clock className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                      <div className="text-white font-semibold text-sm leading-snug">{current.timeEstimate}</div>
                      <div className="text-slate-500 text-xs mt-1">время ремонта</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-4 text-center">
                      <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <div className="text-white font-semibold text-sm">до 12 месяцев</div>
                      <div className="text-slate-500 text-xs mt-1">гарантия</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-2xl p-4 text-center">
                      <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                      <div className="text-white font-semibold text-sm">2–4 часа</div>
                      <div className="text-slate-500 text-xs mt-1">выезд мастера</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-2xl p-4 text-center">
                      <ThumbsUp className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                      <div className="text-white font-semibold text-sm">бесплатно</div>
                      <div className="text-slate-500 text-xs mt-1">диагностика</div>
                    </div>
                  </div>

                  {/* Emergency CTA */}
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 text-sm font-semibold">Доступны сейчас</span>
                    </div>
                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">Мастер готов выехать в течение 2–4 часов. Позвоните или оставьте заявку — перезвоним за 5 минут.</p>
                    <a href={`tel:${phone}`} className="flex items-center gap-3 group">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
                        <Phone className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-base group-hover:text-blue-300 transition-colors">{phone}</div>
                        <div className="text-slate-500 text-xs">круглосуточно</div>
                      </div>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center shadow-2xl shadow-blue-500/25"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="relative">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                Не нашли нужную услугу?
              </h3>
              <p className="text-blue-100 text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                Свяжитесь с нами — решаем нестандартные задачи. Бесплатная консультация по телефону.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`tel:${phone}`} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-white text-blue-700 hover:bg-blue-50 font-bold shadow-xl">
                    <Phone className="w-5 h-5 mr-2" /> Позвонить сейчас
                  </Button>
                </a>
                <Link href="/contacts" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full border-white/60 text-white hover:bg-white/10">
                    Оставить заявку
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
