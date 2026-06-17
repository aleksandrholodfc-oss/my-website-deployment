'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Star,
  ChevronDown,
  Wrench,
  ThumbsUp,
  ShoppingBag,
  Package,
  Warehouse,
  Droplets,
  ChefHat,
  LayoutGrid,
  Flower2,
  GlassWater,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const SERVICE_TYPES = [
  {
    icon: ShoppingBag,
    name: 'Холодильные витрины',
    desc: 'Напольные, настенные и островные — любые форматы. Ремонт без остановки продаж.',
    works: [
      'Замена мотор-компрессора',
      'Ремонт испарителя и конденсатора',
      'Устранение утечек фреона',
      'Замена ТРВ и фильтра-осушителя',
      'Ремонт блока управления',
      'Настройка температурного режима',
    ],
  },
  {
    icon: Package,
    name: 'Морозильные бонеты и лари',
    desc: 'Любая вместимость. Диагностика и ремонт в день обращения.',
    works: [
      'Замена компрессора',
      'Устранение утечек хладагента',
      'Ремонт испарителя',
      'Заправка фреоном',
      'Вакуумирование системы',
      'Настройка температуры',
    ],
  },
  {
    icon: Warehouse,
    name: 'Холодильные камеры и шкафы',
    desc: 'Плановое обслуживание и капитальный ремонт холодильных камер любого объёма.',
    works: [
      'Плановое техническое обслуживание',
      'Капитальный ремонт',
      'Замена компрессора',
      'Ремонт изоляции',
      'Замена блока управления',
      'Вакуумирование и заправка',
    ],
  },
  {
    icon: Droplets,
    name: 'Льдогенераторы',
    desc: 'Ремонт грануляторных, пластинчатых и кубиковых льдогенераторов.',
    works: [
      'Ремонт всех типов льдогенераторов',
      'Замена испарителя',
      'Ремонт систем подачи воды',
      'Замена компрессора',
      'Чистка и дезинфекция',
    ],
  },
  {
    icon: ChefHat,
    name: 'Холодильные столы',
    desc: 'Ремонт холодильных столов для профессиональных кухонь ресторанов и кафе.',
    works: [
      'Замена компрессора',
      'Устранение утечек',
      'Ремонт испарителя',
      'Заправка фреоном',
      'Замена блока управления',
    ],
  },
  {
    icon: LayoutGrid,
    name: 'Холодильные горки',
    desc: 'Обслуживание и ремонт холодильных горок для торговых залов супермаркетов.',
    works: [
      'Замена компрессора',
      'Ремонт испарителя и конденсатора',
      'Настройка температуры',
      'Заправка фреоном',
      'Замена блока управления',
    ],
  },
  {
    icon: Flower2,
    name: 'Камеры для цветов',
    desc: 'Специализированный ремонт с поддержанием точной температуры и влажности.',
    works: [
      'Ремонт систем вентиляции',
      'Контроль влажности',
      'Замена компрессора',
      'Ремонт испарителя',
      'Заправка фреоном',
    ],
  },
  {
    icon: GlassWater,
    name: 'Пивоохладители',
    desc: 'Ремонт пивоохладителей для ресторанов, баров и магазинов любых марок.',
    works: [
      'Замена компрессора',
      'Устранение утечек',
      'Ремонт испарителя',
      'Заправка фреоном',
      'Настройка температуры',
    ],
  },
];

const PRICES = [
  { name: 'Диагностика + выезд', price: 'Бесплатно при ремонте' },
  { name: 'Замена компрессора до 500 Вт', price: 'от 2 000 руб.' },
  { name: 'Замена компрессора 500–1200 Вт', price: 'от 3 000 руб.' },
  { name: 'Замена блока управления', price: '1 500 руб.' },
  { name: 'Замена термостата / ТРВ', price: 'от 1 000 руб.' },
  { name: 'Заправка фреоном до 1 кг', price: '1 000 руб.' },
  { name: 'Заправка фреоном 1–2 кг', price: '1 500 руб.' },
  { name: 'Замена испарителя / конденсатора', price: 'от 2 000 руб.' },
  { name: 'Чистка конденсатора', price: '500 руб.' },
  { name: 'Поиск и устранение утечки', price: 'от 1 000 руб.' },
  { name: 'Ремонт электросхемы', price: '500–1 000 руб.' },
  { name: 'Замена вентилятора', price: '1 500 руб.' },
];

