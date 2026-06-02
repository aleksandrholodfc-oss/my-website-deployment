'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, CheckCircle, ArrowRight, Star, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Image from 'next/image';
import StatsCounter from '@/components/StatsCounter';
import RequestModal from '@/components/RequestModal';
import RepairCalculator from '@/components/RepairCalculator';

interface HomeClientProps {
  content: any;
}

export default function HomeClient({ content }: HomeClientProps) {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const [showAllFaq, setShowAllFaq] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const stats = [
    { value: '500+', label: 'выполненных ремонтов' },
    { value: '10+', label: 'лет опыта' },
    { value: '24/7', label: 'выезд' },
    { value: '1 год', label: 'гарантия' },
  ];

  const serviceSlug: Record<number, string> = {
    1: 'trade',
    2: 'industrial',
    3: 'climate',
    4: 'auto',
    5: 'refrigerator',
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-600/15 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/30 rounded-full blur-3xl animate-soft-float" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-80 sm:h-80 bg-cyan-500/25 rounded-full blur-3xl animate-soft-float [animation-delay:1.2s]" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500/20 rounded-full blur-3xl animate-soft-float [animation-delay:2.1s]" />
        <div className="absolute top-1/3 right-1/3 w-40 h-40 sm:w-64 sm:h-64 bg-indigo-500/15 rounded-full blur-3xl animate-soft-float [animation-delay:3s]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-blue-500/25 to-cyan-500/25 border border-blue-400/40 rounded-full text-blue-200 text-xs sm:text-sm font-semibold mb-6 sm:mb-8 backdrop-blur-md shadow-lg shadow-blue-500/20"
            >
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-400 rounded-full animate-pulse" />{' '}
              {content.hero.subtitle}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-[1.08] tracking-tight bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent"
            >
              {content.hero.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-6 sm:mb-10 leading-relaxed px-2"
            >
              {content.hero.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-4"
            >
              <Button
                size="lg"
                onClick={() => setIsRequestModalOpen(true)}
                className="w-full sm:w-auto text-sm sm:text-base bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/30"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> {content.hero.cta}
              </Button>
              <a href="/services" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-sm sm:text-base border-blue-400/50 hover:bg-blue-500/20 hover:border-blue-400"
                >
                  Наши услуги <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 sm:mt-16 max-w-4xl mx-auto px-4"
          >
            <StatsCounter stats={stats} />
          </motion.div>
        </div>
      </section>

      <Section id="services">
        <SectionHeader title="Наши услуги" subtitle="Комплексный подход" centered />

        {(() => {
          const ServiceCard = ({ service, i }: { service: any; i: number }) => (
            <motion.a
              href={serviceSlug[service.id] ? `/services/${serviceSlug[service.id]}` : '/services'}
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col bg-gradient-to-b from-slate-800/80 to-slate-900 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] hover:-translate-y-2 transition-all duration-500 cursor-pointer"
            >
              {/* Изображение с заголовком поверх */}
              <div className="relative h-64 overflow-hidden shrink-0">
                {service.image && (
                  <Image
                    src={service.image}
                    alt={service.category}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 px-5 pb-3.5">
                  <h3 className="text-white font-bold text-lg leading-snug group-hover:text-blue-300 transition-colors duration-300 drop-shadow-lg">
                    {service.category}
                  </h3>
                </div>
              </div>

              {/* Контент — flex-1 для выравнивания */}
              <div className="flex flex-col flex-1 px-5 py-4">
                <ul className="flex-1 space-y-2">
                  {service.items?.map((item: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-slate-400 text-sm group-hover:text-slate-300 transition-colors duration-300"
                    >
                      <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Футер */}
                <div className="mt-4 pt-3 border-t border-slate-700/40 flex items-center justify-end">
                  <span className="inline-flex items-center gap-1 text-xs text-blue-400 group-hover:text-blue-300 font-semibold transition-colors duration-300">
                    Подробнее{' '}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </motion.a>
          );

          const services = content.services ?? [];
          const top = services.slice(0, 3);
          const bottom = services.slice(3);

          return (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {top.map((s: any, i: number) => (
                  <ServiceCard key={s.id} service={s} i={i} />
                ))}
              </div>
              {bottom.length > 0 && (
                <div
                  className={`grid gap-5 mx-auto ${bottom.length === 2 ? 'sm:grid-cols-2 max-w-[calc(66.666%+1.25rem)]' : 'sm:grid-cols-2 lg:grid-cols-3'}`}
                >
                  {bottom.map((s: any, i: number) => (
                    <ServiceCard key={s.id} service={s} i={i + top.length} />
                  ))}
                </div>
              )}
            </div>
          );
        })()}

        <div className="text-center mt-8">
          <a href="/services">
            <Button variant="outline" className="text-sm sm:text-base">
              Все услуги <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </Section>

      <Section background="light">
        <SectionHeader title="Почему выбирают нас" subtitle="Наши преимущества" centered />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 max-w-4xl mx-auto">
          {content.advantages.map((adv: any, i: number) => (
            <motion.div
              key={adv.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group flex items-start gap-2.5 p-3 sm:p-4 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200"
            >
              <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors leading-tight">
                  {adv.title}
                </h4>
                <p className="text-gray-500 text-xs leading-snug mt-0.5 hidden sm:block">
                  {adv.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section background="dark">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
            {content.guarantees?.map((g: any) => (
              <div
                key={g.id}
                className="flex items-center gap-2 px-3 py-1.5 bg-green-500/15 border border-green-500/30 rounded-full"
              >
                <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                <span className="text-green-200 text-xs font-medium">{g.title}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div>
              <p className="text-xs text-blue-400 font-semibold uppercase tracking-wide mb-1">
                Калькулятор стоимости
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Сколько стоит ремонт?
              </h2>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                Рассчитайте примерную стоимость за 30 секунд. Точная цена — после бесплатной
                диагностики на месте.
              </p>
              <ul className="space-y-1.5">
                {[
                  'Диагностика бесплатна при согласовании ремонта',
                  'Без скрытых платежей',
                  'Согласование стоимости до начала работ',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-300 text-xs">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <RepairCalculator />
          </div>
        </div>
      </Section>

      <Section background="light" className="pb-6 md:pb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
          <div>
            <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-0.5">
              Что говорят о нас
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Отзывы клиентов</h2>
          </div>
          {content.yandexRating && (
            <a
              href={
                content.yandexMapsUrl ||
                'https://yandex.ru/maps/org/federatsiya_kholoda/158193223407/reviews/'
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors text-xs shrink-0"
            >
              <Star size={12} className="fill-current" />
              <span className="font-bold">{content.yandexRating}</span>
              <span>· {content.yandexReviewCount || 0} отзывов</span>
            </a>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {content.testimonials?.slice(0, 3).map((testimonial: any, i: number) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-0.5 mb-2">
                {[...Array(testimonial.rating)].map((_, idx) => (
                  <Star key={idx} size={12} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-2.5 line-clamp-3">
                {testimonial.text}
              </p>
              <div className="border-t border-gray-100 pt-2">
                <p className="font-semibold text-gray-800 text-xs">{testimonial.name}</p>
                <p className="text-xs text-gray-400">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-4">
          <a
            href={
              content.yandexMapsUrl ||
              'https://yandex.ru/maps/org/federatsiya_kholoda/158193223407/reviews/'
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            Все отзывы на Яндекс Картах <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </Section>

      <Section background="light" className="pt-6 md:pt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-0.5">
              Выгодные предложения
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Акции и скидки</h2>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {content.promotions?.map((promo: any, i: number) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex-1 flex items-start gap-3 p-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-md"
            >
              <span className="text-xl shrink-0">🎉</span>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-white leading-tight">{promo.title}</h4>
                <p className="text-blue-100 text-xs mt-0.5 leading-snug">{promo.description}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs bg-white/20 text-white px-1.5 py-0.5 rounded font-mono">
                    {promo.code}
                  </span>
                  <span className="text-xs text-blue-200">до {promo.validUntil}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="py-6 md:py-8">
        <p className="text-xs text-slate-400 uppercase tracking-widest font-medium text-center mb-4">
          Работаем с ведущими брендами
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {content.partners?.map((partner: any, i: number) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/60 border border-slate-700/60 rounded-full hover:border-blue-500/40 hover:bg-slate-800 transition-all"
            >
              <span className="text-white text-xs font-semibold">{partner.name}</span>
              <span className="text-slate-500 text-xs hidden sm:inline">
                · {partner.description}
              </span>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section background="light">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-5">
            <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-0.5">
              Ответы на популярные вопросы
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Часто задаваемые вопросы
            </h2>
          </div>
          <div className="space-y-1.5">
            {(showAllFaq ? content.faq : content.faq?.slice(0, 6))?.map((item: any) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white"
              >
                <button
                  onClick={() => setOpenFaqId(openFaqId === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-800 leading-snug">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${openFaqId === item.id ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaqId === item.id && (
                  <div className="px-4 pb-3 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-2.5">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
          {content.faq?.length > 6 && (
            <div className="text-center mt-3">
              <button
                onClick={() => setShowAllFaq(!showAllFaq)}
                className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
              >
                {showAllFaq ? 'Свернуть' : `Ещё ${content.faq.length - 6} вопросов`}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${showAllFaq ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
          )}
        </div>
      </Section>

      <Section>
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 border border-blue-500/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 shadow-xl shadow-blue-500/20">
          <div className="text-center md:text-left">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
              Нужен срочный ремонт?
            </h3>
            <p className="text-blue-100 text-sm sm:text-base">
              Оставьте заявку — мастер перезвонит в течение 15 минут
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a href={`tel:${content.contacts.phone}`} className="w-full md:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 w-full md:w-auto text-sm sm:text-base"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> {content.contacts.phone}
              </Button>
            </a>
            <Button
              size="lg"
              onClick={() => setIsRequestModalOpen(true)}
              className="bg-blue-700 hover:bg-blue-800 text-white w-full md:w-auto text-sm sm:text-base"
            >
              Оставить заявку
            </Button>
          </div>
        </div>
        <RequestModal isOpen={isRequestModalOpen} onClose={() => setIsRequestModalOpen(false)} />
      </Section>
    </>
  );
}
