'use client';

import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [csrfToken, setCsrfToken] = useState('');

  React.useEffect(() => {
    fetch('/api/csrf')
      .then((res) => res.json())
      .then((data) => {
        setCsrfToken(data.token);
      })
      .catch((err) => {
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
    if (!consent) e.consent = 'Необходимо согласие на обработку персональных данных';
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
        setConsent(false);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('Ошибка отправки. Пожалуйста, позвоните нам.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Ошибка отправки. Пожалуйста, позвоните нам.');
    }
  };

  return (
    <>
      {submitted ? (
        <div className="text-center py-8 sm:py-12">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
          </div>
          <h4 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2 uppercase tracking-wide">
            Заявка отправлена!
          </h4>
          <p className="text-slate-400 text-sm sm:text-base">
            Мастер перезвонит вам в ближайшее время.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
              Ваше имя *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-900/50 border ${errors.name ? 'border-red-500/50' : 'border-slate-700'} rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all text-sm sm:text-base`}
              placeholder="Иван Иванов"
            />
            {errors.name && (
              <p className="text-red-400 text-[10px] sm:text-xs mt-1 ml-1 uppercase font-bold tracking-wider">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
              Телефон *
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: formatPhoneNumber(e.target.value) })}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-900/50 border ${errors.phone ? 'border-red-500/50' : 'border-slate-700'} rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all text-sm sm:text-base`}
              placeholder="+7 (___) ___-__-__"
            />
            {errors.phone && (
              <p className="text-red-400 text-[10px] sm:text-xs mt-1 ml-1 uppercase font-bold tracking-wider">
                {errors.phone}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
              Описание задачи
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-900/50 border ${errors.message ? 'border-red-500/50' : 'border-slate-700'} rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none transition-all text-sm sm:text-base`}
              placeholder="Опишите проблему с оборудованием..."
            />
            {errors.message && (
              <p className="text-red-400 text-[10px] sm:text-xs mt-1 ml-1 uppercase font-bold tracking-wider">
                {errors.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full text-sm sm:text-base font-bold uppercase tracking-wider py-4"
          >
            <Send className="w-4 h-4 mr-2" /> Отправить заявку
          </Button>
          <div className="bg-slate-800/30 p-3 rounded-xl border border-slate-700/30">
            <label className="flex items-start gap-3 text-[10px] sm:text-xs text-slate-500 leading-relaxed cursor-pointer group">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500/50 transition-colors"
              />
              <span className="group-hover:text-slate-400 transition-colors">
                Я ознакомлен с{' '}
                <Link
                  href="/privacy"
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                >
                  Политикой конфиденциальности
                </Link>{' '}
                и{' '}
                <Link
                  href="/terms"
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                >
                  Пользовательским соглашением
                </Link>
                , даю согласие на обработку персональных данных
              </span>
            </label>
            {errors.consent && (
              <p className="text-red-400 text-[10px] uppercase font-bold tracking-wider mt-2 ml-7">
                {errors.consent}
              </p>
            )}
          </div>
        </form>
      )}
    </>
  );
}
