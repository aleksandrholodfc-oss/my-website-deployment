'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Send, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  const [form, setForm] = useState({ name: '', phone: '' });
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetch('/api/csrf')
        .then((res) => res.json())
        .then((data) => {
          setCsrfToken(data.token);
        })
        .catch((err) => {
          console.error('Failed to fetch CSRF token:', err);
        });
    }
  }, [isOpen]);

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
    if (!consent) e.consent = 'Необходимо согласие';
    setError(Object.keys(e).length > 0 ? 'Пожалуйста, заполните все поля корректно' : '');
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          type: 'callback',
          csrfToken,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setForm({ name: '', phone: '' });
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 3000);
      } else {
        setError('Ошибка отправки. Пожалуйста, позвоните нам.');
      }
    } catch (error) {
      console.error('Error submitting callback:', error);
      setError('Ошибка отправки. Пожалуйста, позвоните нам.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-8 border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Заявка отправлена!</h3>
                <p className="text-slate-400">Мастер перезвонит вам в течение 15 минут.</p>
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Заказать звонок</h3>
                  <p className="text-slate-400">Оставьте номер и мы перезвоним вам</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Иван Иванов"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: formatPhoneNumber(e.target.value) })
                      }
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>

                  <div>
                    <label className="flex items-start gap-3 text-xs text-slate-400 leading-relaxed">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-slate-600 text-blue-600 focus:ring-blue-500"
                      />
                      <span>
                        Я ознакомлен с{' '}
                        <Link
                          href="/privacy"
                          className="text-blue-400 hover:text-blue-300 underline"
                        >
                          Политикой конфиденциальности
                        </Link>{' '}
                        и{' '}
                        <Link href="/terms" className="text-blue-400 hover:text-blue-300 underline">
                          Пользовательским соглашением
                        </Link>
                        , даю согласие на обработку персональных данных
                      </span>
                    </label>
                  </div>

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      'Отправка...'
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Заказать звонок
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
