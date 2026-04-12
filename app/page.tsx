'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Phone, CheckCircle, ArrowRight, Snowflake, Star } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Image from 'next/image';

export default function Home() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('all');

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

  const stats = [
    { value: '10+', label: 'лет на рынке' },
    { value: '5000+', label: 'клиентов' },
    { value: '24/7', label: 'поддержка' },
    { value: '1 год', label: 'гарантия' },
  ];

  const processSteps = [
    { step: '01', title: 'Заявка', desc: 'Оставьте заявку на сайте или по телефону' },
    { step: '02', title: 'Диагностика', desc: 'Мастер приедет и бесплатно определит неисправность' },
    { step: '03', title: 'Ремонт', desc: 'Согласуем стоимость и выполним работы с гарантией' },
    { step: '04', title: 'Результат', desc: 'Проверим оборудование и выдадим гарантийный талон' },
  ];

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/15 via-transparent to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-semibold mb-8 backdrop-blur-sm">
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" /> {content.hero.subtitle}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {content.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              {content.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${content.hero.phone}`}>
                <Button size="lg" className="w-full sm:w-auto">
                  <Phone className="w-5 h-5 mr-2" /> {content.hero.cta}
                </Button>
              </a>
              <a href="/services">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Наши услуги <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
          </motion.div>
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            {stats.map((stat, i) => (
              <div key={i} className="bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-2xl p-5 hover:border-blue-500/60 hover:bg-slate-800/80 transition-all duration-300 shadow-lg">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <Section id="services">
        <SectionHeader title="Наши услуги" subtitle="Комплексный подход" centered />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.services.map((service: any, i: number) => (
            <motion.div key={service.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
              {service.image && (
                <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-slate-700/30 to-slate-800/30">
                  <Image
                    src={service.image}
                    alt={service.category}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">{service.category}</h3>
                <ul className="text-slate-400 text-sm space-y-2">
                  {service.items.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="/services">
            <Button variant="outline">
              Все услуги <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </Section>

      <Section background="light">
        <SectionHeader title="Почему выбирают нас" subtitle="Наши преимущества" centered />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.advantages.map((adv: any, i: number) => (
            <motion.div key={adv.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 border border-gray-100 hover:border-blue-200 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{adv.title}</h4>
              <span className="text-gray-600 text-sm leading-relaxed">{adv.description}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader title="Наши партнёры" subtitle="Работаем с ведущими брендами" centered />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {content.partners?.map((partner: any, i: number) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center hover:bg-slate-800/70 hover:border-blue-500/30 transition-all"
            >
              <div className="text-2xl font-bold text-white mb-2">{partner.name}</div>
              <p className="text-slate-400 text-sm">{partner.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section background="light">
        <SectionHeader title="Отзывы клиентов" subtitle="Что говорят о нас" centered />
        {content.yandexRating && (
          <div className="flex justify-center mb-8">
            <a href={content.yandexMapsUrl || 'https://yandex.ru/maps/org/federatsiya_kholoda/158193223407/reviews/'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors">
              <div className="flex items-center gap-1">
                <Star size={20} className="fill-current" />
                <span className="text-2xl font-bold">{content.yandexRating}</span>
              </div>
              <span className="text-sm">на основе {content.yandexReviewCount || 0} отзывов</span>
            </a>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.testimonials?.map((testimonial: any, i: number) => (
            <motion.div key={testimonial.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 border border-gray-100 hover:border-blue-200 transition-all duration-300">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, idx) => (
                  <Star key={idx} size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">{testimonial.text}</p>
              <div>
                <p className="font-semibold text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href={content.yandexMapsUrl || 'https://yandex.ru/maps/org/federatsiya_kholoda/158193223407/reviews/'} target="_blank" rel="noopener noreferrer">
            <Button variant="outline">
              Все отзывы на Яндекс Картах <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </Section>

      <Section background="light">
        <SectionHeader title="Акции и скидки" subtitle="Выгодные предложения" centered />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {content.promotions?.map((promo: any, i: number) => (
            <motion.div key={promo.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🎉</div>
              <h4 className="text-xl font-bold text-white mb-2">{promo.title}</h4>
              <p className="text-blue-100 mb-3">{promo.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-200">До: {promo.validUntil}</span>
                <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full backdrop-blur-sm">{promo.code}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section background="dark">
        <SectionHeader title="Наши гарантии" subtitle="Ваша уверенность в качестве" centered />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {content.guarantees?.map((guarantee: any, i: number) => (
            <motion.div key={guarantee.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group text-center p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-600/50 hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">✅</div>
              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">{guarantee.title}</h4>
              <p className="text-slate-300">{guarantee.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section background="light">
        <SectionHeader title="Часто задаваемые вопросы" subtitle="Ответы на популярные вопросы" centered />
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {['all', 'service', 'price', 'equipment', 'warranty'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedFaqCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedFaqCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {category === 'all' ? 'Все' : category === 'service' ? 'Услуги' : category === 'price' ? 'Цены' : category === 'equipment' ? 'Оборудование' : 'Гарантии'}
            </button>
          ))}
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {content.faq
            ?.filter((item: any) => selectedFaqCategory === 'all' || item.category === selectedFaqCategory)
            .map((item: any, index: number) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 border border-gray-100 hover:border-blue-200 transition-all duration-300">
                <h4 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{item.question}</h4>
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </motion.div>
            ))}
        </div>
      </Section>

      <Section>
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 border border-blue-500/30 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-500/20">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Нужен срочный ремонт?</h3>
            <p className="text-blue-100">Оставьте заявку — мастер перезвонит в течение 15 минут</p>
          </div>
          <a href={`tel:${content.contacts.phone}`}>
            <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Phone className="w-5 h-5 mr-2" /> {content.contacts.phone}
            </Button>
          </a>
        </div>
      </Section>
    </>
  );
}
