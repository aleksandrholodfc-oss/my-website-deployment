'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Snowflake, CheckCircle, Phone, ArrowRight, Wrench, Award, Clock, Shield, Factory, DollarSign } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Link from 'next/link';

export default function IndustrialEquipmentPage() {
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

  // Industrial-specific prices extracted from comprehensive price list
  const industrialPrices = [
    { name: "Выезд мастера + диагностика", price: "0 руб. (при ремонте)" },
    { name: "Срочный выезд (в ночное время)", price: "1000 руб." },
    { name: "Замена мотор-компрессора свыше 1200 Вт", price: "5000 руб. + запчасть" },
    { name: "Замена электронного блока управления", price: "1500 руб." },
    { name: "Замена ТРВ", price: "2000 руб." },
    { name: "Замена вентилятора конденсатора", price: "1500 руб." },
    { name: "Заправка фреоном 2-3 кг", price: "2000 руб." },
    { name: "Заправка фреоном свыше 3 кг", price: "от 2500 руб." },
    { name: "Замена трубопровода", price: "от 1500 руб." },
    { name: "Замена испарителя", price: "от 2000 руб." },
    { name: "Замена конденсатора", price: "от 2000 руб." },
    { name: "Промывка системы фреоном", price: "от 2000 руб." },
    { name: "Сборка электрощита", price: "от 2000 руб." },
    { name: "Ремонт электросхемы (3 группа сложности)", price: "2000 руб." },
    { name: "Опрессовка системы азотом", price: "от 1500 руб." },
    { name: "Комплексная диагностика", price: "от 2000 руб." },
  ];
  const services = [
    {
      name: "Чиллеры",
      description: "Ремонт и обслуживание чиллерных установок любой мощности. Диагностика, замена компрессоров, ремонт теплообменников, настройка систем управления.",
      details: ["Чиллеры водяного охлаждения", "Чиллеры воздушного охлаждения", "Замена компрессоров", "Ремонт теплообменников", "Настройка автоматики", "Плановое обслуживание"]
    },
    {
      name: "Скороморозильные аппараты",
      description: "Ремонт спиральных и туннельных скороморозильных аппаратов для шоковой заморозки. Работаем с оборудованием всех производителей.",
      details: ["Спиральные аппараты", "Туннельные аппараты", "Ремонт конвейеров", "Замена испарителей", "Настройка температуры", "Ремонт систем управления"]
    },
    {
      name: "Камеры охлаждения и заморозки",
      description: "Полный сервис холодильных камер: от установки до капитального ремонта. Работаем с камерами любого объёма и назначения.",
      details: ["Среднетемпературные камеры", "Низкотемпературные камеры", "Камеры быстрой заморозки", "Замена панелей", "Ремонт дверей", "Замена компрессоров"]
    },
    {
      name: "Сборка рефрижераторных контейнеров",
      description: "ОБСЛУЖИВАНИЕ, РЕМОНТ И СБОРКА промышленных рефрижераторных контейнеров стандартных габаритов: 20 футов, 40 футов и 10 футов. Возможна комплектация оборудованием для глубокой и шоковой заморозки при температурах от -25 до -55 С.",
      details: ["Универсальный режим (+10..-18 С)", "Среднетемпературное хранение (+10..-10 С)", "Низкотемпературное хранение (0..-18 С)", "Глубокая заморозка (0..-28 С)", "Шоковая заморозка (-25..-55 С)", "Поршневые и винтовые компрессоры"]
    },
    {
      name: "Переоборудование на выносной холод",
      description: "Установка компрессорно-конденсаторного агрегата с подключением одной или нескольких единиц оборудования. Оптимальное решение для магазинов с 3-4 единицами техники.",
      details: ["Компрессорно-конденсаторный агрегат", "Подключение холодильных камер", "Подключение витрин и шкафов", "Снижение шума в торговом зале", "Экономия электроэнергии"]
    },
    {
      name: "Монтаж холодильных камер",
      description: "Монтаж холодильных и морозильных камер, складов для хранения продуктов питания. Монтируем камеры любых типов, размеров, назначений.",
      details: ["Холодильные камеры", "Морозильные камеры", "Камеры для хранения продуктов", "Любые типы и размеры", "Быстро и качественно", "Долгая бесперебойная работа"]
    },
    {
      name: "Сборка холодильных агрегатов и централей",
      description: "Изготовление под заказ холодильных агрегатов и централей на базе поршневых и винтовых компрессоров Bitzer и спиральных компрессоров Copeland.",
      details: ["Поршневые компрессоры Bitzer", "Винтовые компрессоры Bitzer", "Спиральные компрессоры Copeland", "Магазины и супермаркеты", "Холодильные камеры и склады", "Пищевая и фармацевтическая промышленность"]
    },
    {
      name: "Проектирование и сборка щитов управления",
      description: "Проектирование и изготовление электрических щитов управления холодильными камерами и агрегатами с защитными функциями. Сборка и ремонт электрощитов.",
      details: ["Защита от низкого давления всасывания", "Защита от повышенного давления конденсации", "Управление системой смазки", "Предотвращение перегрева обмоток", "Защита от ассиметрии фаз и обрыва фазы", "Ремонт автоматики и замена контакторов"]
    },
    {
      name: "Агрегаты и центральные станции",
      description: "Ремонт и обслуживание холодильных агрегатов и центральных холодоснабжающих станций. Работаем с системами любой сложности.",
      details: ["Холодильные агрегаты", "Центральные станции", "Многокомпрессорные системы", "Ремонт насосных станций", "Настройка каскадов", "Модернизация оборудования"]
    }
  ];

  const advantages = [
    "Работа с оборудованием любой мощности",
    "Соблюдение всех норм и стандартов",
    "Использование оригинальных запчастей",
    "Гарантия до 24 месяцев",
    "Срочный выезд на объект"
  ];

  return (
    <>
      <Section>
        <div className="max-w-4xl mx-auto text-center mb-12">
          <SectionHeader title="Промышленное холодильное оборудование" subtitle="Сложный ремонт" centered titleColor="text-white" />
          <p className="text-slate-400 text-lg">
            Профессиональный ремонт и обслуживание промышленных систем охлаждения и холодильных установок на предприятиях.
            Работаем с оборудованием любой мощности: от небольших чиллеров до крупных центральных холодоснабжающих станций.
          </p>
        </div>
      </Section>

      <Section background="light">
        <SectionHeader title="О промышленном оборудовании" subtitle="Комплексные решения" centered />
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Особенности промышленных систем</h3>
              <p className="text-gray-600 mb-4">
                Промышленное холодильное оборудование требует специализированного подхода. Наши специалисты имеют опыт работы с:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Системами мощностью от 10 кВт до нескольких МВт</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Каскадными и многокомпрессорными установками</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Сложной автоматикой и системами управления</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Специфическими хладагентами (R404A, R507, CO2)</span>
                </li>
              </ul>
            </div>
            <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
              <Factory className="w-24 h-24 text-blue-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card hover className="text-center p-6">
              <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h4 className="font-bold text-gray-800 mb-2">Срочный выезд</h4>
              <p className="text-gray-600 text-sm">Приоритетный выезд на производственные объекты</p>
            </Card>
            <Card hover className="text-center p-6">
              <Award className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h4 className="font-bold text-gray-800 mb-2">Гарантия до 1 года</h4>
              <p className="text-gray-600 text-sm">Расширенная гарантия на промышленное оборудование</p>
            </Card>
            <Card hover className="text-center p-6">
              <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h4 className="font-bold text-gray-800 mb-2">Соблюдение норм</h4>
              <p className="text-gray-600 text-sm">Работаем в соответствии с ГОСТ и СНиП</p>
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
                    <Wrench className="w-8 h-8 text-white" />
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
              {industrialPrices.map((item: any, i: number) => (
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
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Нужен ремонт промышленного оборудования?</h3>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            Вызовите специалиста — проведём полную диагностику и выполним ремонт с гарантией результата.
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
                <Snowflake className="w-8 h-8 text-blue-400" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">Торговое оборудование</h4>
                  <p className="text-sm text-gray-600">Витрины, камеры, шкафы</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </Card>
            </Link>
            <Link href="/services/refrigerator">
              <Card hover className="flex items-center gap-4 p-6">
                <Snowflake className="w-8 h-8 text-blue-400" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">Рефрижераторы</h4>
                  <p className="text-sm text-gray-600">Грузовой транспорт</p>
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
