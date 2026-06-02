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
    if (!/^[0-9+ \-()]{10,}$/.test(form.phone)) e.phone = 'Некорректный телефон';
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
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
          </div>
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
            Заявка отправлена!
          </h4>
          <p className="text-gray-600 text-sm sm:text-base">
            Мастер перезвонит вам в ближайшее время.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ваше имя *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base`}
              placeholder="Иван Иванов"
            />
            {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Телефон *</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: formatPhoneNumber(e.target.value) })}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base`}
              placeholder="+7 (___) ___-__-__"
            />
            {errors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Описание задачи</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all text-sm sm:text-base`}
              placeholder="Опишите проблему с оборудованием..."
            />
            {errors.message && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full text-sm sm:text-base">
            <Send className="w-4 h-4 mr-2" /> Отправить заявку
          </Button>
          <div>
            <label className="flex items-start gap-3 text-xs text-gray-500 leading-relaxed">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>
                Я ознакомлен с{' '}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                  Политикой конфиденциальности
                </Link>{' '}
                и{' '}
                <Link href="/terms" className="text-blue-600 hover:text-blue-700 underline">
                  Пользовательским соглашением
                </Link>
                , даю согласие на обработку персональных данных
              </span>
            </label>
            {errors.consent && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.consent}</p>
            )}
          </div>
        </form>
      )}
    </>
  );
}
