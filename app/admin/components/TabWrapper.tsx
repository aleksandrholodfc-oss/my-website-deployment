import React from 'react';

interface TabWrapperProps {
  title: string;
  onSave: () => void;
  saving: boolean;
  message?: string;
  children: React.ReactNode;
}

export const TabWrapper: React.FC<TabWrapperProps> = ({
  title,
  onSave,
  saving,
  message,
  children,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h2>
        <button
          onClick={onSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 shadow-md shadow-blue-100 font-medium"
        >
          {saving ? 'Сохранение...' : 'Сохранить изменения'}
        </button>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center gap-3 border ${
            message.includes('Ошибка')
              ? 'bg-red-50 text-red-700 border-red-100'
              : 'bg-green-50 text-green-700 border-green-100'
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${message.includes('Ошибка') ? 'bg-red-500' : 'bg-green-500'}`}
          />
          <span className="font-medium text-sm sm:text-base">{message}</span>
        </div>
      )}

      <div className="space-y-6">{children}</div>
    </div>
  );
};
