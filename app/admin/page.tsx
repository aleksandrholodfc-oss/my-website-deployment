'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Home, Wrench, DollarSign, Building2, Settings, LogOut, Image, Users, Star, Info, Lock } from 'lucide-react';
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

  const checkAuth = async () => {
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
  };

  useEffect(() => {
    checkAuth();
  }, []);

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
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setContent(newContent);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <div className="text-center mb-6">
            <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">Админ-панель</h1>
            <p className="text-gray-600">Введите пароль для доступа</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Введите пароль"
              />
            </div>
            {loginError && (
              <p className="text-red-600 text-sm">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Войти
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm">
              Вернуться на сайт
            </Link>
          </div>
        </div>
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
    { id: 'equipment', label: 'Фото оборудования', icon: Image },
    { id: 'about', label: 'О компании', icon: Info },
    { id: 'gallery', label: 'Галерея', icon: Image },
    { id: 'testimonials', label: 'Отзывы', icon: Star },
    { id: 'contacts', label: 'Контакты', icon: Building2 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-dark-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Админ-панель</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <LogOut size={20} />
              Выйти
            </button>
            <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              На сайт
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 bg-white rounded-xl shadow-lg p-4 h-fit">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {tabs.find((t) => t.id === activeTab)?.label}
                </h2>
                <button
                  onClick={saveContent}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  <Save size={20} />
                  {saving ? 'Сохранение...' : 'Сохранить'}
                </button>
              </div>

              {message && (
                <div className={`mb-4 p-4 rounded-lg ${message.includes('Ошибка') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {message}
                </div>
              )}

              {activeTab === 'hero' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Заголовок</label>
                    <input
                      type="text"
                      value={content.hero.title}
                      onChange={(e) => updateContent('hero.title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Подзаголовок</label>
                    <input
                      type="text"
                      value={content.hero.subtitle}
                      onChange={(e) => updateContent('hero.subtitle', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Описание</label>
                    <textarea
                      value={content.hero.description}
                      onChange={(e) => updateContent('hero.description', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Текст кнопки</label>
                    <input
                      type="text"
                      value={content.hero.cta}
                      onChange={(e) => updateContent('hero.cta', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Изображение (URL)</label>
                    <input
                      type="text"
                      value={content.hero.image}
                      onChange={(e) => updateContent('hero.image', e.target.value)}
                      placeholder="/images/hero-bg.jpg"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                    <input
                      type="text"
                      value={content.hero.phone}
                      onChange={(e) => updateContent('hero.phone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={content.hero.email || ''}
                      onChange={(e) => updateContent('hero.email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'advantages' && (
                <div className="space-y-4">
                  {content.advantages.map((adv: any, index: number) => (
                    <div key={adv.id} className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-bold mb-2">Преимущество #{index + 1}</h3>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={adv.title}
                          onChange={(e) => updateContent(`advantages.${index}.title`, e.target.value)}
                          placeholder="Заголовок"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <textarea
                          value={adv.description}
                          onChange={(e) => updateContent(`advantages.${index}.description`, e.target.value)}
                          placeholder="Описание"
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'services' && (
                <div className="space-y-4">
                  {content.services.map((service: any, index: number) => (
                    <div key={service.id} className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-bold mb-2">Категория #{index + 1}</h3>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={service.category}
                          onChange={(e) => updateContent(`services.${index}.category`, e.target.value)}
                          placeholder="Название категории"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={service.description || ''}
                          onChange={(e) => updateContent(`services.${index}.description`, e.target.value)}
                          placeholder="Описание категории"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={service.image || ''}
                          onChange={(e) => updateContent(`services.${index}.image`, e.target.value)}
                          placeholder="URL изображения (например, /images/services/trade.jpg)"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Услуги (каждая с новой строки)</label>
                          <textarea
                            value={service.items.join('\n')}
                            onChange={(e) => updateContent(`services.${index}.items`, e.target.value.split('\n'))}
                            rows={6}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'priceList' && (
                <div className="space-y-4">
                  {content.priceList.map((category: any, catIndex: number) => (
                    <div key={catIndex} className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-bold mb-4">{category.category}</h3>
                      {category.items.map((item: any, itemIndex: number) => (
                        <div key={item.id} className="flex gap-4 mb-2">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => updateContent(`priceList.${catIndex}.items.${itemIndex}.name`, e.target.value)}
                              placeholder="Название услуги"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                          <div className="w-48">
                            <input
                              type="text"
                              value={item.price}
                              onChange={(e) => updateContent(`priceList.${catIndex}.items.${itemIndex}.price`, e.target.value)}
                              placeholder="Цена"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'promotions' && (
                <div className="space-y-4">
                  {content.promotions?.map((promo: any, index: number) => (
                    <div key={promo.id} className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-bold mb-2">Акция #{index + 1}</h3>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={promo.title}
                          onChange={(e) => updateContent(`promotions.${index}.title`, e.target.value)}
                          placeholder="Заголовок акции"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <textarea
                          value={promo.description}
                          onChange={(e) => updateContent(`promotions.${index}.description`, e.target.value)}
                          placeholder="Описание акции"
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        />
                        <input
                          type="text"
                          value={promo.validUntil}
                          onChange={(e) => updateContent(`promotions.${index}.validUntil`, e.target.value)}
                          placeholder="Срок действия"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={promo.code}
                          onChange={(e) => updateContent(`promotions.${index}.code`, e.target.value)}
                          placeholder="Промокод"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'guarantees' && (
                <div className="space-y-4">
                  {content.guarantees?.map((guarantee: any, index: number) => (
                    <div key={guarantee.id} className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-bold mb-2">Гарантия #{index + 1}</h3>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={guarantee.title}
                          onChange={(e) => updateContent(`guarantees.${index}.title`, e.target.value)}
                          placeholder="Заголовок гарантии"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <textarea
                          value={guarantee.description}
                          onChange={(e) => updateContent(`guarantees.${index}.description`, e.target.value)}
                          placeholder="Описание гарантии"
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="space-y-4">
                  {content.faq?.map((item: any, index: number) => (
                    <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-bold mb-2">Вопрос #{index + 1}</h3>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={item.question}
                          onChange={(e) => updateContent(`faq.${index}.question`, e.target.value)}
                          placeholder="Вопрос"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <textarea
                          value={item.answer}
                          onChange={(e) => updateContent(`faq.${index}.answer`, e.target.value)}
                          placeholder="Ответ"
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'equipment' && (
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-bold mb-2">Торговое оборудование</h3>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={content.equipmentImages?.trade || '/images/torgovoe.jpg'}
                        onChange={(e) => updateContent('equipmentImages.trade', e.target.value)}
                        placeholder="URL изображения"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-bold mb-2">Промышленное оборудование</h3>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={content.equipmentImages?.industrial || '/images/prom.jpg'}
                        onChange={(e) => updateContent('equipmentImages.industrial', e.target.value)}
                        placeholder="URL изображения"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-bold mb-2">Климатическое оборудование</h3>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={content.equipmentImages?.climate || '/images/klimatika.jpg'}
                        onChange={(e) => updateContent('equipmentImages.climate', e.target.value)}
                        placeholder="URL изображения"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-bold mb-2">Автокондиционеры</h3>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={content.equipmentImages?.auto || '/images/auto.jpg'}
                        onChange={(e) => updateContent('equipmentImages.auto', e.target.value)}
                        placeholder="URL изображения"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'contacts' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                    <input
                      type="text"
                      value={content.contacts.phone}
                      onChange={(e) => updateContent('contacts.phone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Городской телефон</label>
                    <input
                      type="text"
                      value={content.contacts.phoneCity || ''}
                      onChange={(e) => updateContent('contacts.phoneCity', e.target.value)}
                      placeholder="+7 (3952) 41-66-33"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={content.contacts.email}
                      onChange={(e) => updateContent('contacts.email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Адрес</label>
                    <input
                      type="text"
                      value={content.contacts.address}
                      onChange={(e) => updateContent('contacts.address', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Время работы</label>
                    <input
                      type="text"
                      value={content.contacts.hours}
                      onChange={(e) => updateContent('contacts.hours', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL карты</label>
                    <input
                      type="text"
                      value={content.contacts.mapUrl || ''}
                      onChange={(e) => updateContent('contacts.mapUrl', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ИНН</label>
                    <input
                      type="text"
                      value={content.contacts.inn || ''}
                      onChange={(e) => updateContent('contacts.inn', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ОГРН</label>
                    <input
                      type="text"
                      value={content.contacts.ogrn || ''}
                      onChange={(e) => updateContent('contacts.ogrn', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Расчётный счёт</label>
                    <input
                      type="text"
                      value={content.contacts.bankAccount || ''}
                      onChange={(e) => updateContent('contacts.bankAccount', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Банк</label>
                    <input
                      type="text"
                      value={content.contacts.bankName || ''}
                      onChange={(e) => updateContent('contacts.bankName', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">БИК</label>
                    <input
                      type="text"
                      value={content.contacts.bik || ''}
                      onChange={(e) => updateContent('contacts.bik', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'about' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Название компании</label>
                    <input
                      type="text"
                      value={content.company?.name || ''}
                      onChange={(e) => updateContent('company.name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Описание компании</label>
                    <textarea
                      value={content.company?.description || ''}
                      onChange={(e) => updateContent('company.description', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Логотип (URL)</label>
                    <input
                      type="text"
                      value={content.company?.logo || ''}
                      onChange={(e) => updateContent('company.logo', e.target.value)}
                      placeholder="/images/logo.png"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">История компании</label>
                    <textarea
                      value={content.about?.history || ''}
                      onChange={(e) => updateContent('about.history', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Миссия</label>
                    <textarea
                      value={content.about?.mission || ''}
                      onChange={(e) => updateContent('about.mission', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Ценности</h3>
                    {content.about?.values?.map((value: any, index: number) => (
                      <div key={value.id} className="p-3 border border-gray-200 rounded-lg mb-2">
                        <input
                          type="text"
                          value={value.title}
                          onChange={(e) => updateContent(`about.values.${index}.title`, e.target.value)}
                          placeholder="Заголовок ценности"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <textarea
                          value={value.description}
                          onChange={(e) => updateContent(`about.values.${index}.description`, e.target.value)}
                          placeholder="Описание ценности"
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Команда</h3>
                    {content.about?.team?.map((member: any, index: number) => (
                      <div key={member.id} className="p-3 border border-gray-200 rounded-lg mb-2">
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => updateContent(`about.team.${index}.name`, e.target.value)}
                          placeholder="Имя"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={member.position}
                          onChange={(e) => updateContent(`about.team.${index}.position`, e.target.value)}
                          placeholder="Должность"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={member.experience}
                          onChange={(e) => updateContent(`about.team.${index}.experience`, e.target.value)}
                          placeholder="Опыт"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Статистика</h3>
                    {content.about?.stats?.map((stat: any, index: number) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => updateContent(`about.stats.${index}.value`, e.target.value)}
                          placeholder="Значение"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => updateContent(`about.stats.${index}.label`, e.target.value)}
                          placeholder="Метка"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'gallery' && (
                <div className="space-y-4">
                  {content.gallery?.map((item: any, index: number) => (
                    <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-bold mb-2">Фото #{index + 1}</h3>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateContent(`gallery.${index}.title`, e.target.value)}
                          placeholder="Заголовок"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <textarea
                          value={item.description}
                          onChange={(e) => updateContent(`gallery.${index}.description`, e.target.value)}
                          placeholder="Описание"
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        />
                        <input
                          type="text"
                          value={item.image}
                          onChange={(e) => updateContent(`gallery.${index}.image`, e.target.value)}
                          placeholder="URL изображения (например, /images/gallery/camera-repair.jpg)"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'testimonials' && (
                <div className="space-y-4">
                  {content.testimonials?.map((testimonial: any, index: number) => (
                    <div key={testimonial.id} className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-bold mb-2">Отзыв #{index + 1}</h3>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={testimonial.name}
                          onChange={(e) => updateContent(`testimonials.${index}.name`, e.target.value)}
                          placeholder="Имя клиента"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={testimonial.company}
                          onChange={(e) => updateContent(`testimonials.${index}.company`, e.target.value)}
                          placeholder="Компания"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <textarea
                          value={testimonial.text}
                          onChange={(e) => updateContent(`testimonials.${index}.text`, e.target.value)}
                          placeholder="Текст отзыва"
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        />
                        <input
                          type="number"
                          value={testimonial.rating}
                          onChange={(e) => updateContent(`testimonials.${index}.rating`, parseInt(e.target.value))}
                          min="1"
                          max="5"
                          placeholder="Оценка (1-5)"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
