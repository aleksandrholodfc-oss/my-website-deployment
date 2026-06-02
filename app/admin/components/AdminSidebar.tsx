import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface AdminSidebarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <aside className="w-full lg:w-64 bg-white rounded-xl shadow-lg p-4 h-fit sticky top-24">
      <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all whitespace-nowrap lg:whitespace-normal flex-shrink-0 lg:flex-shrink ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <tab.icon size={20} />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};
