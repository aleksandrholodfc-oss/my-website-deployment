'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  CheckCircle,
  ArrowRight,
  Clock,
  Wrench,
  Shield,
  Star,
  Snowflake,
  Wind,
  Car,
  Truck,
  ChevronDown,
  ChevronRight,
  ThumbsUp,
  Search,
  BadgeCheck,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const categoryIcons: Record<string, React.ElementType> = {
  'Торговое холодильное оборудование': Snowflake,
  'Промышленное холодильное оборудование': Wrench,
  'Климатическое оборудование': Wind,
  Автокондиционеры: Car,
  Рефрижераторы: Truck,
};

const categorySlugs: Record<string, string> = {
  'Торговое холодильное оборудование': 'trade',
  'Промышленное холодильное оборудование': 'industrial',
  'Климатическое оборудование': 'climate',
  Автокондиционеры: 'auto',
  Рефрижераторы: 'refrigerator',
};

interface ServicesPageClientProps {
  content: any;
}

interface ServiceSummary {
  category: string;
  description?: string;
  timeEstimate?: string;
  process?: string;
  items?: string[];
}

export default function ServicesPageClient({ content }: ServicesPageClientProps) {
  const [activeService, setActiveService] = useState(0);
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const [showAllFaq, setShowAllFaq] = useState(false);

  const services: ServiceSummary[] = Array.isArray(content.services) ? content.services : [];
  const phone = content.contacts?.phone || '+7 (3952) 69-70-02';
  const tel = phone.replace(/\D/g, '').replace(/^8/, '+7');
  const faq = Array.isArray(content.faq) ? content.faq.slice(0, showAllFaq ? 8 : 4) : [];

  const advantages = [
    {
      icon: Clock,
      title: 'Выезд за 2–4 часа',
      desc: 'Работаем круглосуточно. Срочный выезд в ночное время — без доплат за ожидание.',
    },
    {
      icon: Shield,
      title: 'Гарантия до 12 мес.',
      desc: 'Письменная гарантия на все виды работ и использованные запчасти.',
    },
    {
      icon: ThumbsUp,
      title: 'Бесплатная диагностика',
      desc: 'При заказе ремонта диагностика бесплатно. Только оригинальные запчасти.',
    },
    {
      icon: Star,
      title: 'Скидка 5% онлайн',
      desc: 'Оформите заявку через сайт и получите скидку 5% на все виды работ.',
    },
  ];

  const trustItems = [
    {
      icon: Zap,
      title: 'Срочный ремонт 24/7',
      desc: 'Оперативно выезжаем при аварийных остановках оборудования.',
    },
    {
      icon: Search,
      title: 'Точная диагностика',
      desc: 'Проверяем утечки, электрику, компрессор, автоматику и теплообменники.',
    },
    {
      icon: BadgeCheck,
      title: 'Работа по регламенту',
      desc: 'Фиксируем причину, согласуем стоимость и тестируем оборудование.',
    },
  ];

  const current = services[activeService];
  const CurrentIcon = categoryIcons[current?.category] || Snowflake;
  const currentSlug = categorySlugs[current?.category];

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.28),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.18),transparent_30%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-sm font-semibold mb-5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Сервис холодильного и климатического оборудования
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
                Профессиональный ремонт оборудования
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
                Ремонтируем торговое, промышленное, климатическое оборудование, автокондиционеры и
                рефрижераторы. Быстро определяем причину поломки, согласуем стоимость и даём
                гарантию на выполненные работы.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a href={`tel:${tel}`} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/25"
                  >
                    <Phone className="w-5 h-5 mr-2" /> Вызвать мастера
                  </Button>
                </a>
                <Link href="/contacts" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-slate-500 text-white hover:bg-white/10"
                  >
                    Получить консультацию
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-3 max-w-xl">
                {[
                  ['24/7', 'приём заявок'],
                  ['2–4 ч', 'срочный выезд'],
                  ['до 12 мес.', 'гарантия'],
                ].map(([value, label]) => (
                  <div
                    key={value}
                    className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4"
                  >
                    <div className="text-white text-xl sm:text-2xl font-black">{value}</div>
                    <div className="text-slate-500 text-xs mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="grid gap-4"
            >
              {trustItems.map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5 shadow-xl shadow-black/20"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-white font-bold">{title}</h2>
                      <p className="text-slate-400 text-sm leading-relaxed mt-1">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── INTERACTIVE SERVICE CATALOG ─── */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-sm font-semibold mb-4">
              Виды оборудования
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Что мы ремонтируем</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Выберите тип оборудования, чтобы узнать подробности, сроки и список брендов
            </p>
          </motion.div>

          {/* Tabs */}
          <div
            className="flex flex-wrap gap-2 mb-8 justify-center"
            role="tablist"
            aria-label="Категории услуг"
          >
            {services.map((service, i) => {
              const Icon = categoryIcons[service.category] || Snowflake;
              return (
                <motion.button
                  key={i}
                  onClick={() => setActiveService(i)}
                  role="tab"
                  aria-selected={activeService === i}
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
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {current.category}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-cyan-400 font-medium">
                          {current.timeEstimate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                    {current.description}
                  </p>

                  {/* Process chain */}
                  {current.process && (
                    <div className="mb-6">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                        Схема работы
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {current.process
                          .split(' → ')
                          .map((step: string, idx: number, arr: string[]) => (
                            <React.Fragment key={idx}>
                              <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-300 text-xs font-medium">
                                {step}
                              </span>
                              {idx < arr.length - 1 && (
                                <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0 self-center" />
                              )}
                            </React.Fragment>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Items list */}
                  <div className="mb-6">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                      Виды работ
                    </div>
                    <ul className="space-y-2">
                      {(current.items || []).map((item: string, idx: number) => (
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
                      <div className="text-white font-semibold text-sm leading-snug">
                        {current.timeEstimate}
                      </div>
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
                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                      Мастер готов выехать в течение 2–4 часов. Позвоните или оставьте заявку —
                      перезвоним за 5 минут.
                    </p>
                    <a href={`tel:${tel}`} className="flex items-center gap-3 group">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
                        <Phone className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-base group-hover:text-blue-300 transition-colors">
                          {phone}
                        </div>
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

      <section className="bg-slate-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div>
              <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-2">
                Преимущества сервиса
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Работаем как технический партнёр, а не разовый мастер
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Мы не просто устраняем поломку, а проверяем причину отказа, состояние узлов,
                герметичность системы и риски повторной остановки оборудования.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {advantages.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-600/15 border border-blue-500/25 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
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
                  <Button
                    size="lg"
                    className="w-full bg-white text-blue-700 hover:bg-blue-50 font-bold shadow-xl"
                  >
                    <Phone className="w-5 h-5 mr-2" /> Позвонить сейчас
                  </Button>
                </a>
                <Link href="/contacts" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-white/60 text-white hover:bg-white/10"
                  >
                    Оставить заявку
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {faq.length > 0 && (
        <section className="bg-slate-800/30 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-2">
                Вопросы клиентов
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Часто спрашивают перед ремонтом
              </h2>
            </div>
            <div className="space-y-3">
              {faq.map((item: any) => {
                const open = openFaqId === item.id;
                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-700 bg-slate-900/60 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(open ? null : item.id)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                      aria-expanded={open}
                    >
                      <span className="text-white font-semibold text-sm sm:text-base">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 text-slate-400 text-sm leading-relaxed">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
            {Array.isArray(content.faq) && content.faq.length > 4 && (
              <div className="flex justify-center mt-6">
                <button
                  type="button"
                  onClick={() => setShowAllFaq(!showAllFaq)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-600 text-slate-200 hover:border-blue-500 hover:text-white transition-colors"
                >
                  {showAllFaq ? 'Скрыть вопросы' : 'Показать больше вопросов'}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${showAllFaq ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
