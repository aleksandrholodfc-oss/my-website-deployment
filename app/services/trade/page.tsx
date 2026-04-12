'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Snowflake, CheckCircle, Phone, ArrowRight, Award, Clock, Shield, DollarSign } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Link from 'next/link';

export default function TradeEquipmentPage() {
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

  // Trade-specific prices extracted from comprehensive price list
  const tradePrices = [
    { name: "Выезд мастера + диагностика", price: "0 руб. (при ремонте)" },
    { name: "Замена мотор-компрессора до 500 Вт", price: "2000 руб. + запчасть" },
    { name: "Замена мотор-компрессора 500-800 Вт", price: "3000 руб. + запчасть" },
    { name: "Замена мотор-компрессора 800-1200 Вт", price: "4000 руб. + запчасть" },
    { name: "Замена электронного блока управления", price: "1500 руб." },
    { name: "Замена термостата", price: "1000 руб." },
    { name: "Замена терморегулирующего вентиля (ТРВ)", price: "2000 руб." },
    { name: "Замена вентилятора конденсатора", price: "1500 руб." },
    { name: "Заправка фреоном до 1 кг", price: "1000 руб." },
    { name: "Заправка фреоном 1-2 кг", price: "1500 руб." },
    { name: "Замена испарителя", price: "от 2000 руб." },
    { name: "Замена конденсатора", price: "от 2000 руб." },
    { name: "Чистка конденсатора", price: "500 руб." },
    { name: "Ремонт электросхемы (1-2 группа сложности)", price: "500-1000 руб." },
    { name: "Поиск утечки фреона", price: "от 1000 руб." },
  ];

  const services = [
    {
      name: "Холодильные витрины",
      description: "Ремонт и обслуживание холодильных витрин всех типов: напольные, настенные, островные, с функцией шоковой заморозки. Замена компрессоров, испарителей, термостатов.",
      details: ["Напольные и настенные витрины", "Островные витрины", "Витрины с шоковой заморозкой", "Замена компрессоров", "Ремонт испарителей", "Настройка термостатов"]
    },
    {
      name: "Морозильные бонеты и лари",
      description: "Диагностика и ремонт морозильных бонетов и ларей различной вместимости. Устранение утечек фреона, замена компрессоров, ремонт дверных уплотнителей.",
      details: ["Морозильные бонеты", "Морозильные лари", "Устранение утечек фреона", "Замена компрессоров", "Ремонт дверных уплотнителей", "Настройка температуры"]
    },
    {
      name: "Холодильные камеры и шкафы",
      description: "Полный сервис холодильных камер и шкафов: от планового обслуживания до капитального ремонта. Работаем с камерами любого объёма.",
      details: ["Холодильные шкафы", "Среднетемпературные камеры", "Низкотемпературные камеры", "Капитальный ремонт", "Плановое обслуживание", "Замена дверей"]
    },
    {
      name: "Льдогенераторы",
      description: "Ремонт льдогенераторов всех типов: грануляторные, пластинчатые, кубиковые. Замена испарителей, ремонт систем подачи воды.",
      details: ["Грануляторные льдогенераторы", "Пластинчатые льдогенераторы", "Кубиковые льдогенераторы", "Замена испарителей", "Ремонт подачи воды", "Чистка и дезинфекция"]
    },
    {
      name: "Холодильные столы",
      description: "Ремонт холодильных столов для профессиональных кухонь. Замена компрессоров, ремонт терморегуляторов, устранение утечек.",
      details: ["Холодильные столы с нейтральным модулем", "Столы с морозильным модулем", "Замена компрессоров", "Ремонт терморегуляторов", "Устранение утечек"]
    },
    {
      name: "Холодильные горки",
      description: "Обслуживание и ремонт холодильных горок для магазинов. Замена компрессоров, ремонт дверей, настройка температуры.",
      details: ["Холодильные горки для бутиков", "Горки для супермаркетов", "Замена компрессоров", "Ремонт дверных механизмов", "Настройка температуры"]
    },
    {
      name: "Холодильные камеры для цветов",
      description: "Специализированный ремонт холодильных камер для хранения цветов. Поддержание оптимальной влажности и температуры.",
      details: ["Камеры для срезанных цветов", "Поддержание влажности", "Настройка температуры", "Ремонт систем вентиляции", "Замена компрессоров"]
    },
    {
      name: "Пивоохладители",
      description: "Ремонт пивоохладителей для ресторанов и баров. Замена компрессоров, ремонт систем подачи пива, настройка температуры.",
      details: ["Пивоохладители для баров", "Системы для ресторанов", "Замена компрессоров", "Ремонт подачи пива", "Настройка температуры"]
    }
  ];

  const advantages = [
    "Выезд мастера в течение 2-4 часов",
    "Работа без остановки продаж",
    "Использование оригинальных запчастей",
    "Гарантия до 12 месяцев",
    "Скидка 5% при заявке через сайт"
  ];

  return (
    <>
      <Section>
        <div className="max-w-4xl mx-auto text-center mb-12">
          <SectionHeader title="Торговое холодильное оборудование" subtitle="Полный спектр услуг" centered />
          <p className="text-slate-400 text-lg">
            Профессиональный ремонт и обслуживание торгового холодильного оборудования для магазинов, супермаркетов, ресторанов и кафе.
            Работаем с оборудованием всех ведущих производителей: Liebherr, Foster, Gram, Irinox, Polair и других.
          </p>
        </div>
      </Section>

      <Section background="light">
        <SectionHeader title="О нашей работе" subtitle="Профессиональный подход" centered />
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Почему важно своевременное обслуживание</h3>
              <p className="text-gray-600 mb-4">
                Торговое холодильное оборудование работает 24/7 и подвергается высоким нагрузкам. Регулярное обслуживание и своевременный ремонт помогают:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Предотвратить потерю продукции из-за поломки</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Снизить энергопотребление до 30%</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Продлить срок службы оборудования</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Соблюдать санитарные нормы и требования</span>
                </li>
              </ul>
            </div>
            <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
              <Snowflake className="w-24 h-24 text-blue-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card hover className="text-center p-6">
              <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h4 className="font-bold text-gray-800 mb-2">Выезд за 2-4 часа</h4>
              <p className="text-gray-600 text-sm">Оперативный выезд мастера в любое время</p>
            </Card>
            <Card hover className="text-center p-6">
              <Award className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h4 className="font-bold text-gray-800 mb-2">Гарантия до 1 года</h4>
              <p className="text-gray-600 text-sm">На все виды выполненных работ</p>
            </Card>
            <Card hover className="text-center p-6">
              <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h4 className="font-bold text-gray-800 mb-2">Оригинальные запчасти</h4>
              <p className="text-gray-600 text-sm">Только сертифицированные детали</p>
            </Card>
          </div>
        </div>
      </Section>

      <Section background="light">
        <SectionHeader title="Виды услуг" subtitle="Что мы ремонтируем" centered />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card hover className="h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Snowflake className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      {detail}
                    </li>
                  ))}
                </ul>
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
              {tradePrices.map((item: any, i: number) => (
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
              * Окончательная стоимость ремонта может быть сформирована только после диагностики, выявления неисправности и с учётом цены на запасные части. Все цены указаны без учёта стоимости деталей.
            </p>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Нужен ремонт торгового оборудования?</h3>
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
            <Link href="/services/industrial">
              <Card hover className="flex items-center gap-4 p-6">
                <Snowflake className="w-8 h-8 text-blue-400" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">Промышленное оборудование</h4>
                  <p className="text-sm text-gray-600">Чиллеры, камеры, рефрижераторы</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </Card>
            </Link>
            <Link href="/services/climate">
              <Card hover className="flex items-center gap-4 p-6">
                <Snowflake className="w-8 h-8 text-blue-400" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">Климатическое оборудование</h4>
                  <p className="text-sm text-gray-600">Кондиционеры, вентиляция</p>
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
