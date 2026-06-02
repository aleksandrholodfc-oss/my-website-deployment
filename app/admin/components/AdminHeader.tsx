import React from 'react';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

interface AdminHeaderProps {
  onLogout: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onLogout }) => {
  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold">Админ-панель</h1>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base font-medium"
          >
            На сайт
          </Link>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm sm:text-base font-medium bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Выйти</span>
          </button>
        </div>
      </div>
    </header>
  );
};
