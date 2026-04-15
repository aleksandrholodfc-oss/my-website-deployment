'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wind, CheckCircle, Phone, ArrowRight, Award, Clock, Shield, Thermometer, DollarSign } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Link from 'next/link';

export default function ClimateEquipmentPage() {
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

  // Climate-specific prices extracted from comprehensive price list
  const climatePrices = [
    { name: "Выезд мастера + диагностика", price: "0 руб. (при ремонте)" },
    { name: "Замена мотор-компрессора 500-800 Вт", price: "3000 руб. + запчасть" },
    { name: "Замена мотор-компрессора 800-1200 Вт", price: "4000 руб. + запчасть" },
    { name: "Замена электронного блока управления", price: "1500 руб." },
    { name: "Замена термостата", price: "1000 руб." },
    { name: "Замена вентилятора конденсатора", price: "1500 руб." },
    { name: "Замена вентилятора испарителя", price: "1000 руб." },
    { name: "Заправка фреоном до 1 кг", price: "1000 руб." },
    { name: "Заправка фреоном 1-2 кг", price: "1500 руб." },
    { name: "Чистка конденсатора", price: "500 руб." },
    { name: "Чистка испарителя", price: "800 руб." },
    { name: "Замена фильтра-осушителя", price: "1000-1500 руб." },
    { name: "Комплексная диагностика", price: "от 2000 руб." },
  ];
  const services = [
    {
      name: "Мультисплит-системы",
      description: "Установка, ремонт и обслуживание мультисплит-систем с несколькими внутренними блоками. Диагностика, дозаправка фреоном, замена компрессоров.",
      details: ["Мультисплит-системы 2-5 блоков", "Ремонт внешних блоков", "Замена внутренних блоков", "Дозаправка фреоном", "Чистка и дезинфекция", "Настройка режимов"]
    },
    {
      name: "Канальные кондиционеры",
      description: "Монтаж и ремонт канальных кондиционеров для скрытой установки. Подбор оборудования, прокладка воздуховодов, настройка.",
      details: ["Канальные кондиционеры", "Прокладка воздуховодов", "Установка диффузоров", "Настройка воздухораспределения", "Ремонт автоматики", "Плановое обслуживание"]
    },
    {
      name: "Потолочно-напольные кондиционеры",
      description: "Ремонт и обслуживание потолочно-напольных кондиционеров. Работаем с оборудованием всех производителей: Mitsubishi Electric, Daikin, Toshiba.",
      details: ["Потолочные кондиционеры", "Напольные модели", "Замена компрессоров", "Ремонт плат управления", "Дозаправка фреоном", "Чистка фильтров"]
    },
    {
      name: "Системы подготовки воздуха",
      description: "Монтаж и обслуживание систем подготовки и подачи очищенного, осушенного и обеззараженного воздуха для коммерческих объектов.",
      details: ["Системы очистки воздуха", "Осушители воздуха", "Увлажнители", "Системы обеззараживания", "Рекуператоры тепла", "Комплексные решения"]
    }
  ];

  const advantages = [
    "Работа с оборудованием всех производителей",
    "Сертифицированные специалисты",
    "Использование оригинальных запчастей",
    "Гарантия до 12 месяцев",
    "Бесплатная консультация"
  ];

  return (
    <>
      <Section>
        <div className="max-w-4xl mx-auto text-center mb-12">
          <SectionHeader title="Климатическое оборудование" subtitle="Установка и ремонт" centered titleColor="text-white" />
          <p className="text-slate-400 text-lg">
            Профессиональная установка, ремонт и обслуживание систем кондиционирования и вентиляции.
            Создаём комфортный микроклимат в офисах, магазинах, ресторанах и жилых помещениях.
          </p>
        </div>
      </Section>

      <Section background="light">
        <SectionHeader title="О климатических системах" subtitle="Комфорт в любое время" centered />
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Значение качественного климата</h3>
              <p className="text-gray-600 mb-4">
                Правильно спроектированная и обслуживаемая климатическая система обеспечивает:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Оптимальную температуру и влажность воздуха</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Эффективную очистку от пыли и аллергенов</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Экономию электроэнергии до 40%</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Улучшение производительности сотрудников</span>
                </li>
              </ul>
            </div>
            <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
              <Thermometer className="w-24 h-24 text-blue-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card hover className="text-center p-6">
              <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h4 className="font-bold text-gray-800 mb-2">Быстрый монтаж</h4>
              <p className="text-gray-600 text-sm">Установка систем за 1-3 дня</p>
            </Card>
            <Card hover className="text-center p-6">
              <Award className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h4 className="font-bold text-gray-800 mb-2">Гарантия до 1 года</h4>
              <p className="text-gray-600 text-sm">На монтаж и запчасти</p>
            </Card>
            <Card hover className="text-center p-6">
              <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h4 className="font-bold text-gray-800 mb-2">Сертификация</h4>
              <p className="text-gray-600 text-sm">Работа с ведущими брендами</p>
            </Card>
          </div>
        </div>
      </Section>

      <Section background="light">
        <SectionHeader title="Виды услуг" subtitle="Что мы ремонтируем" centered />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card hover className="h-full bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
                <div className="flex items-start gap-5 p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                    <Wind className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.name}</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section background="dark">
        <SectionHeader title="Почему выбирают нас" subtitle="Наши преимущества" centered />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {advantages.map((adv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 bg-slate-800/50 rounded-xl"
            >
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <p className="text-white">{adv}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section background="light">
        <SectionHeader title="Прайс-лист" subtitle="Стоимость услуг" centered />
        <div className="max-w-4xl mx-auto">
          <Card>
            <div className="space-y-3">
              {climatePrices.map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <span className="font-bold text-blue-600">{item.price}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-6 italic">
              * Окончательная стоимость ремонта может быть сформирована только после диагностики, выявления неисправности и с учёта цены на запасные части. Все цены указаны без учёта стоимости деталей.
            </p>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Нужен ремонт климатического оборудования?</h3>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            Вызовите специалиста — проведём диагностику и выполним ремонт с гарантией результата.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+74951234567">
              <Button>
                <Phone className="w-4 h-4 mr-2" /> Позвонить сейчас
              </Button>
            </a>
            <Link href="/contacts">
              <Button variant="outline">Оставить заявку</Button>
            </Link>
          </div>
        </div>
      </Section>

      <Section background="light">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Другие виды оборудования</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/services/trade">
              <Card hover className="flex items-center gap-4 p-6">
                <Wind className="w-8 h-8 text-blue-400" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">Торговое оборудование</h4>
                  <p className="text-sm text-gray-600">Витрины, камеры, шкафы</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </Card>
            </Link>
            <Link href="/services/industrial">
              <Card hover className="flex items-center gap-4 p-6">
                <Wind className="w-8 h-8 text-blue-400" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">Промышленное оборудование</h4>
                  <p className="text-sm text-gray-600">Чиллеры, камеры</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </Card>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
