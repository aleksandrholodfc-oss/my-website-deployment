import React from 'react';

interface ServicesTabProps {
  data: any[];
  updateContent: (path: string, value: any) => void;
}

export const ServicesTab: React.FC<ServicesTabProps> = ({ data, updateContent }) => {
  return (
    <div className="space-y-8">
      {data?.map((service, index) => (
        <div
          key={service.id || index}
          className="p-5 border border-gray-200 rounded-xl bg-gray-50/30"
        >
          <h3 className="font-bold text-lg mb-4 text-gray-800">Категория #{index + 1}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Название категории
              </label>
              <input
                type="text"
                value={service.category}
                onChange={(e) => updateContent(`services.${index}.category`, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Описание категории
              </label>
              <input
                type="text"
                value={service.description || ''}
                onChange={(e) => updateContent(`services.${index}.description`, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                URL изображения
              </label>
              <input
                type="text"
                value={service.image || ''}
                onChange={(e) => updateContent(`services.${index}.image`, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Услуги (каждая с новой строки)
              </label>
              <textarea
                value={service.items?.join('\n') || ''}
                onChange={(e) =>
                  updateContent(`services.${index}.items`, e.target.value.split('\n'))
                }
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none resize-none"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
