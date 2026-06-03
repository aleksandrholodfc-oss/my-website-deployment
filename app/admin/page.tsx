'use client';

import React, { useState, useEffect } from 'react';
import {
  Home,
  Wrench,
  DollarSign,
  Building2,
  Settings,
  Image as ImageIcon,
  Star,
  Info,
} from 'lucide-react';
import { AdminHeader } from './components/AdminHeader';
import { AdminSidebar, Tab } from './components/AdminSidebar';
import { LoginForm } from './components/LoginForm';
import { TabWrapper } from './components/TabWrapper';
import { HeroTab } from './components/tabs/HeroTab';
import { ServicesTab } from './components/tabs/ServicesTab';
import { ContactsTab } from './components/tabs/ContactsTab';
import { GenericListTab } from './components/tabs/GenericListTab';
import { useAdminAuth } from './hooks/useAdminAuth';
import { useAdminContent } from './hooks/useAdminContent';

const TABS: Tab[] = [
  { id: 'hero', label: 'Главная', icon: Home },
  { id: 'advantages', label: 'Преимущества', icon: Settings },
  { id: 'services', label: 'Услуги', icon: Wrench },
  { id: 'priceList', label: 'Прайс-лист', icon: DollarSign },
  { id: 'promotions', label: 'Акции', icon: Star },
  { id: 'guarantees', label: 'Гарантии', icon: Settings },
  { id: 'faq', label: 'FAQ', icon: Info },
  { id: 'equipment', label: 'Фото оборудования', icon: ImageIcon },
  { id: 'about', label: 'О компании', icon: Info },
  { id: 'gallery', label: 'Галерея', icon: ImageIcon },
  { id: 'testimonials', label: 'Отзывы', icon: Star },
  { id: 'contacts', label: 'Контакты', icon: Building2 },
];