const SYMPTOMS = [
  'Не поддерживает температуру',
  'Не запускается компрессор',
  'Намерзает испаритель',
  'Течёт фреон',
  'Шумит и вибрирует',
  'Не включается',
  'Высокое энергопотребление',
  'Не охлаждает',
];

interface Props {
  contacts: any;
}

export default function TradePageClient({ contacts }: Props) {
  const [openService, setOpenService] = useState<number | null>(null);
  const [showAllPrices, setShowAllPrices] = useState(false);
  const phone = contacts?.phone || '+7 (914) 8866774';
  const visiblePrices = showAllPrices ? PRICES : PRICES.slice(0, 7);

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[540px] md:min-h-[620px] flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&h=900&fit=crop&q=80"
            alt="Торговое холодильное оборудование в магазине"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/97 via-slate-900/85 to-slate-900/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm font-semibold">Принимаем заявки 24/7</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Ремонт торгового
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                холодильного
                <br />
                оборудования
              </span>
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl">
              Витрины, лари, камеры, льдогенераторы и пивоохладители. Диагностика на месте — выезд
              за 2–4 часа по Иркутску и области.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`tel:${phone}`}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-xl shadow-blue-500/30 font-bold"
                >
                  <Phone className="w-5 h-5 mr-2" /> {phone}
                </Button>
              </a>
              <Link href="/contacts">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-slate-500 text-white hover:bg-slate-800"
                >
                  Оставить заявку <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 flex flex-wrap gap-3"
          >
            {[
              { icon: Clock, label: 'Выезд за 2–4 часа' },
              { icon: Shield, label: 'Гарантия до 12 мес.' },
              { icon: ThumbsUp, label: 'Диагностика бесплатно' },
              { icon: Star, label: 'Рейтинг 5.0 на Яндекс' },
            ].map(({ icon: Ic, label }, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/70 backdrop-blur border border-slate-700 rounded-full"
              >
                <Ic className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-slate-200 text-sm font-medium">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SYMPTOMS STRIP ─────────────────────────────────────────────────── */}
      <section className="bg-slate-800/50 border-y border-slate-700/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-slate-500 text-xs uppercase tracking-widest font-medium mb-4 text-center">
            Решаем эти проблемы
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {SYMPTOMS.map((s, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/50 border border-slate-600 rounded-full text-sm text-slate-300 hover:border-blue-500/50 hover:text-white transition-colors"
              >
                <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0" /> {s}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE TYPES GRID ─────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-sm font-semibold mb-4">
              Виды услуг
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Что мы ремонтируем</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Работаем с оборудованием всех производителей. Используем только оригинальные запчасти.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICE_TYPES.map((svc, i) => {
              const Icon = svc.icon;
              const open = openService === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setOpenService(open ? null : i)}
                  className={`bg-slate-800/50 border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
                    open
                      ? 'border-blue-500/60 shadow-lg shadow-blue-500/10'
                      : 'border-slate-700 hover:border-blue-500/40 hover:shadow-md hover:shadow-blue-500/5'
                  }`}
                >
                  <div className="p-5">
                    <div className="w-11 h-11 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-white font-bold text-base mb-2">{svc.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{svc.desc}</p>
                    <div className="flex items-center gap-1 mt-3 text-blue-400 text-xs font-semibold">
                      {open ? 'Свернуть' : 'Виды работ'}
                      <motion.div
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 border-t border-slate-700/50 pt-4">
                          <ul className="space-y-1.5">
                            {svc.works.map((w, wi) => (
                              <li
                                key={wi}
                                className="flex items-start gap-2 text-slate-300 text-sm"
                              >
                                <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                                {w}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BENEFITS + IMAGE ───────────────────────────────────────────────── */}
      <section className="bg-slate-800/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-sm font-semibold mb-4">
                Почему важно вовремя
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Каждый час простоя — прямые убытки
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Торговое холодильное оборудование работает 24/7. Неисправность витрины или
                холодильного шкафа — это порча товара, штрафы и потеря выручки. Мы выезжаем за 2–4
                часа и устраняем большинство поломок прямо на месте без вывоза техники.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Clock, text: 'Выезд в течение 2–4 часов — без ожидания' },
                  { icon: Wrench, text: 'Ремонт прямо на месте, без эвакуации техники' },
                  { icon: Shield, text: 'Письменная гарантия до 12 месяцев' },
                  { icon: ThumbsUp, text: 'Только оригинальные запчасти со склада' },
                  { icon: Star, text: 'Скидка 5% при оформлении заявки через сайт' },
                ].map(({ icon: Ic, text }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-9 h-9 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Ic className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-slate-300 text-sm">{text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-80 lg:h-[500px] rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/torgovoe.jpg"
                alt="Ремонт торгового холодильного оборудования"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-3 bg-slate-900/85 backdrop-blur rounded-xl px-4 py-3 border border-slate-700">
                  <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                  <span className="text-white text-sm font-medium">
                    Мастер готов выехать прямо сейчас
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ────────────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-sm font-semibold mb-4">
              Схема работы
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Как мы работаем</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
            {[
              {
                n: '01',
                title: 'Звонок',
                desc: 'Опишите проблему — дадим предварительный прогноз по телефону',
              },
              { n: '02', title: 'Выезд', desc: 'Мастер приезжает за 2–4 часа со всем необходимым' },
              {
                n: '03',
                title: 'Диагностика',
                desc: 'Бесплатная диагностика на месте, определение неисправности',
              },
              {
                n: '04',
                title: 'Ремонт',
                desc: 'Устраняем неисправность с согласованием цены заранее',
              },
              {
                n: '05',
                title: 'Гарантия',
                desc: 'Выдаём письменную гарантию до 12 месяцев на работы',
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center relative"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
                  <span className="text-white font-bold text-sm">{step.n}</span>
                </div>
                <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICE TABLE ────────────────────────────────────────────────────── */}
      <section className="bg-slate-800/30 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-sm font-semibold mb-4">
              Прайс-лист
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Стоимость работ</h2>
            <p className="text-slate-400">
              Ориентировочные цены. Точная стоимость — после бесплатной диагностики на месте.
            </p>
          </motion.div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-2 px-5 py-3 bg-slate-700/30 border-b border-slate-700">
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Вид работ
              </span>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider text-right">
                Стоимость
              </span>
            </div>
            {visiblePrices.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="grid grid-cols-2 px-5 py-3.5 border-b border-slate-700/40 last:border-0 hover:bg-slate-700/20 transition-colors"
              >
                <span className="text-slate-300 text-sm pr-4">{item.name}</span>
                <span className="text-blue-300 font-semibold text-sm text-right">{item.price}</span>
              </motion.div>
            ))}
          </div>

          {PRICES.length > 7 && (
            <div className="text-center mt-4">
              <button
                onClick={() => setShowAllPrices(!showAllPrices)}
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                {showAllPrices ? 'Свернуть' : `Показать все ${PRICES.length} позиций`}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${showAllPrices ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
          )}
          <p className="text-slate-500 text-xs text-center mt-4">
            * Цены указаны без учёта стоимости запчастей. Стоимость согласовывается до начала работ.
          </p>
        </div>
      </section>

      {/* ── RELATED SERVICES ───────────────────────────────────────────────── */}
      <section className="bg-slate-800/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-slate-400 text-sm text-center mb-6 font-medium">Другие направления</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                href: '/services/industrial',
                label: 'Промышленное',
                sub: 'Чиллеры, камеры, централи',
              },
              {
                href: '/services/climate',
                label: 'Климатическое',
                sub: 'Кондиционеры, вентиляция',
              },
              { href: '/services/auto', label: 'Автокондиционеры', sub: 'Заправка и ремонт' },
              {
                href: '/services/refrigerator',
                label: 'Рефрижераторы',
                sub: 'Thermo King, Carrier',
              },
            ].map(({ href, label, sub }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between gap-3 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3.5 hover:border-blue-500/50 hover:bg-slate-800 transition-all group"
              >
                <div>
                  <div className="text-white font-semibold text-sm group-hover:text-blue-300 transition-colors">
                    {label}
                  </div>
                  <div className="text-slate-500 text-xs mt-0.5">{sub}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-2xl shadow-blue-500/25"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Нужен ремонт торгового оборудования?
                </h3>
                <p className="text-blue-100 text-base max-w-lg">
                  Позвоните прямо сейчас — мастер выедет за 2–4 часа. Диагностика бесплатна при
                  ремонте.
                </p>
                <div className="flex flex-wrap gap-3 mt-4 justify-center lg:justify-start">
                  {['Диагностика бесплатно', 'Без скрытых платежей', 'Гарантия 12 мес.'].map(
                    (item) => (
                      <span key={item} className="flex items-center gap-1.5 text-blue-100 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-300 flex-shrink-0" /> {item}
                      </span>
                    )
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <a href={`tel:${phone}`}>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-50 font-bold shadow-xl"
                  >
                    <Phone className="w-5 h-5 mr-2" /> {phone}
                  </Button>
                </a>
                <Link href="/contacts">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white/60 text-white hover:bg-white/10"
                  >
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
