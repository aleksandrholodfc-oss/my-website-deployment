'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Truck, CheckCircle, Phone, ArrowRight, Wrench, Award, Clock, Shield, Package, DollarSign } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Link from 'next/link';

export default function RefrigeratorPage() {
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

  // Refrigerator-specific prices extracted from comprehensive price list
  const refrigeratorPrices = [
    { name: "Выезд мастера + диагностика", price: "0 руб. (при ремонте)" },
    { name: "Срочный выезд (в ночное время)", price: "1000 руб." },
    { name: "Замена компрессора в рефрижераторе", price: "6000 руб. + запчасть" },
    { name: "Замена электронного блока управления", price: "1500 руб." },
    { name: "Изготовление блока управления рефрижератора", price: "от 3000 руб." },
    { name: "Замена ТРВ", price: "2000 руб." },
    { name: "Замена вентилятора конденсатора", price: "1500 руб." },
    { name: "Заправка фреоном 2-3 кг", price: "2000 руб." },
    { name: "Заправка фреоном свыше 3 кг", price: "от 2500 руб." },
    { name: "Заправка рефрижератора", price: "от 2000 руб." },
    { name: "Ремонт трубопровода", price: "от 1000 руб." },
    { name: "Пайка трубопровода", price: "от 1000 руб." },
    { name: "Изготовление шланга высокого давления", price: "от 800 руб." },
    { name: "Переобжим шланга", price: "500 руб." },
    { name: "Промывка системы рефрижератора", price: "от 3000 руб." },
    { name: "Ремонт электросхемы (3 группа сложности)", price: "2000 руб." },
    { name: "Поиск утечки фреона", price: "от 1000 руб." },
    { name: "Комплексная диагностика", price: "от 2000 руб." },
  ];
  const services = [
    {
      name: "Ремонт и пайка трубопроводов",
      description: "Профессиональная пайка медных и алюминиевых трубопроводов рефрижераторных установок. Устранение микротрещин и разгерметизации.",
      details: ["Пайка медных труб", "Пайка алюминиевых труб", "Устранение микротрещин", "Восстановление герметичности", "Замена участков трубопровода", "Контроль качества"]
    },
    {
      name: "Изготовление и переобжим шлангов",
      description: "Изготовление новых шлангов высокого давления и переобжим существующих для рефрижераторных систем грузового транспорта.",
      details: ["Изготовление шлангов", "Переобжим фитингов", "Замена шлангов", "Испытание под давлением", "Использование качественных материалов", "Гарантия на шланги"]
    },
    {
      name: "Поиск и устранение утечек хладагента",
      description: "Комплексный поиск утечек хладагента с использованием электронных детекторов и ультрафиолетовых красителей.",
      details: ["Электронная диагностика", "УФ-диагностика с красителем", "Опрессовка системы", "Устранение утечек", "Контроль герметичности", "Документация работ"]
    },
    {
      name: "Замена и ремонт радиаторов",
      description: "Ремонт и замена радиаторов конденсатора и испарителя рефрижераторных установок. Промывка, пайка, полная замена.",
      details: ["Ремонт конденсатора", "Ремонт испарителя", "Промывка радиаторов", "Пайка алюминиевых радиаторов", "Полная замена", "Чистка от загрязнений"]
    },
    {
      name: "Ремонт электрической части",
      description: "Ремонт электрической части любой сложности: от замены предохранителей до перепрошивки блоков управления.",
      details: ["Ремонт электросхем", "Замена предохранителей", "Ремонт реле", "Перепрошивка блоков управления", "Диагностика проводки", "Замена датчиков"]
    },
    {
      name: "Изготовление блоков управления",
      description: "Изготовление новых блоков управления рефрижераторными установками при невозможности ремонта оригинальных.",
      details: ["Разработка схем", "Сборка блоков управления", "Программирование", "Тестирование", "Установка на оборудование", "Обучение персонала"]
    },
    {
      name: "Промывка системы",
      description: "Промывка системы рефрижератора специальным промывочным фреоном для удаления загрязнений и масляных отложений.",
      details: ["Промывка фреоном", "Удаление загрязнений", "Удаление масляных отложений", "Замена фильтра-осушителя", "Вакуумирование", "Заправка хладагентом"]
    },
    {
      name: "Заправка фреоном",
      description: "Заправка рефрижераторных установок фреоном всех видов: R134a, R404A, R410A и других. Контроль давления и эффективности.",
      details: ["Заправка R134a", "Заправка R404A", "Заправка R410A", "Контроль давления", "Проверка эффективности", "Документация"]
    },
    {
      name: "Замена ТРВ",
      description: "Замена и настройка терморегулирующих вентилей (ТРВ) для оптимальной работы системы охлаждения.",
      details: ["Диагностика ТРВ", "Замена ТРВ", "Настройка перегрева", "Проверка производительности", "Калибровка", "Контроль работы"]
    },
    {
      name: "Замена компрессора",
      description: "Замена компрессоров рефрижераторных установок любого типа и производителя. Подбор аналогов и оригинальных запчастей.",
      details: ["Подбор компрессора", "Замена компрессора", "Замена масла", "Настройка системы", "Проверка работы", "Гарантия на замену"]
    }
  ];

  const advantages = [
    "Работа с рефрижераторами всех марок",
    "Собственный склад запчастей",
    "Гарантия до 12 месяцев",
    "Срочный ремонт за 24 часа",
    "Работа на выезде по всей России"
  ];

  return (
    <>
      <Section>
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12 px-2">
          <SectionHeader title="Рефрижераторы" subtitle="Полный цикл ремонта" centered titleColor="text-white" />
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg">
            Полный цикл ремонта рефрижераторных установок и холодильных систем грузового транспорта.
            Работаем с рефрижераторами всех марок: Thermo King, Carrier, Daikin, Liebherr и других.
          </p>
        </div>
      </Section>

      <Section background="light">
        <SectionHeader title="О рефрижераторных установках" subtitle="Надёжность грузоперевозок" centered />
        <div className="max-w-4xl mx-auto px-2 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Значение исправного рефрижератора</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
                Исправная рефрижераторная установка критически важна для:
              </p>
              <ul className="space-y-2 sm:space-y-2">
                <li className="flex items-start gap-2 text-gray-600 text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Сохранения качества скоропортящихся грузов</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Соблюдения температурных режимов перевозки</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Предотвращения порчи продукции</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Своевременной доставки без простоев</span>
                </li>
              </ul>
            </div>
            <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
              <Package className="w-16 h-16 sm:w-20 sm:w-24 text-blue-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <Card hover className="text-center p-4 sm:p-6">
              <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-3 sm:mb-4" />
              <h4 className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Ремонт за 24 часа</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Срочный ремонт без длительных простоев</p>
            </Card>
            <Card hover className="text-center p-4 sm:p-6">
              <Award className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-3 sm:mb-4" />
              <h4 className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Гарантия до 1 года</h4>
              <p className="text-gray-600 text-xs sm:text-sm">На все виды ремонтных работ</p>
            </Card>
            <Card hover className="text-center p-4 sm:p-6">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-3 sm:mb-4" />
              <h4 className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Выезд на объект</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Работаем по всей России</p>
            </Card>
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
                    <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {advantages.map((adv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-4 sm:p-6 bg-slate-800/50 rounded-lg sm:rounded-xl"
            >
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mx-auto mb-2 sm:mb-3" />
              <p className="text-white text-sm sm:text-base">{adv}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section background="light">
        <SectionHeader title="Прайс-лист" subtitle="Стоимость услуг" centered />
        <div className="max-w-4xl mx-auto px-2 sm:px-0">
          <Card>
            <div className="space-y-2 sm:space-y-3">
              {refrigeratorPrices.map((item: any, i: number) => (
                <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 sm:py-3 border-b border-gray-100 last:border-0 gap-1 sm:gap-0">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">{item.name}</span>
                  </div>
                  <span className="font-bold text-blue-600 text-sm sm:text-base">{item.price}</span>
                </div>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6 italic">
              * Окончательная стоимость ремонта может быть сформирована только после диагностики, выявления неисправности и с учётом цены на запасные части. Все цены указаны без учёта стоимости деталей.
            </p>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">Нужен ремонт рефрижератора?</h3>
          <p className="text-slate-400 text-sm sm:text-base mb-4 sm:mb-6 max-w-2xl mx-auto">
            Вызовите специалиста — проведём полную диагностику и выполним ремонт с гарантией результата.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            <a href="tel:+74951234567" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto text-sm sm:text-base">
                <Phone className="w-4 h-4 mr-2" /> Позвонить сейчас
              </Button>
            </a>
            <Link href="/contacts" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto text-sm sm:text-base">Оставить заявку</Button>
            </Link>
          </div>
        </div>
      </Section>

      <Section background="light">
        <div className="max-w-4xl mx-auto px-2 sm:px-0">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Другие виды оборудования</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <Link href="/services/industrial">
              <Card hover className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6">
                <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Промышленное оборудование</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Чиллеры, камеры</p>
                </div>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              </Card>
            </Link>
            <Link href="/services/auto">
              <Card hover className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6">
                <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Автокондиционеры</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Заправка, диагностика</p>
                </div>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              </Card>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
