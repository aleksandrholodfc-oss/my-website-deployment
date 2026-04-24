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
      description: "Полный спектр услуг по ремонту и обслуживанию холодильных витрин всех типов: напольные, настенные, островные, с функцией шоковой заморозки. Работаем с оборудованием всех производителей.",
      details: ["Напольные витрины", "Настенные витрины", "Островные витрины", "Шоковая заморозка", "Замена компрессоров", "Ремонт испарителей и конденсаторов", "Замена блока управления", "Замена кнопок", "Замена фильтра-осушителя", "Заправка фреоном", "Вакуумирование системы"]
    },
    {
      name: "Морозильные бонеты и лари",
      description: "Диагностика и ремонт морозильных бонетов и ларей различной вместимости.",
      details: ["Диагностика", "Устранение утечек фреона", "Замена компрессоров", "Ремонт испарителей и конденсаторов", "Замена блока управления", "Замена фильтра-осушителя", "Заправка фреоном", "Вакуумирование системы", "Настройка температуры"]
    },
    {
      name: "Холодильные камеры и шкафы",
      description: "Полный сервис холодильных камер и шкафов: от планового обслуживания до капитального ремонта. Работаем с камерами любого объёма.",
      details: ["Плановое обслуживание", "Капитальный ремонт", "Ремонт испарителей и конденсаторов", "Замена компрессоров", "Замена блока управления", "Замена фильтра-осушителя", "Заправка фреоном", "Вакуумирование системы"]
    },
    {
      name: "Льдогенераторы",
      description: "Ремонт льдогенераторов всех типов: грануляторные, пластинчатые, кубиковые.",
      details: ["Грануляторные льдогенераторы", "Пластинчатые льдогенераторы", "Кубиковые льдогенераторы", "Замена испарителей", "Ремонт систем подачи воды", "Замена компрессоров", "Замена блока управления", "Замена фильтра-осушителя", "Заправка фреоном", "Вакуумирование системы", "Чистка и дезинфекция"]
    },
    {
      name: "Холодильные столы",
      description: "Ремонт холодильных столов для профессиональных кухонь.",
      details: ["Замена компрессоров", "Ремонт испарителей и конденсаторов", "Замена блока управления", "Замена фильтра-осушителя", "Заправка фреоном", "Вакуумирование системы", "Устранение утечек"]
    },
    {
      name: "Холодильные горки",
      description: "Обслуживание и ремонт холодильных горок для магазинов.",
      details: ["Замена компрессоров", "Ремонт испарителей и конденсаторов", "Замена блока управления", "Замена фильтра-осушителя", "Заправка фреоном", "Вакуумирование системы", "Настройка температуры"]
    },
    {
      name: "Холодильные камеры для цветов",
      description: "Специализированный ремонт холодильных камер для хранения цветов.",
      details: ["Поддержка влажности и температуры", "Ремонт систем вентиляции", "Замена компрессоров", "Ремонт испарителей и конденсаторов", "Замена блока управления", "Заправка фреоном"]
    },
    {
      name: "Пивоохладители",
      description: "Ремонт пивоохладителей для ресторанов и баров.",
      details: ["Замена компрессоров", "Ремонт испарителей и конденсаторов", "Замена блока управления", "Замена фильтра-осушителя", "Заправка фреоном", "Вакуумирование системы", "Настройка температуры"]
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
        <div className="max-w-5xl mx-auto text-center mb-8 sm:mb-16 px-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader title="Торговое холодильное оборудование" subtitle="Полный спектр услуг" centered titleColor="text-white" />
            <p className="text-slate-400 text-sm sm:text-base lg:text-xl mb-4 sm:mb-6 leading-relaxed max-w-3xl mx-auto">
              Профессиональный ремонт и обслуживание торгового холодильного оборудования для магазинов, супермаркетов, ресторанов и кафе и др.
            </p>
          </motion.div>
        </div>
      </Section>

      <Section background="light">
        <SectionHeader title="О нашей работе" subtitle="Профессиональный подход" centered />
        <div className="max-w-6xl mx-auto px-2 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 mb-8 sm:mb-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Почему важно своевременное обслуживание</h3>
              <p className="text-gray-700 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed">
                Торговое холодильное оборудование работает 24/7 и подвергается высоким нагрузкам. Регулярное обслуживание и своевременный ремонт помогают:
              </p>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3 text-gray-700 text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base lg:text-lg">Предотвратить потерю продукции из-за поломки</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-gray-700 text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base lg:text-lg">Снизить энергопотребление до 30%</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-gray-700 text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base lg:text-lg">Продлить срок службы оборудования</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-gray-700 text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base lg:text-lg">Соблюдать санитарные нормы и требования</span>
                </li>
              </ul>
            </div>
            <div className="aspect-video bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl sm:rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl shadow-blue-500/30 border border-blue-500/40 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent"></div>
              <img src="/images/torgovoe.jpg" alt="Торговое холодильное оборудование" className="w-full h-full object-cover relative z-10 hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Card hover className="text-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20">
                <Clock className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-blue-500 mx-auto mb-3 sm:mb-4" />
                <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">Выезд за 2-4 часа</h4>
                <p className="text-gray-600 text-xs sm:text-sm">Оперативный выезд мастера в любое время</p>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Card hover className="text-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20">
                <Award className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-blue-500 mx-auto mb-3 sm:mb-4" />
                <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">Гарантия до 1 года</h4>
                <p className="text-gray-600 text-xs sm:text-sm">На все виды выполненных работ</p>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Card hover className="text-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20">
                <Shield className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-blue-500 mx-auto mb-3 sm:mb-4" />
                <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">Оригинальные запчасти</h4>
                <p className="text-gray-600 text-xs sm:text-sm">Только сертифицированные детали</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </Section>

      <Section background="light">
        <SectionHeader title="Виды услуг" subtitle="Что мы ремонтируем" centered />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card hover className="h-full bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-5 p-4 sm:p-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                    <Snowflake className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">{service.name}</h3>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">{service.description}</p>
                    <ul className="space-y-1 sm:space-y-2">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600 text-xs sm:text-sm">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0 mt-0.5" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 max-w-5xl mx-auto">
          {advantages.map((adv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-600/50 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
            >
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-white text-sm sm:text-base md:text-lg font-medium">{adv}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section background="light">
        <SectionHeader title="Прайс-лист" subtitle="Стоимость услуг" centered />
        <div className="max-w-5xl mx-auto px-2 sm:px-0">
          <Card className="bg-gradient-to-br from-white to-blue-50/20 border border-blue-100">
            <div className="space-y-3 sm:space-y-4">
              {tradePrices.map((item: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-blue-50/50 to-transparent rounded-lg sm:rounded-xl hover:from-blue-100/50 transition-colors gap-2 sm:gap-0"
                >
                  <div className="flex items-center gap-2 sm:gap-4">
                    <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-800 font-medium text-sm sm:text-base">{item.name}</span>
                  </div>
                  <span className="font-bold text-blue-600 text-sm sm:text-base md:text-lg">{item.price}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-6 sm:mt-8 italic px-4 sm:px-6">
              * Окончательная стоимость ремонта может быть сформирована только после диагностики, выявления неисправности и с учётом цены на запасные части. Все цены указаны без учёта стоимости деталей.
            </p>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 text-center shadow-2xl shadow-blue-500/30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">Нужен ремонт торгового оборудования?</h3>
            <p className="text-blue-100 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
              Вызовите специалиста — проведём диагностику и выполним ремонт с гарантией результата.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
              <a href="tel:+74951234567" className="w-full sm:w-auto">
                <Button className="bg-white text-blue-600 hover:bg-blue-50 border-0 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg w-full sm:w-auto">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> Позвонить сейчас
                </Button>
              </a>
              <Link href="/contacts" className="w-full sm:w-auto">
                <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg w-full sm:w-auto">Оставить заявку</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section background="light">
        <div className="max-w-5xl mx-auto px-2 sm:px-0">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Другие виды оборудования</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Link href="/services/industrial">
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                <Card hover className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 border border-blue-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Snowflake className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-base sm:text-lg md:text-xl mb-1">Промышленное оборудование</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Чиллеры, камеры, рефрижераторы</p>
                  </div>
                  <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />
                </Card>
              </motion.div>
            </Link>
            <Link href="/services/climate">
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                <Card hover className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 border border-blue-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Snowflake className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-base sm:text-lg md:text-xl mb-1">Климатическое оборудование</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Кондиционеры, вентиляция</p>
                  </div>
                  <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />
                </Card>
              </motion.div>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
