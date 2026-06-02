import React from 'react';
import { Lock } from 'lucide-react';
import Link from 'next/link';

interface LoginFormProps {
  password: string;
  setPassword: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  error?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ password, setPassword, onSubmit, error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">Админ-панель</h1>
          <p className="text-gray-600">Введите пароль для доступа</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Введите пароль"
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Войти
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Вернуться на сайт
          </Link>
        </div>
      </div>
    </div>
  );
};
