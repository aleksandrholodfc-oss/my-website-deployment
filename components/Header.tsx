'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import CallbackModal from '@/components/CallbackModal';
import SearchBar from '@/components/SearchBar';
import { LOGO_SRC } from '@/lib/images';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error('Failed to load content:', err));
  }, []);

  const navLinks = [
    { href: '/', label: 'Главная' },
    { href: '/services', label: 'Услуги' },
    { href: '/about', label: 'О компании' },
    { href: '/gallery', label: 'Галерея' },
    { href: '/contacts', label: 'Контакты' },
  ];

  const phone = content?.contacts?.phone || '+7 (914) 8866774';
  const companyName = content?.company?.name || 'Федерация Холода';
  const logo = content?.company?.logo || LOGO_SRC;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen ? 'bg-slate-950/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/10' : 'bg-slate-950/20 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            <Link href="/" className="flex items-center gap-2 min-w-0">
              <Image src={logo} alt={companyName} width={96} height={96} priority className="object-contain w-12 h-12 sm:w-14 sm:h-14" />
              <span className="text-white font-bold text-sm sm:text-lg hidden sm:block truncate">{companyName}</span>
            </Link>

            <nav className="hidden md:flex items-center gap-4 sm:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-gray-300 hover:text-white transition-colors font-medium text-sm sm:text-base after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-2 sm:gap-4">
              <div className="hidden lg:block">
                <SearchBar />
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-slate-800/60 border border-blue-500/30 rounded-xl text-white hover:border-blue-400/70 hover:bg-blue-500/10 hover:-translate-y-0.5 transition-all font-medium text-xs sm:text-sm shadow-lg shadow-blue-950/20">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                  <span className="hidden sm:inline">{phone}</span>
                  <span className="sm:hidden">📞</span>
                </a>
                <a href={`mailto:${content?.contacts?.email || 'info@федерация-холода.рф'}`} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-800/60 border border-blue-500/30 rounded-xl text-white hover:border-blue-400/70 hover:bg-blue-500/10 hover:-translate-y-0.5 transition-all font-medium shadow-lg shadow-blue-950/20">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span className="hidden lg:inline">Federation-cold@mail.ru</span>
                </a>
              </div>
            </div>

            <button
              className="md:hidden text-white p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="md:hidden fixed top-16 left-0 right-0 z-40 px-3"
          >
            <nav className="mx-auto max-w-md rounded-2xl border border-white/10 bg-slate-950/95 px-4 py-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-xl px-3 py-3 text-gray-300 hover:bg-white/5 hover:text-white transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 pt-4 border-t border-slate-800">
                <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-2 rounded-xl bg-blue-500/10 px-3 py-3 text-white">
                  <Phone size={20} />
                  <span className="font-semibold">{phone}</span>
                </a>
                <Link href="/contacts" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full mt-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-colors font-semibold shadow-lg shadow-blue-600/25">
                    Оставить заявку
                  </button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} />
    </>
  );
}
