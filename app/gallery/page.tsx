'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function GalleryPage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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

  const openImage = (item: any, index: number) => {
    setSelectedImage(item);
    setCurrentIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (!content?.gallery) return;
    const newIndex = (currentIndex + 1) % content.gallery.length;
    setSelectedImage(content.gallery[newIndex]);
    setCurrentIndex(newIndex);
  };

  const prevImage = () => {
    if (!content?.gallery) return;
    const newIndex = (currentIndex - 1 + content.gallery.length) % content.gallery.length;
    setSelectedImage(content.gallery[newIndex]);
    setCurrentIndex(newIndex);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-xl">Ошибка загрузки данных</div>
      </div>
    );
  }

  return (
    <>
      <Section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: 'Галерея', href: '/gallery' }]} />
        </div>
        <SectionHeader title="Галерея работ" subtitle="Наши выполненные проекты" centered titleColor="text-white" />
        <p className="text-slate-400 text-lg max-w-3xl mx-auto text-center mb-12">
          Фотографии наших работ по ремонту и обслуживанию холодильного оборудования различного типа
        </p>
      </Section>

      <Section background="light">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {['all', 'trade', 'industrial', 'climate', 'auto', 'refrigerator'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category === 'all' ? 'Все' : category === 'trade' ? 'Торговое' : category === 'industrial' ? 'Промышленное' : category === 'climate' ? 'Климатическое' : category === 'auto' ? 'Авто' : 'Рефрижераторы'}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.gallery
            ?.filter((item: any) => selectedCategory === 'all' || item.category === selectedCategory)
            .map((item: any, index: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group cursor-pointer overflow-hidden rounded-xl bg-gray-100 aspect-video"
              onClick={() => openImage(item, index)}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <ImageIcon className="w-16 h-16 text-blue-600" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={closeImage}>
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => { e.stopPropagation(); closeImage(); }}
          >
            <X size={32} />
          </button>

          <button
            className="absolute left-4 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <ChevronLeft size={48} />
          </button>

          <button
            className="absolute right-4 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <ChevronRight size={48} />
          </button>

          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded-xl p-8 text-center">
              {selectedImage.image ? (
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full aspect-video object-cover rounded-lg mb-6"
                />
              ) : (
                <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center mb-6">
                  <ImageIcon className="w-24 h-24 text-blue-600" />
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h3>
              <p className="text-gray-600">{selectedImage.description}</p>
              <p className="text-sm text-gray-500 mt-4">
                Изображение {currentIndex + 1} из {content.gallery?.length || 0}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
