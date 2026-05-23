'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Phone, MessageSquare, CheckCircle, Wrench, Clock, Shield, Award, ArrowRight } from 'lucide-react';

export interface ServiceItem {
  name: string;
  desc: string;
  works: string[];
}

export interface PriceItem {
  name: string;
  price: string;
}

export interface RelatedLink {
  href: string;
  label: string;
  sub: string;
}

export interface ServicePageConfig {
  title: string;
  subtitle: string;
  breadcrumbLabel: string;
  heroImage: string;
  localImage: string;
  heroDesc: string;
  ctaTitle: string;
  ctaDesc: string;
  symptoms: string[];
  services: ServiceItem[];
  prices: PriceItem[];
  relatedLinks: RelatedLink[];
  phone: string;
  schemaName: string;
  schemaUrl: string;
  steps: { step: string; title: string; desc: string }[];
}

const PRICE_PREVIEW = 7;

export default function ServicePageTemplate({ cfg }: { cfg: ServicePageConfig }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visiblePrices = showAll ? cfg.prices : cfg.prices.slice(0, PRICE_PREVIEW);
  const tel = cfg.phone.replace(/\D/g, '').replace(/^8/, '+7');

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[520px] flex items-end overflow-hidden bg-slate-900">
        <Image
          src={cfg.heroImage}
          alt={cfg.title}
          fill
          className="object-cover opacity-30"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 pt-24 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              {cfg.subtitle}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4 max-w-3xl">
              {cfg.title}
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
              {cfg.heroDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`tel:${tel}`}>
                <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                  <Phone className="w-4 h-4" /> Вызвать мастера
                </button>
              </a>
              <Link href="/contacts">
                <button className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                  <MessageSquare className="w-4 h-4" /> Оставить заявку
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SYMPTOMS ─────────────────────────────────────────────────────────── */}
      <section className="bg-slate-800/60 border-y border-slate-700/50 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-medium mb-3">Решаем проблемы</p>
          <div className="flex flex-wrap gap-2">
            {cfg.symptoms.map((s, i) => (
              <span key={i} className="px-3 py-1.5 bg-slate-700/60 border border-slate-600 rounded-full text-slate-300 text-xs font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-2">Виды услуг</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Что мы ремонтируем</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {cfg.services.map((svc, i) => {
              const open = openIdx === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`rounded-xl border transition-all duration-300 overflow-hidden ${open ? 'border-blue-500/60 bg-slate-800' : 'border-slate-700/60 bg-slate-800/50 hover:border-slate-600'}`}
                >
                  <button
                    className="w-full flex items-center gap-4 px-5 py-4 text-left"
                    onClick={() => setOpenIdx(open ? null : i)}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <Wrench className="w-5 h-5 text-white" />
                    </div>
                    <span className="flex-1 text-white font-semibold text-sm sm:text-base">{svc.name}</span>
                    {open ? <ChevronUp className="w-4 h-4 text-blue-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />}
                  </button>
                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1">
                          <p className="text-slate-400 text-sm mb-3 leading-relaxed">{svc.desc}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1">
                            {svc.works.map((w, j) => (
                              <span key={j} className="flex items-center gap-1.5 text-slate-300 text-xs">
                                <CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0" /> {w}
                              </span>
                            ))}
                          </div>
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

      {/* ── BENEFITS + IMAGE ─────────────────────────────────────────────────── */}
      <section className="bg-slate-800/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-2">Почему выбирают нас</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Гарантия результата</h2>
              <div className="space-y-4">
                {[
                  { icon: Clock,   title: 'Выезд в день обращения', desc: 'Мастер прибудет в удобное для вас время' },
                  { icon: Award,   title: 'Гарантия на работы', desc: 'До 12 месяцев на выполненный ремонт' },
                  { icon: Shield,  title: 'Оригинальные запчасти', desc: 'Только проверенные комплектующие' },
                  { icon: Wrench,  title: 'Фиксированная стоимость', desc: 'Цена согласуется до начала ремонта' },
                  { icon: Phone,   title: 'Консультация бесплатно', desc: 'Помогаем определить причину поломки' },
                ].map(({ icon: Icon, title, desc }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{title}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl shadow-black/40">
              <Image
                src={cfg.localImage}
                alt={cfg.title}
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── STEPS ────────────────────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-2">Процесс</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Как мы работаем</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {cfg.steps.map(({ step, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-slate-800/60 border border-slate-700/60 rounded-xl p-5"
              >
                <span className="text-4xl font-black text-blue-600/20 leading-none">{step}</span>
                <h3 className="text-white font-semibold text-sm mt-2 mb-1">{title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
                {i < cfg.steps.length - 1 && (
                  <ArrowRight className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600/40 hidden lg:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICES ───────────────────────────────────────────────────────────── */}
      <section className="bg-slate-800/30 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-2">Стоимость</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Прайс-лист</h2>
          </div>
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden">
            {visiblePrices.map((item, i) => (
              <div key={i} className={`flex items-center justify-between px-5 py-3.5 gap-4 ${i % 2 === 0 ? 'bg-transparent' : 'bg-slate-800/40'}`}>
                <span className="text-slate-300 text-sm">{item.name}</span>
                <span className="text-blue-400 font-bold text-sm whitespace-nowrap">{item.price}</span>
              </div>
            ))}
            {cfg.prices.length > PRICE_PREVIEW && (
              <div className="px-5 py-4 border-t border-slate-700">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  {showAll ? 'Скрыть' : `Показать все ${cfg.prices.length} позиции`}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
                </button>
              </div>
            )}
          </div>
          <p className="text-slate-500 text-xs text-center mt-4">
            * Цены указаны без учёта стоимости запчастей. Стоимость согласовывается до начала работ.
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600/20 to-cyan-600/10 border border-blue-500/30 rounded-2xl p-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{cfg.ctaTitle}</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">{cfg.ctaDesc}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`tel:${tel}`}>
                <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3 rounded-xl transition-colors">
                  <Phone className="w-4 h-4" /> {cfg.phone}
                </button>
              </a>
              <Link href="/contacts">
                <button className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-7 py-3 rounded-xl transition-colors">
                  <MessageSquare className="w-4 h-4" /> Оставить заявку
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── RELATED ──────────────────────────────────────────────────────────── */}
      <section className="bg-slate-800/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-slate-400 text-sm text-center mb-6 font-medium">Другие направления</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cfg.relatedLinks.map(({ href, label, sub }, i) => (
              <Link key={i} href={href}>
                <div className="flex items-center gap-3 bg-slate-800/60 border border-slate-700 hover:border-blue-500/50 rounded-xl p-4 transition-all group">
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm group-hover:text-blue-300 transition-colors">{label}</p>
                    <p className="text-slate-500 text-xs mt-0.5 truncate">{sub}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
