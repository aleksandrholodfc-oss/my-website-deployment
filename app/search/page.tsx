'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Breadcrumbs from '@/components/Breadcrumbs';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <>
      <Section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: 'Поиск', href: '/search' }]} />
        </div>
        <SectionHeader title="Поиск по сайту" subtitle="Результаты поиска" centered titleColor="text-white" />
        <div className="max-w-3xl mx-auto mb-12">
          <form onSubmit={(e) => { e.preventDefault(); router.push(`/search?q=${encodeURIComponent((e.target as HTMLFormElement).querySelector('input')?.value || '')}`); }} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              defaultValue={query}
              placeholder="Введите поисковый запрос..."
              className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Найти
            </button>
          </form>
        </div>
      </Section>

      <Section background="light">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl text-gray-600">Поиск...</div>
            </div>
          ) : query ? (
            <>
              {results.length > 0 ? (
                <>
                  <p className="text-gray-600 mb-8">
                    Найдено результатов: {results.length} по запросу &laquo;{query}&raquo;
                  </p>
                  <div className="space-y-4">
                    {results.map((result, index) => (
                      <Link key={index} href={result.url}>
                        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 transition-all cursor-pointer group">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-2">
                                {result.type === 'service' ? 'Услуга' : result.type === 'page' ? 'Страница' : result.type === 'advantage' ? 'Преимущество' : 'FAQ'}
                              </span>
                              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {result.title}
                              </h3>
                              <p className="text-gray-600 leading-relaxed">{result.description}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Ничего не найдено</h3>
                  <p className="text-gray-600 mb-6">Попробуйте изменить поисковый запрос</p>
                  <Link href="/services">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Перейти к услугам
                    </button>
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Введите поисковый запрос</h3>
              <p className="text-gray-600">Используйте форму выше для поиска по сайту</p>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <Section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: 'Поиск', href: '/search' }]} />
        </div>
        <SectionHeader title="Поиск по сайту" subtitle="Результаты поиска" centered titleColor="text-white" />
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="text-xl text-gray-600">Загрузка...</div>
        </div>
      </Section>
    }>
      <SearchContent />
    </Suspense>
  );
}
