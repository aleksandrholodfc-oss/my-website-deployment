import React from 'react';

interface ContactsTabProps {
  data: any;
  updateContent: (path: string, value: any) => void;
}

export const ContactsTab: React.FC<ContactsTabProps> = ({ data, updateContent }) => {
  const fields = [
    { label: 'Телефон', path: 'contacts.phone' },
    { label: 'Городской телефон', path: 'contacts.phoneCity', placeholder: '+7 (3952) 41-66-33' },
    { label: 'Email', path: 'contacts.email', type: 'email' },
    { label: 'Адрес', path: 'contacts.address' },
    { label: 'Время работы', path: 'contacts.hours' },
    { label: 'URL карты', path: 'contacts.mapUrl' },
    { label: 'ИНН', path: 'contacts.inn' },
    { label: 'ОГРН', path: 'contacts.ogrn' },
    { label: 'Расчётный счёт', path: 'contacts.bankAccount' },
    { label: 'Банк', path: 'contacts.bankName' },
    { label: 'БИК', path: 'contacts.bik' },
  ];

  const getValue = (path: string) => {
    const keys = path.split('.');
    let current = data;
    for (const key of keys.slice(1)) {
      current = current?.[key];
    }
    return current || '';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fields.map((field) => (
        <div key={field.path}>
          <label className="block text-sm font-semibold text-gray-700 mb-1">{field.label}</label>
          <input
            type={field.type || 'text'}
            value={getValue(field.path)}
            onChange={(e) => updateContent(field.path, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
          />
        </div>
      ))}
    </div>
  );
};
