'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';

export default function BlogPage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load content:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  return (
    <>
      <Section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: 'Блог', href: '/blog' }]} />
        </div>
        <SectionHeader title="Блог" subtitle="Полезные статьи о холодильном оборудовании" centered />
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.blog?.map((article: any, index: number) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="h-full flex flex-col">
                <div className="p-6 flex-1">
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                    <Calendar size={16} />
                    {article.date}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{article.title}</h3>
                  <p className="text-slate-400 mb-4 leading-relaxed">{article.excerpt}</p>
                  <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                    {article.category}
                  </span>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    href={`/blog/${article.id}`}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
                  >
                    Читать статью <ArrowRight size={16} />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
