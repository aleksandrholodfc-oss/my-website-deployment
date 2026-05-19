import { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';
import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Контакты Федерация Холода — телефон, адрес, схема проезда',
  description: 'Контакты Федерации Холода в Иркутске. Телефон +7 (914) 8866774, email Federation-cold@mail.ru. Выезд мастера 24/7.',
  keywords: 'контакты, телефон, адрес, Иркутск, Федерация Холода, звонок мастеру',
  alternates: {
    canonical: 'https://федерация-холода.рф/contacts',
  },
};

async function getContent() {
  const CONTENT_FILE = path.join(process.cwd(), 'data', 'content.json');
  const data = await fs.readFile(CONTENT_FILE, 'utf-8');
  return JSON.parse(data);
}

export default async function ContactsPage() {
  const content = await getContent();

  const contacts = [
    { icon: <Phone className="w-5 h-5" />, label: 'Телефон', value: content.contacts.phone, href: `tel:${content.contacts.phone}` },
    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: content.contacts.email, href: `mailto:${content.contacts.email}` },
    { icon: <MapPin className="w-5 h-5" />, label: 'Адрес', value: 'Иркутск', href: '#' },
    { icon: <Clock className="w-5 h-5" />, label: 'Режим работы', value: content.contacts.hours, href: '#' },
  ];

  return (
    <>
      <Section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Breadcrumbs items={[{ label: 'Контакты', href: '/contacts' }]} />
        </div>
        <SectionHeader title="Контакты" subtitle="Свяжитесь с нами" centered titleColor="text-white" />
        <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto text-center leading-relaxed px-2">Оставьте заявку или позвоните — мы ответим в течение 15 минут.</p>
      </Section>
      <Section background="light">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 max-w-6xl mx-auto">
          <Card className="p-4 sm:p-6 md:p-8 bg-white border border-gray-200 shadow-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Оставить заявку</h2>
            <ContactForm />
          </Card>
          <div className="space-y-4 sm:space-y-6">
            {contacts.map((c, i) => (
              <a key={i} href={c.href} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white border border-gray-200 rounded-lg sm:rounded-xl hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 transition-all group">
                <div className="p-2 sm:p-3 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-200 transition-colors">{c.icon}</div>
                <div><div className="text-xs sm:text-sm text-gray-600 mb-1">{c.label}</div><div className="text-sm sm:text-base text-gray-900 font-medium">{c.value}</div></div>
              </a>
            ))}
            <div className="aspect-video bg-gray-100 border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={content.contacts.mapUrl || 'https://yandex.ru/map-widget/v1/?ll=104.254286%2C52.280343&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1MzEwNTAzNxJJ0KDQvtGB0YHQuNGPLCDQmNGA0LrRg9GC0YHQuiwg0JjRgNC60YPRgtGB0LosINCY0YDQutGD0YLRgdC6IgoN2nbQQhX3yVFC&z=13'}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="w-full h-full"
                title="Карта проезда Федерация Холода в Иркутске"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