export default function AdminPage() {
  const {
    isAuthenticated,
    password,
    setPassword,
    loginError,
    loading: authLoading,
    handleLogin,
    handleLogout,
  } = useAdminAuth();

  const {
    content,
    loading: contentLoading,
    saving,
    message,
    loadContent,
    saveContent,
    updateContent,
  } = useAdminContent();

  const [activeTab, setActiveTab] = useState('hero');

  useEffect(() => {
    if (isAuthenticated) {
      loadContent();
    }
  }, [isAuthenticated, loadContent]);

  if (authLoading || (isAuthenticated && contentLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <div className="text-gray-600 font-medium">Загрузка...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginForm
        password={password}
        setPassword={setPassword}
        onSubmit={handleLogin}
        error={loginError}
      />
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <p className="text-xl text-red-600 font-bold mb-4">Ошибка загрузки данных</p>
          <button
            onClick={loadContent}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'hero':
        return <HeroTab data={content.hero} updateContent={updateContent} />;

      case 'advantages':
        return (
          <GenericListTab
            data={content.advantages}
            titlePrefix="Преимущество"
            renderFields={(adv, index) => (
              <>
                <input
                  type="text"
                  value={adv.title}
                  onChange={(e) => updateContent(`advantages.${index}.title`, e.target.value)}
                  placeholder="Заголовок"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                />
                <textarea
                  value={adv.description}
                  onChange={(e) => updateContent(`advantages.${index}.description`, e.target.value)}
                  placeholder="Описание"
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none resize-none"
                />
              </>
            )}
          />
        );

      case 'services':
        return <ServicesTab data={content.services} updateContent={updateContent} />;

      case 'priceList':
        return (
          <div className="space-y-8">
            {content.priceList?.map((category: any, catIndex: number) => (
              <div key={catIndex} className="p-5 border border-gray-200 rounded-xl bg-gray-50/30">
                <h3 className="font-bold text-lg mb-4 text-gray-800">{category.category}</h3>
                <div className="space-y-3">
                  {category.items.map((item: any, itemIndex: number) => (
                    <div key={item.id || itemIndex} className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1">
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                        />
                      </div>
                      <div className="w-full sm:w-48">
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'promotions':
        return (
          <GenericListTab
            data={content.promotions}
            titlePrefix="Акция"
            renderFields={(promo, index) => (
              <>
                <input
                  type="text"
                  value={promo.title}
                  onChange={(e) => updateContent(`promotions.${index}.title`, e.target.value)}
                  placeholder="Заголовок акции"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <textarea
                  value={promo.description}
                  onChange={(e) => updateContent(`promotions.${index}.description`, e.target.value)}
                  placeholder="Описание акции"
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={promo.validUntil}
                    onChange={(e) =>
                      updateContent(`promotions.${index}.validUntil`, e.target.value)
                    }
                    placeholder="Срок действия"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    value={promo.code}
                    onChange={(e) => updateContent(`promotions.${index}.code`, e.target.value)}
                    placeholder="Промокод"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </>
            )}
          />
        );

      case 'guarantees':
        return (
          <GenericListTab
            data={content.guarantees}
            titlePrefix="Гарантия"
            renderFields={(guarantee, index) => (
              <>
                <input
                  type="text"
                  value={guarantee.title}
                  onChange={(e) => updateContent(`guarantees.${index}.title`, e.target.value)}
                  placeholder="Заголовок гарантии"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <textarea
                  value={guarantee.description}
                  onChange={(e) => updateContent(`guarantees.${index}.description`, e.target.value)}
                  placeholder="Описание гарантии"
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </>
            )}
          />
        );

      case 'faq':
        return (
          <GenericListTab
            data={content.faq}
            titlePrefix="Вопрос"
            renderFields={(item, index) => (
              <>
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => updateContent(`faq.${index}.question`, e.target.value)}
                  placeholder="Вопрос"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <textarea
                  value={item.answer}
                  onChange={(e) => updateContent(`faq.${index}.answer`, e.target.value)}
                  placeholder="Ответ"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </>
            )}
          />
        );

      case 'equipment':
        return (
          <div className="space-y-6">
            {[
              { id: 'trade', label: 'Торговое оборудование' },
              { id: 'industrial', label: 'Промышленное оборудование' },
              { id: 'climate', label: 'Климатическое оборудование' },
              { id: 'auto', label: 'Автокондиционеры' },
            ].map((eq) => (
              <div key={eq.id} className="p-5 border border-gray-200 rounded-xl bg-gray-50/30">
                <label className="block text-sm font-semibold text-gray-700 mb-2">{eq.label}</label>
                <input
                  type="text"
                  value={content.equipmentImages?.[eq.id] || ''}
                  onChange={(e) => updateContent(`equipmentImages.${eq.id}`, e.target.value)}
                  placeholder="URL изображения"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            ))}
          </div>
        );

      case 'about':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Название компании
                </label>
                <input
                  type="text"
                  value={content.company?.name || ''}
                  onChange={(e) => updateContent('company.name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Логотип (URL)
                </label>
                <input
                  type="text"
                  value={content.company?.logo || ''}
                  onChange={(e) => updateContent('company.logo', e.target.value)}
                  placeholder="/images/logo.png"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Описание компании
              </label>
              <textarea
                value={content.company?.description || ''}
                onChange={(e) => updateContent('company.description', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                История компании
              </label>
              <textarea
                value={content.about?.history || ''}
                onChange={(e) => updateContent('about.history', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Миссия</label>
              <textarea
                value={content.about?.mission || ''}
                onChange={(e) => updateContent('about.mission', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-800">Ценности</h3>
              <div className="space-y-4">
                {content.about?.values?.map((value: any, index: number) => (
                  <div
                    key={value.id || index}
                    className="p-4 border border-gray-200 rounded-xl bg-gray-50/30"
                  >
                    <input
                      type="text"
                      value={value.title}
                      onChange={(e) => updateContent(`about.values.${index}.title`, e.target.value)}
                      placeholder="Заголовок ценности"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <textarea
                      value={value.description}
                      onChange={(e) =>
                        updateContent(`about.values.${index}.description`, e.target.value)
                      }
                      placeholder="Описание ценности"
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-800">Команда</h3>
              <div className="space-y-4">
                {content.about?.team?.map((member: any, index: number) => (
                  <div
                    key={member.id || index}
                    className="p-4 border border-gray-200 rounded-xl bg-gray-50/30 grid grid-cols-1 sm:grid-cols-3 gap-3"
                  >
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateContent(`about.team.${index}.name`, e.target.value)}
                      placeholder="Имя"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      value={member.position}
                      onChange={(e) =>
                        updateContent(`about.team.${index}.position`, e.target.value)
                      }
                      placeholder="Должность"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      value={member.experience}
                      onChange={(e) =>
                        updateContent(`about.team.${index}.experience`, e.target.value)
                      }
                      placeholder="Опыт"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-800">Статистика</h3>
              <div className="space-y-4">
                {content.about?.stats?.map((stat: any, index: number) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => updateContent(`about.stats.${index}.value`, e.target.value)}
                      placeholder="Значение"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => updateContent(`about.stats.${index}.label`, e.target.value)}
                      placeholder="Метка"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <GenericListTab
            data={content.gallery}
            titlePrefix="Фото"
            renderFields={(item, index) => (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateContent(`gallery.${index}.title`, e.target.value)}
                    placeholder="Заголовок"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <select
                    value={item.category || 'all'}
                    onChange={(e) => updateContent(`gallery.${index}.category`, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="all">Все</option>
                    <option value="trade">Торговое оборудование</option>
                    <option value="industrial">Промышленное оборудование</option>
                    <option value="climate">Климатическое оборудование</option>
                    <option value="auto">Автокондиционеры</option>
                    <option value="refrigerator">Рефрижераторы</option>
                  </select>
                </div>
                <input
                  type="text"
                  value={item.src || item.image || ''}
                  onChange={(e) => updateContent(`gallery.${index}.src`, e.target.value)}
                  placeholder="URL изображения"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="text"
                  value={item.alt || ''}
                  onChange={(e) => updateContent(`gallery.${index}.alt`, e.target.value)}
                  placeholder="Alt-текст (описание для SEO)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <textarea
                  value={item.description}
                  onChange={(e) => updateContent(`gallery.${index}.description`, e.target.value)}
                  placeholder="Описание"
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </>
            )}
          />
        );

      case 'testimonials':
        return (
          <GenericListTab
            data={content.testimonials}
            titlePrefix="Отзыв"
            renderFields={(testimonial, index) => (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={testimonial.name}
                    onChange={(e) => updateContent(`testimonials.${index}.name`, e.target.value)}
                    placeholder="Имя клиента"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    value={testimonial.company}
                    onChange={(e) => updateContent(`testimonials.${index}.company`, e.target.value)}
                    placeholder="Компания"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <textarea
                  value={testimonial.text}
                  onChange={(e) => updateContent(`testimonials.${index}.text`, e.target.value)}
                  placeholder="Текст отзыва"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Оценка (1-5)
                  </label>
                  <input
                    type="number"
                    value={testimonial.rating}
                    onChange={(e) =>
                      updateContent(`testimonials.${index}.rating`, parseInt(e.target.value))
                    }
                    min="1"
                    max="5"
                    className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </>
            )}
          />
        );

      case 'contacts':
        return <ContactsTab data={content} updateContent={updateContent} />;

      default:
        return (
          <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            Контент для вкладки &quot;{TABS.find((t) => t.id === activeTab)?.label}&quot; находится
            в разработке
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onLogout={handleLogout} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <AdminSidebar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

          <main className="flex-1 min-w-0">
            <TabWrapper
              title={TABS.find((t) => t.id === activeTab)?.label || ''}
              onSave={saveContent}
              saving={saving}
              message={message}
            >
              {renderTabContent()}
            </TabWrapper>
          </main>
        </div>
      </div>
    </div>
  );
}
