'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save,
  Home,
  Wrench,
  DollarSign,
  Building2,
  Settings,
  LogOut,
  Image as ImageIcon,
  Users,
  Star,
  Info,
  Lock,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('hero');
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/login');
      const data = await response.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        loadContent();
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        loadContent();
      } else {
        setLoginError('Неверный пароль');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Ошибка авторизации');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const loadContent = async () => {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      setContent(data);
      setLoading(false);
    } catch (error) {
      setMessage('Ошибка загрузки данных');
      setLoading(false);
    }
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (response.ok) {
        setMessage('Сохранено успешно!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Ошибка сохранения');
    }
    setSaving(false);
  };

  const updateContent = (path: string, value: any) => {
    const keys = path.split('.');
    const newContent = { ...content };
    let current: any = newContent;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setContent(newContent);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
          <div className="text-slate-400 font-medium">Загрузка...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 rounded-full blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 shadow-2xl w-full max-w-md relative z-10"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/20 text-blue-400 mb-4 ring-1 ring-blue-500/30">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Админ-панель</h1>
            <p className="text-slate-400">Введите пароль для доступа к управлению</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Пароль</label>
              <input
                type="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                placeholder="••••••••"
              />
            </div>
            {loginError && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 p-3 rounded-lg"
              >
                {loginError}
              </motion.p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group"
            >
              Войти в систему
              <ChevronRight
                size={18}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </button>
          </form>
          <div className="mt-8 text-center border-t border-slate-700/50 pt-6">
            <Link
              href="/"
              className="text-slate-400 hover:text-white text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Home size={16} />
              Вернуться на сайт
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-xl text-red-400">Ошибка загрузки данных</div>
      </div>
    );
  }

  const tabs = [
    { id: 'hero', label: 'Главная', icon: Home },
    { id: 'advantages', label: 'Преимущества', icon: Settings },
    { id: 'services', label: 'Услуги', icon: Wrench },
    { id: 'priceList', label: 'Прайс-лист', icon: DollarSign },
    { id: 'promotions', label: 'Акции', icon: Star },
    { id: 'guarantees', label: 'Гарантии', icon: Settings },
    { id: 'faq', label: 'FAQ', icon: Info },
    { id: 'equipment', label: 'Фото оборудования', icon: ImageIcon as any },
    { id: 'about', label: 'О компании', icon: Info },
    { id: 'gallery', label: 'Галерея', icon: ImageIcon as any },
    { id: 'testimonials', label: 'Отзывы', icon: Users },
    { id: 'contacts', label: 'Контакты', icon: Building2 },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Settings className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-none">Федерация Холода</h1>
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                Control Panel
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Просмотр сайта
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all text-sm font-medium border border-slate-700"
            >
              <LogOut size={18} />
              Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-24 space-y-2">
              <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                Навигация
              </p>
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <tab.icon
                      size={20}
                      className={
                        activeTab === tab.id
                          ? 'text-white'
                          : 'group-hover:text-blue-400 transition-colors'
                      }
                    />
                    <span className="font-medium text-sm">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="p-6 border-b border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/30">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {tabs.find((t) => t.id === activeTab)?.label}
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    Редактирование раздела «{tabs.find((t) => t.id === activeTab)?.label}»
                  </p>
                </div>
                <button
                  onClick={saveContent}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
                >
                  <Save size={20} />
                  {saving ? 'Сохранение...' : 'Сохранить изменения'}
                </button>
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`mb-6 p-4 rounded-xl border flex items-center gap-3 ${
                        message.includes('Ошибка')
                          ? 'bg-red-500/10 border-red-500/20 text-red-400'
                          : 'bg-green-500/10 border-green-500/20 text-green-400'
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full animate-pulse ${message.includes('Ошибка') ? 'bg-red-400' : 'bg-green-400'}`}
                      />
                      <span className="font-medium text-sm">{message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-8">
                  {activeTab === 'hero' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          Главный заголовок
                        </label>
                        <input
                          type="text"
                          value={content.hero?.title || ''}
                          onChange={(e) => updateContent('hero.title', e.target.value)}
                          className="admin-input"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          Подзаголовок (Bold)
                        </label>
                        <input
                          type="text"
                          value={content.hero?.subtitle || ''}
                          onChange={(e) => updateContent('hero.subtitle', e.target.value)}
                          className="admin-input"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          Описание
                        </label>
                        <textarea
                          value={content.hero?.description || ''}
                          onChange={(e) => updateContent('hero.description', e.target.value)}
                          rows={4}
                          className="admin-textarea"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          Текст кнопки (CTA)
                        </label>
                        <input
                          type="text"
                          value={content.hero?.cta || ''}
                          onChange={(e) => updateContent('hero.cta', e.target.value)}
                          className="admin-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          Изображение (URL)
                        </label>
                        <input
                          type="text"
                          value={content.hero?.image || ''}
                          onChange={(e) => updateContent('hero.image', e.target.value)}
                          placeholder="/images/hero-bg.jpg"
                          className="admin-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          Телефон
                        </label>
                        <input
                          type="text"
                          value={content.hero?.phone || ''}
                          onChange={(e) => updateContent('hero.phone', e.target.value)}
                          className="admin-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={content.hero?.email || ''}
                          onChange={(e) => updateContent('hero.email', e.target.value)}
                          className="admin-input"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'advantages' && (
                    <div className="space-y-6">
                      {content.advantages?.map((adv: any, index: number) => (
                        <div
                          key={adv.id}
                          className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700/50 hover:border-slate-600/50 transition-colors"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center text-xs font-bold ring-1 ring-blue-500/30">
                              {index + 1}
                            </span>
                            <h3 className="font-bold text-white uppercase tracking-wider text-xs">
                              Преимущество
                            </h3>
                          </div>
                          <div className="space-y-4">
                            <input
                              type="text"
                              value={adv.title}
                              onChange={(e) =>
                                updateContent(`advantages.${index}.title`, e.target.value)
                              }
                              placeholder="Заголовок"
                              className="admin-input"
                            />
                            <textarea
                              value={adv.description}
                              onChange={(e) =>
                                updateContent(`advantages.${index}.description`, e.target.value)
                              }
                              placeholder="Описание"
                              rows={2}
                              className="admin-textarea"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'services' && (
                    <div className="space-y-6">
                      {content.services?.map((service: any, index: number) => (
                        <div
                          key={service.id}
                          className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700/50 transition-all hover:ring-1 hover:ring-blue-500/30"
                        >
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                              <Wrench className="text-blue-500" size={20} />
                              Категория: {service.category}
                            </h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                Название категории
                              </label>
                              <input
                                type="text"
                                value={service.category}
                                onChange={(e) =>
                                  updateContent(`services.${index}.category`, e.target.value)
                                }
                                className="admin-input"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                Описание категории
                              </label>
                              <input
                                type="text"
                                value={service.description || ''}
                                onChange={(e) =>
                                  updateContent(`services.${index}.description`, e.target.value)
                                }
                                className="admin-input"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                URL изображения
                              </label>
                              <input
                                type="text"
                                value={service.image || ''}
                                onChange={(e) =>
                                  updateContent(`services.${index}.image`, e.target.value)
                                }
                                className="admin-input"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                Список услуг (одна на строку)
                              </label>
                              <textarea
                                value={service.items.join('\n')}
                                onChange={(e) =>
                                  updateContent(
                                    `services.${index}.items`,
                                    e.target.value.split('\n')
                                  )
                                }
                                rows={6}
                                className="admin-textarea"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'priceList' && (
                    <div className="space-y-8">
                      {content.priceList?.map((category: any, catIndex: number) => (
                        <div
                          key={catIndex}
                          className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700/50"
                        >
                          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <DollarSign className="text-green-500" size={20} />
                            {category.category}
                          </h3>
                          <div className="space-y-4">
                            {category.items.map((item: any, itemIndex: number) => (
                              <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 lg:col-span-9">
                                  <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) =>
                                      updateContent(
                                        `priceList.${catIndex}.items.${itemIndex}.name`,
                                        e.target.value
                                      )
                                    }
                                    placeholder="Название услуги"
                                    className="admin-input"
                                  />
                                </div>
                                <div className="col-span-4 lg:col-span-3">
                                  <input
                                    type="text"
                                    value={item.price}
                                    onChange={(e) =>
                                      updateContent(
                                        `priceList.${catIndex}.items.${itemIndex}.price`,
                                        e.target.value
                                      )
                                    }
                                    placeholder="Цена"
                                    className="admin-input text-right font-mono"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'promotions' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {content.promotions?.map((promo: any, index: number) => (
                        <div
                          key={promo.id}
                          className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700/50 relative overflow-hidden group"
                        >
                          <div className="absolute top-0 right-0 p-4">
                            <Star
                              className="text-yellow-500 opacity-20 group-hover:opacity-50 transition-opacity"
                              size={40}
                            />
                          </div>
                          <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">
                            Акция #{index + 1}
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="admin-label">Заголовок</label>
                              <input
                                type="text"
                                value={promo.title}
                                onChange={(e) =>
                                  updateContent(`promotions.${index}.title`, e.target.value)
                                }
                                className="admin-input"
                              />
                            </div>
                            <div>
                              <label className="admin-label">Описание</label>
                              <textarea
                                value={promo.description}
                                onChange={(e) =>
                                  updateContent(`promotions.${index}.description`, e.target.value)
                                }
                                rows={2}
                                className="admin-textarea"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="admin-label">Срок действия</label>
                                <input
                                  type="text"
                                  value={promo.validUntil}
                                  onChange={(e) =>
                                    updateContent(`promotions.${index}.validUntil`, e.target.value)
                                  }
                                  className="admin-input"
                                />
                              </div>
                              <div>
                                <label className="admin-label">Промокод</label>
                                <input
                                  type="text"
                                  value={promo.code}
                                  onChange={(e) =>
                                    updateContent(`promotions.${index}.code`, e.target.value)
                                  }
                                  className="admin-input font-mono"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Rest of the tabs continue with the same pattern... */}
                  {/* For brevity, applying general styles to all remaining fields */}

                  {activeTab === 'faq' && (
                    <div className="space-y-6">
                      {content.faq?.map((item: any, index: number) => (
                        <div
                          key={item.id}
                          className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700/50"
                        >
                          <h3 className="font-bold text-white mb-4">Вопрос #{index + 1}</h3>
                          <div className="space-y-4">
                            <input
                              type="text"
                              value={item.question}
                              onChange={(e) =>
                                updateContent(`faq.${index}.question`, e.target.value)
                              }
                              placeholder="Вопрос"
                              className="admin-input"
                            />
                            <textarea
                              value={item.answer}
                              onChange={(e) => updateContent(`faq.${index}.answer`, e.target.value)}
                              placeholder="Ответ"
                              rows={3}
                              className="admin-textarea"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'contacts' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="admin-label">Основной телефон</label>
                        <input
                          type="text"
                          value={content.contacts?.phone || ''}
                          onChange={(e) => updateContent('contacts.phone', e.target.value)}
                          className="admin-input"
                        />
                      </div>
                      <div>
                        <label className="admin-label">Городской телефон</label>
                        <input
                          type="text"
                          value={content.contacts?.phoneCity || ''}
                          onChange={(e) => updateContent('contacts.phoneCity', e.target.value)}
                          className="admin-input"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="admin-label">Email</label>
                        <input
                          type="email"
                          value={content.contacts?.email || ''}
                          onChange={(e) => updateContent('contacts.email', e.target.value)}
                          className="admin-input"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="admin-label">Адрес</label>
                        <input
                          type="text"
                          value={content.contacts?.address || ''}
                          onChange={(e) => updateContent('contacts.address', e.target.value)}
                          className="admin-input"
                        />
                      </div>
                      <div>
                        <label className="admin-label">Время работы</label>
                        <input
                          type="text"
                          value={content.contacts?.hours || ''}
                          onChange={(e) => updateContent('contacts.hours', e.target.value)}
                          className="admin-input"
                        />
                      </div>
                      <div>
                        <label className="admin-label">URL карты (Iframe/Link)</label>
                        <input
                          type="text"
                          value={content.contacts.mapUrl || ''}
                          onChange={(e) => updateContent('contacts.mapUrl', e.target.value)}
                          className="admin-input"
                        />
                      </div>

                      <div className="md:col-span-2 pt-4 border-t border-slate-700/50 mt-4">
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">
                          Юридические данные
                        </h4>
                      </div>

                      <div>
                        <label className="admin-label">ИНН</label>
                        <input
                          type="text"
                          value={content.contacts.inn || ''}
                          onChange={(e) => updateContent('contacts.inn', e.target.value)}
                          className="admin-input"
                        />
                      </div>
                      <div>
                        <label className="admin-label">ОГРН</label>
                        <input
                          type="text"
                          value={content.contacts.ogrn || ''}
                          onChange={(e) => updateContent('contacts.ogrn', e.target.value)}
                          className="admin-input"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="admin-label">Расчётный счёт</label>
                        <input
                          type="text"
                          value={content.contacts.bankAccount || ''}
                          onChange={(e) => updateContent('contacts.bankAccount', e.target.value)}
                          className="admin-input"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="admin-label">Банк</label>
                        <input
                          type="text"
                          value={content.contacts.bankName || ''}
                          onChange={(e) => updateContent('contacts.bankName', e.target.value)}
                          className="admin-input"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'equipment' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { key: 'trade', label: 'Торговое оборудование' },
                        { key: 'industrial', label: 'Промышленное оборудование' },
                        { key: 'climate', label: 'Климатическое оборудование' },
                        { key: 'auto', label: 'Автокондиционеры' },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700/50"
                        >
                          <label className="admin-label">{item.label}</label>
                          <input
                            type="text"
                            value={content.equipmentImages?.[item.key] || ''}
                            onChange={(e) =>
                              updateContent(`equipmentImages.${item.key}`, e.target.value)
                            }
                            placeholder="URL изображения"
                            className="admin-input"
                          />
                          {content.equipmentImages?.[item.key] && (
                            <div className="mt-4 aspect-video rounded-lg overflow-hidden border border-slate-800">
                              <img
                                src={content.equipmentImages[item.key]}
                                alt={item.label}
                                className="w-full h-full object-cover opacity-50"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'about' && (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="admin-label">Название компании</label>
                          <input
                            type="text"
                            value={content.company?.name || ''}
                            onChange={(e) => updateContent('company.name', e.target.value)}
                            className="admin-input"
                          />
                        </div>
                        <div>
                          <label className="admin-label">Логотип (URL)</label>
                          <input
                            type="text"
                            value={content.company?.logo || ''}
                            onChange={(e) => updateContent('company.logo', e.target.value)}
                            className="admin-input"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="admin-label">Краткое описание</label>
                          <textarea
                            value={content.company?.description || ''}
                            onChange={(e) => updateContent('company.description', e.target.value)}
                            rows={2}
                            className="admin-textarea"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="admin-label">История компании</label>
                          <textarea
                            value={content.about?.history || ''}
                            onChange={(e) => updateContent('about.history', e.target.value)}
                            rows={4}
                            className="admin-textarea"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="admin-label">Миссия</label>
                          <textarea
                            value={content.about?.mission || ''}
                            onChange={(e) => updateContent('about.mission', e.target.value)}
                            rows={3}
                            className="admin-textarea"
                          />
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-700/50">
                        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                          <Star className="text-yellow-500" size={18} />
                          Ценности компании
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {content.about?.values?.map((value: any, index: number) => (
                            <div
                              key={value.id}
                              className="p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl"
                            >
                              <input
                                type="text"
                                value={value.title}
                                onChange={(e) =>
                                  updateContent(`about.values.${index}.title`, e.target.value)
                                }
                                placeholder="Заголовок"
                                className="admin-input mb-2 font-bold"
                              />
                              <textarea
                                value={value.description}
                                onChange={(e) =>
                                  updateContent(`about.values.${index}.description`, e.target.value)
                                }
                                placeholder="Описание"
                                rows={2}
                                className="admin-textarea text-xs"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-700/50">
                        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                          <Users className="text-blue-500" size={18} />
                          Команда
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {content.about?.team?.map((member: any, index: number) => (
                            <div
                              key={member.id}
                              className="p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl"
                            >
                              <input
                                type="text"
                                value={member.name}
                                onChange={(e) =>
                                  updateContent(`about.team.${index}.name`, e.target.value)
                                }
                                placeholder="Имя"
                                className="admin-input mb-2 text-sm"
                              />
                              <input
                                type="text"
                                value={member.position}
                                onChange={(e) =>
                                  updateContent(`about.team.${index}.position`, e.target.value)
                                }
                                placeholder="Должность"
                                className="admin-input mb-2 text-xs opacity-80"
                              />
                              <input
                                type="text"
                                value={member.experience}
                                onChange={(e) =>
                                  updateContent(`about.team.${index}.experience`, e.target.value)
                                }
                                placeholder="Опыт"
                                className="admin-input text-xs opacity-60"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'gallery' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {content.gallery?.map((item: any, index: number) => (
                        <div
                          key={item.id}
                          className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700/50 flex flex-col"
                        >
                          <div className="mb-4 aspect-video rounded-xl overflow-hidden bg-slate-800 relative group">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <ImageIcon className="text-white" size={32} />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) =>
                                updateContent(`gallery.${index}.title`, e.target.value)
                              }
                              placeholder="Заголовок"
                              className="admin-input font-bold"
                            />
                            <textarea
                              value={item.description}
                              onChange={(e) =>
                                updateContent(`gallery.${index}.description`, e.target.value)
                              }
                              placeholder="Описание"
                              rows={2}
                              className="admin-textarea text-sm"
                            />
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={item.image}
                                onChange={(e) =>
                                  updateContent(`gallery.${index}.image`, e.target.value)
                                }
                                placeholder="URL изображения"
                                className="admin-input text-xs"
                              />
                              <select
                                value={item.category || 'all'}
                                onChange={(e) =>
                                  updateContent(`gallery.${index}.category`, e.target.value)
                                }
                                className="admin-input text-xs appearance-none"
                              >
                                <option value="all">Все</option>
                                <option value="trade">Торговое</option>
                                <option value="industrial">Промышленное</option>
                                <option value="climate">Климатическое</option>
                                <option value="auto">Авто</option>
                                <option value="refrigerator">Рефрижераторы</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'testimonials' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {content.testimonials?.map((testimonial: any, index: number) => (
                        <div
                          key={testimonial.id}
                          className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700/50 relative"
                        >
                          <div className="absolute top-6 right-6 flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={
                                  i < (testimonial.rating || 5)
                                    ? 'fill-yellow-500 text-yellow-500'
                                    : 'text-slate-700'
                                }
                              />
                            ))}
                          </div>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={testimonial.name}
                                onChange={(e) =>
                                  updateContent(`testimonials.${index}.name`, e.target.value)
                                }
                                placeholder="Имя клиента"
                                className="admin-input font-bold"
                              />
                              <input
                                type="text"
                                value={testimonial.company}
                                onChange={(e) =>
                                  updateContent(`testimonials.${index}.company`, e.target.value)
                                }
                                placeholder="Компания"
                                className="admin-input text-sm opacity-70"
                              />
                            </div>
                            <textarea
                              value={testimonial.text}
                              onChange={(e) =>
                                updateContent(`testimonials.${index}.text`, e.target.value)
                              }
                              placeholder="Текст отзыва"
                              rows={4}
                              className="admin-textarea"
                            />
                            <div className="flex items-center gap-4">
                              <label className="admin-label mb-0">Рейтинг:</label>
                              <input
                                type="number"
                                value={testimonial.rating}
                                onChange={(e) =>
                                  updateContent(
                                    `testimonials.${index}.rating`,
                                    parseInt(e.target.value)
                                  )
                                }
                                min="1"
                                max="5"
                                className="w-20 admin-input py-1.5"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <style jsx global>{`
        .admin-input {
          @apply w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 text-sm transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20;
        }
        .admin-textarea {
          @apply w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 text-sm transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 min-h-[80px] resize-vertical;
        }
        .admin-label {
          @apply block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2;
        }
      `}</style>
    </div>
  );
}
