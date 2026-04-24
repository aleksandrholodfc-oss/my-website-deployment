'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Car, CheckCircle, Phone, ArrowRight, Wrench, Award, Clock, Shield, Gauge, DollarSign } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Link from 'next/link';

export default function AutoAirConditionerPage() {
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

  // Auto AC specific prices extracted from comprehensive price list
  const autoPrices = [
    { name: "Выезд мастера + диагностика", price: "0 руб. (при ремонте)" },
    { name: "Диагностика автокондиционера", price: "500 руб." },
    { name: "Заправка автокондиционера фреоном", price: "1500 руб." },
    { name: "Поиск утечки в автокондиционере", price: "от 1000 руб." },
    { name: "Замена компрессора в автокондиционере", price: "4000 руб. + запчасть" },
    { name: "Замена радиатора автокондиционера", price: "от 2000 руб." },
    { name: "Замена муфты компрессора", price: "1500 руб." },
    { name: "Замена подшипников муфты", price: "1000 руб." },
    { name: "Опрессовка системы азотом", price: "от 1500 руб." },
    { name: "Вакуумирование системы", price: "500 руб." },
  ];
  const services = [
    {
      name: "Диагностика и заправка фреоном",
      description: "Полная диагностика системы кондиционирования и заправка фреоном всех типов. Работаем с легковыми автомобилями, кроссоверами, джипами, спецтехникой и автобусами.",
      details: ["Легковые автомобили", "Кроссоверы и джипы", "Спецтехника", "Автобусы", "Заправка фреоном R134a", "Заправка фреоном R1234yf"]
    },
    {
      name: "Поиск утечки фреона",
      description: "Профессиональный поиск утечек с использованием опрессовки системы азотом и проверки резьбовых соединений индикатором утечек.",
      details: ["Опрессовка системы азотом", "Проверка резьбовых соединений", "Использование индикатора утечек", "Устранение обнаруженных утечек", "Вакуумирование системы", "Контроль герметичности"]
    },
    {
      name: "Ремонт компрессора",
      description: "Диагностика и ремонт автомобильных компрессоров кондиционера. Замена подшипников, клапанов, сальников или полная замена компрессора.",
      details: ["Диагностика компрессора", "Замена подшипников", "Замена клапанов", "Замена сальников", "Полная замена компрессора", "Заправка после ремонта"]
    },
    {
      name: "Ремонт радиатора конденсатора",
      description: "Ремонт и замена радиаторов конденсатора (конденсеров) автокондиционеров. Промывка, устранение течей, пайка.",
      details: ["Промывка радиатора", "Устранение течей", "Пайка алюминиевых радиаторов", "Замена конденсера", "Чистка от грязи и насекомых", "Проверка эффективности"]
    },
    {
      name: "Ремонт испарителя",
      description: "Ремонт и замена испарителей автокондиционеров. Устранение засоров, чистка, дезинфекция для устранения запахов.",
      details: ["Чистка испарителя", "Дезинфекция от запахов", "Устранение засоров", "Замена испарителя", "Проверка дренажной системы", "Обработка антибактериальным средством"]
    },
    {
      name: "Ремонт электроники",
      description: "Диагностика и ремонт электронных компонентов системы кондиционирования: реле, датчики, блоки управления.",
      details: ["Ремонт реле компрессора", "Замена датчиков", "Ремонт блоков управления", "Проверка предохранителей", "Диагностика проводки", "Настройка параметров"]
    }
  ];

  const advantages = [
    "Работа с любыми марками автомобилей",
    "Использование качественного фреона",
    "Гарантия на все виды работ",
    "Срочный ремонт за 1-2 часа",
    "Скидка 10% при комплексном обслуживании"
  ];

  return (
    <>
      <Section>
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12 px-2">
          <SectionHeader title="Автокондиционеры" subtitle="Ремонт и заправка" centered titleColor="text-white" />
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg">
            Профессиональная диагностика и ремонт автокондиционеров всех типов транспортных средств.
            Работаем с легковыми автомобилями, кроссоверами, джипами, спецтехникой и автобусами.
          </p>
        </div>
      </Section>

      <Section background="light">
        <SectionHeader title="О автокондиционерах" subtitle="Комфорт в дороге" centered />
        <div className="max-w-4xl mx-auto px-2 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Значение исправного кондиционера</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
                Работающий автокондиционер обеспечивает комфорт и безопасность:
              </p>
              <ul className="space-y-2 sm:space-y-2">
                <li className="flex items-start gap-2 text-gray-600 text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Комфортную температуру в салоне</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Удаление влаги и запотевания стёкол</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Очистку воздуха от пыли и аллергенов</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Улучшение концентрации водителя</span>
                </li>
              </ul>
            </div>
            <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
              <Gauge className="w-16 h-16 sm:w-20 sm:w-24 text-blue-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <Card hover className="text-center p-4 sm:p-6">
              <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-3 sm:mb-4" />
              <h4 className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Ремонт за 1-2 часа</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Быстрое обслуживание без ожидания</p>
            </Card>
            <Card hover className="text-center p-4 sm:p-6">
              <Award className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-3 sm:mb-4" />
              <h4 className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Гарантия до 6 месяцев</h4>
              <p className="text-gray-600 text-xs sm:text-sm">На все виды работ и запчасти</p>
            </Card>
            <Card hover className="text-center p-4 sm:p-6">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-3 sm:mb-4" />
              <h4 className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Качественный фреон</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Только сертифицированные хладагенты</p>
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
                    <Car className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
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
              {autoPrices.map((item: any, i: number) => (
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
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">Нужен ремонт автокондиционера?</h3>
          <p className="text-slate-400 text-sm sm:text-base mb-4 sm:mb-6 max-w-2xl mx-auto">
            Приезжайте к нам — проведём полную диагностику и заправку фреоном за 1-2 часа.
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
            <Link href="/services/trade">
              <Card hover className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6">
                <Car className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Торговое оборудование</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Витрины, камеры, шкафы</p>
                </div>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              </Card>
            </Link>
            <Link href="/services/climate">
              <Card hover className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6">
                <Car className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Климатическое оборудование</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Кондиционеры, вентиляция</p>
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
