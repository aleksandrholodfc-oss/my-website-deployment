import React from 'react';

interface HeroTabProps {
  data: any;
  updateContent: (path: string, value: any) => void;
}

export const HeroTab: React.FC<HeroTabProps> = ({ data, updateContent }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Заголовок</label>
          <input
            type="text"
            value={data?.title || ''}
            onChange={(e) => updateContent('hero.title', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Подзаголовок</label>
          <input
            type="text"
            value={data?.subtitle || ''}
            onChange={(e) => updateContent('hero.subtitle', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Описание</label>
        <textarea
          value={data?.description || ''}
          onChange={(e) => updateContent('hero.description', e.target.value)}
          rows={4}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Текст кнопки</label>
          <input
            type="text"
            value={data?.cta || ''}
            onChange={(e) => updateContent('hero.cta', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Изображение (URL)
          </label>
          <input
            type="text"
            value={data?.image || ''}
            onChange={(e) => updateContent('hero.image', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Телефон</label>
          <input
            type="text"
            value={data?.phone || ''}
            onChange={(e) => updateContent('hero.phone', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={data?.email || ''}
            onChange={(e) => updateContent('hero.email', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          />
        </div>
      </div>
    </div>
  );
};
