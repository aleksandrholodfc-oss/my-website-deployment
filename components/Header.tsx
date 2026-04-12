'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import CallbackModal from '@/components/CallbackModal';
import SearchBar from '@/components/SearchBar';

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
    { href: '/blog', label: 'Блог' },
    { href: '/contacts', label: 'Контакты' },
  ];

  const phone = content?.contacts?.phone || '+7 (914) 8866774';
  const companyName = content?.company?.name || 'Федерация Холода';
  const logo = content?.company?.logo || '/images/logo.png';

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-dark-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Image src={logo} alt={companyName} width={96} height={96} className="object-contain" />
              <span className="text-white font-bold text-lg hidden sm:block">{companyName}</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <SearchBar onSearch={(query) => console.log('Search:', query)} />
              <div className="flex items-center gap-3">
                <a href={`tel:${phone}`} className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border-2 border-blue-500/30 rounded-lg text-white hover:border-blue-500/60 hover:bg-slate-800/70 transition-all font-medium">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>{phone}</span>
                </a>
                <a href={`mailto:${content?.contacts?.email || 'info@federatsiya-holoda.ru'}`} className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border-2 border-blue-500/30 rounded-lg text-white hover:border-blue-500/60 hover:bg-slate-800/70 transition-all font-medium">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span className="hidden lg:inline">Email</span>
                </a>
              </div>
              <button onClick={() => setIsCallbackOpen(true)} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium border border-blue-500/30">
                Заказать звонок
              </button>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-16 left-0 right-0 bg-dark-900/95 backdrop-blur-md z-40"
          >
            <nav className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-300 hover:text-white transition-colors py-3 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-700">
                <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-2 text-white py-3">
                  <Phone size={20} />
                  <span className="font-semibold">{phone}</span>
                </a>
                <Link href="/contacts" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full mt-4 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
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
