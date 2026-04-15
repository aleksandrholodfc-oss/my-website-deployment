'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function ContactsPage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [csrfToken, setCsrfToken] = useState('');

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

    // Fetch CSRF token
    fetch('/api/csrf')
      .then(res => res.json())
      .then(data => {
        setCsrfToken(data.token);
      })
      .catch(err => {
        console.error('Failed to fetch CSRF token:', err);
      });
  }, []);

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length === 0) return '';
    
    if (phoneNumber.length <= 1) {
      return `+${phoneNumber}`;
    }
    if (phoneNumber.length <= 4) {
      return `+${phoneNumber.slice(0, 1)} (${phoneNumber.slice(1)}`;
    }
    if (phoneNumber.length <= 7) {
      return `+${phoneNumber.slice(0, 1)} (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4)}`;
    }
    if (phoneNumber.length <= 10) {
      return `+${phoneNumber.slice(0, 1)} (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7)}`;
    }
    return `+${phoneNumber.slice(0, 1)} (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 10)}`;
  };

  const validate = () => {
    const e: { [key: string]: string } = {};
    if (!form.name.trim()) e.name = 'Введите имя';
    if (!/^[\d\+\s\-\(\)]{10,}$/.test(form.phone)) e.phone = 'Некорректный телефон';
    if (form.message.length < 10) e.message = 'Опишите задачу подробнее';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form, csrfToken }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setForm({ name: '', phone: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('Ошибка отправки. Пожалуйста, позвоните нам.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Ошибка отправки. Пожалуйста, позвоните нам.');
    }
  };

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

  const contacts = [
    { icon: <Phone className="w-5 h-5" />, label: 'Телефон', value: content.contacts.phone, href: `tel:${content.contacts.phone}` },
    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: content.contacts.email, href: `mailto:${content.contacts.email}` },
    { icon: <MapPin className="w-5 h-5" />, label: 'Адрес', value: content.contacts.address, href: '#' },
    { icon: <Clock className="w-5 h-5" />, label: 'Режим работы', value: content.contacts.hours, href: '#' },
  ];

  return (
    <>
      <Section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: 'Контакты', href: '/contacts' }]} />
        </div>
        <SectionHeader title="Контакты" subtitle="Свяжитесь с нами" centered titleColor="text-white" />
        <p className="text-slate-400 text-lg max-w-3xl mx-auto text-center leading-relaxed">Оставьте заявку или позвоните — мы ответим в течение 15 минут.</p>
      </Section>
      <Section background="light">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card className="p-8 bg-white border border-gray-200 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Оставить заявку</h3>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center"><CheckCircle className="w-8 h-8 text-green-500" /></div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Заявка отправлена!</h4>
                <p className="text-gray-600">Мастер перезвонит вам в ближайшее время.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ваше имя *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`w-full px-4 py-3 bg-white border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`} placeholder="Иван Иванов" />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Телефон *</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: formatPhoneNumber(e.target.value) })} className={`w-full px-4 py-3 bg-white border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`} placeholder="+7 (___) ___-__-__" />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Описание задачи</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className={`w-full px-4 py-3 bg-white border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all`} placeholder="Опишите проблему с оборудованием..." />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                <Button type="submit" className="w-full"><Send className="w-4 h-4 mr-2" /> Отправить заявку</Button>
                <p className="text-xs text-gray-500 text-center leading-relaxed">Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных</p>
              </form>
            )}
          </Card>
          <div className="space-y-6">
            {contacts.map((c, i) => (
              <motion.a key={i} href={c.href} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 transition-all group">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-200 transition-colors">{c.icon}</div>
                <div><div className="text-sm text-gray-600 mb-1">{c.label}</div><div className="text-gray-900 font-medium">{c.value}</div></div>
              </motion.a>
            ))}
            <div className="aspect-video bg-gray-100 border border-gray-200 rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={content.contacts.mapUrl || 'https://yandex.ru/map-widget/v1/?um=constructor%3A1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7&source=constructor'}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="w-full h-full"
                title="Карта"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
