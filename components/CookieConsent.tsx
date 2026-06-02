'use client';

import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950/95 shadow-2xl shadow-black/30 backdrop-blur-md">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex flex-1 gap-3 text-sm text-slate-300">
            <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
              <Cookie size={20} />
            </div>
            <div>
              <p className="mb-1 font-semibold text-white">Мы используем файлы cookie</p>
              <p className="leading-relaxed">
                Сайт использует технические и аналитические cookie для корректной работы, улучшения
                сервиса и анализа посещаемости. Продолжая пользоваться сайтом или нажимая «Принять»,
                вы соглашаетесь с условиями{' '}
                <Link
                  href="/privacy"
                  className="font-medium text-blue-300 underline-offset-4 hover:text-blue-200 hover:underline"
                >
                  Политики конфиденциальности
                </Link>{' '}
                и{' '}
                <Link
                  href="/terms"
                  className="font-medium text-blue-300 underline-offset-4 hover:text-blue-200 hover:underline"
                >
                  Пользовательского соглашения
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="flex w-full items-center gap-2 sm:w-auto sm:flex-shrink-0">
            <button
              onClick={handleDecline}
              className="flex-1 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-500 hover:bg-slate-800 hover:text-white sm:flex-none"
            >
              Отклонить
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-500 sm:flex-none"
            >
              Принять
            </button>
            <button
              onClick={handleDecline}
              className="rounded-xl p-2.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              aria-label="Закрыть уведомление о cookie"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
