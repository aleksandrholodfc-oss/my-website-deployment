'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { LOGO_SRC } from '@/lib/images';

export default function Footer() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error('Failed to load content:', err));
  }, []);

  const quickLinks = [
    { href: '/', label: 'Главная' },
    { href: '/services', label: 'Услуги' },
    { href: '/about', label: 'О компании' },
    { href: '/gallery', label: 'Галерея' },
    { href: '/contacts', label: 'Контакты' },
  ];

  const legalLinks = [
    { href: '/privacy', label: 'Политика конфиденциальности' },
    { href: '/terms', label: 'Пользовательское соглашение' },
  ];

  const phone = content?.contacts?.phone || '+7 (914) 8866774';
  const phoneCity = content?.contacts?.phoneCity || '';
  const email = content?.contacts?.email || 'info@федерация-холода.рф';
  const address = 'Иркутск';
  const companyName = content?.company?.name || 'Федерация Холода';
  const companyDescription = content?.company?.description || 'Профессиональный ремонт и обслуживание холодильного оборудования';
  const logo = content?.company?.logo || LOGO_SRC;
  const inn = content?.contacts?.inn || '';
  const ogrn = content?.contacts?.ogrn || '';

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src={logo} alt={companyName} width={96} height={96} className="object-contain w-24 h-24" sizes="96px" />
              <h3 className="text-xl font-bold">{companyName}</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">{companyDescription}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Юридическая информация</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-primary-400 flex-shrink-0 mt-0.5" />
                <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="text-gray-400 hover:text-white transition-colors text-sm">
                  {phone}
                </a>
              </li>
              {phoneCity && (
                <li className="flex items-start gap-3">
                  <Phone size={20} className="text-primary-400 flex-shrink-0 mt-0.5" />
                  <a href={`tel:+7${phoneCity.replace(/[^+\d]/g, '')}`} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {phoneCity}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-primary-400 flex-shrink-0 mt-0.5" />
                <a href={`mailto:${email}`} className="text-gray-400 hover:text-white transition-colors text-sm">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">{address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-xs text-gray-500">
              <p className="font-semibold text-gray-400 mb-2">Юридическая информация:</p>
              <p>ИНН: {inn}</p>
              <p>ОГРН: {ogrn}</p>
            </div>
            <div className="text-xs text-gray-500 text-right">
              <p>Все права защищены © {new Date().getFullYear()} {companyName}</p>
              <p>Сайт разработан в соответствии с законодательством РФ</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
