#!/bin/bash
set -e

echo "🔧 Федерация Холода — Автофикс проекта"
echo "======================================="

PROJECT_DIR="${1:-.}"
cd "$PROJECT_DIR"

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info()    { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn()    { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error()   { echo -e "${RED}[ERROR]${NC} $1"; }

# 1️⃣ Исправляем next.config.ts → next.config.mjs
log_info "Шаг 1/7: Исправляем конфиг Next.js..."
if [ -f "next.config.ts" ]; then
    rm -f next.config.ts
    log_info "  ✓ Удалён next.config.ts"
fi

cat > next.config.mjs << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['placehold.co', 'via.placeholder.com', 'images.unsplash.com'],
  },
};
export default nextConfig;
EOF
log_info "  ✓ Создан next.config.mjs"

# 2️⃣ Создаём/исправляем globals.css
log_info "Шаг 2/7: Обновляем глобальные стили..."
mkdir -p app
cat > app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-bg: #0F172A;
  --color-primary: #3B82F6;
  --color-accent: #06B6D4;
}

body {
  @apply bg-slate-900 text-slate-100 antialiased;
}

html { scroll-behavior: smooth; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}
EOF
log_info "  ✓ globals.css обновлён"

# 3️⃣ Создаём Header.tsx с 'use client' на ПЕРВОЙ строке
log_info "Шаг 3/7: Исправляем Header.tsx..."
mkdir -p components
cat > components/Header.tsx << 'EOF'
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { href: '/', label: 'Главная' },
    { href: '/services', label: 'Услуги' },
    { href: '/about', label: 'О компании' },
    { href: '/contacts', label: 'Контакты' },
  ];
  return (
    <header className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">❄️</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">Федерация Холода</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                {link.label}
              </Link>
            ))}
            <a href="tel:+78005553535" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
              <Phone className="w-4 h-4" /> 8 (800) 555-35-35
            </a>
          </nav>
          <button className="md:hidden p-2 text-slate-300 hover:text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Меню" type="button">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block py-2 text-slate-300 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            ))}
            <a href="tel:+78005553535" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg font-semibold mt-4" onClick={() => setIsOpen(false)}>
              <Phone className="w-4 h-4" /> 8 (800) 555-35-35
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
EOF
log_info "  ✓ Header.tsx исправлен ('use client' на 1-й строке)"

# 4️⃣ Создаём Footer.tsx (серверный компонент)
log_info "Шаг 4/7: Создаём Footer.tsx..."
cat > components/Footer.tsx << 'EOF'
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-12 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">❄️</span>
              </div>
              <span className="font-bold text-lg">Федерация Холода</span>
            </div>
            <p className="text-slate-400 text-sm max-w-md">
              Профессиональный ремонт и обслуживание холодильного оборудования по всей России. 
              Гарантия до 3 лет, выезд в день обращения.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="tel:+78005553535" className="hover:text-white transition-colors flex items-center gap-2"><Phone className="w-4 h-4"/> 8 (800) 555-35-35</a></li>
              <li><a href="mailto:info@federation-kholoda.ru" className="hover:text-white transition-colors flex items-center gap-2"><Mail className="w-4 h-4"/> info@federation-kholoda.ru</a></li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5"/> г. Москва, ул. Промышленная, 15с2</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-white transition-colors">Главная</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Услуги</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">О компании</Link></li>
              <li><Link href="/contacts" className="hover:text-white transition-colors">Контакты</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Федерация Холода
        </div>
      </div>
    </footer>
  );
}
EOF
log_info "  ✓ Footer.tsx создан"

# 5️⃣ Исправляем layout.tsx (metadata + импорты)
log_info "Шаг 5/7: Исправляем layout.tsx..."
cat > app/layout.tsx << 'EOF'
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['cyrillic', 'latin'] });

export const metadata: Metadata = {
  title: 'Федерация Холода — Ремонт холодильного оборудования',
  description: 'Профессиональный ремонт и обслуживание холодильных установок. Выезд 24/7, гарантия до 3 лет.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
          <Header />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
EOF
log_info "  ✓ layout.tsx исправлен (metadata: + двоеточие)"

# 6️⃣ Создаём минимальную working page.tsx
log_info "Шаг 6/7: Создаём стартовую страницу..."
cat > app/page.tsx << 'EOF'
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-4">
      <div className="text-center max-w-2xl">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center text-4xl">❄️</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Федерация Холода</h1>
        <p className="text-lg text-slate-300 mb-8">
          Профессиональный ремонт и обслуживание холодильного оборудования. 
          Выезд 24/7 по всей России. Гарантия до 3 лет.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:+78005553535" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
            📞 Вызвать мастера
          </a>
          <a href="/services" className="inline-flex items-center justify-center px-6 py-3 border border-slate-600 hover:border-slate-400 rounded-lg font-semibold transition-colors">
            Наши услуги
          </a>
        </div>
      </div>
    </div>
  );
}
EOF
log_info "  ✓ page.tsx создан"

# 7️⃣ Создаём заглушки для остальных страниц (чтобы не было 404)
log_info "Шаг 7/7: Создаём заглушки страниц..."
mkdir -p app/services app/about app/contacts

for page in services about contacts; do
  cat > "app/$page/page.tsx" << EOF
import Link from 'next/link';
export default function ${page^}Page() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-4 capitalize">${page === 'services' ? 'Услуги' : page === 'about' ? 'О компании' : 'Контакты'}</h1>
      <p className="text-slate-400 mb-6 text-center max-w-lg">
        ${page === 'services' ? 'Список услуг по ремонту холодильного оборудования.' : page === 'about' ? 'Информация о компании Федерация Холода.' : 'Свяжитесь с нами для консультации.'}
      </p>
      <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">← На главную</Link>
    </div>
  );
}
EOF
done
log_info "  ✓ Страницы /services, /about, /contacts созданы"

# 🎯 Финал: очистка кэша и запуск
log_info "✅ Все файлы исправлены!"
log_warn "Очищаю кэш сборки..."
rm -rf .next

echo ""
echo "======================================="
echo "🚀 Чтобы запустить проект:"
echo "======================================="
echo ""
echo "  # Вариант 1: через скрипт"
echo "  npm run dev -- -H 0.0.0.0"
echo ""
echo "  # Вариант 2: обновить package.json"
echo "  # В scripts.dev добавьте: \"next dev -H 0.0.0.0\""
echo ""
echo "🌐 Откройте в браузере:"
echo "   http://127.0.0.1:3000"
echo ""
echo "💡 Если прокси мешает — выполните перед запуском:"
echo "   export HTTP_PROXY='' HTTPS_PROXY='' ALL_PROXY=''"
echo ""

# Делаем скрипт исполняемым
chmod +x "$0" 2>/dev/null || true

log_info "🎉 Готово! Сайт должен работать."
