'use client';

import React, { useState } from 'react';
import { m } from 'framer-motion';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface GalleryClientProps {
  gallery: any[];
}

export default function GalleryClient({ gallery }: GalleryClientProps) {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const openImage = (item: any, index: number) => {
    setSelectedImage(item);
    setCurrentIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (!gallery) return;
    const newIndex = (currentIndex + 1) % gallery.length;
    setSelectedImage(gallery[newIndex]);
    setCurrentIndex(newIndex);
  };

  const prevImage = () => {
    if (!gallery) return;
    const newIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    setSelectedImage(gallery[newIndex]);
    setCurrentIndex(newIndex);
  };

  const categoryLabels: Record<string, string> = {
    all: 'Все',
    trade: 'Торговое',
    industrial: 'Промышленное',
    climate: 'Климатическое',
    auto: 'Авто',
    refrigerator: 'Рефрижераторы',
  };

  // Base64 gray-blue placeholder
  const blurDataURL =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88f7jfwAIdAL6m7yXWAAAAABJRU5ErkJggg==';

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
        {['all', 'trade', 'industrial', 'climate', 'auto', 'refrigerator'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm ${
              selectedCategory === category
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200 border border-slate-700'
            }`}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {gallery
          ?.filter((item: any) => selectedCategory === 'all' || item.category === selectedCategory)
          .map((item: any, index: number) => (
            <m.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg sm:rounded-xl bg-slate-800 aspect-video border border-slate-700"
              onClick={() => openImage(item, index)}
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-blue-600" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <h3 className="font-semibold text-sm sm:text-base mb-1">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-300">{item.description}</p>
                </div>
              </div>
            </m.div>
          ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 sm:p-4"
          onClick={closeImage}
        >
          <button
            className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white hover:text-gray-300 transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation();
              closeImage();
            }}
          >
            <X size={24} />
          </button>

          <button
            className="absolute left-2 sm:left-4 text-white hover:text-gray-300 transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <ChevronLeft size={32} />
          </button>

          <button
            className="absolute right-2 sm:right-4 text-white hover:text-gray-300 transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <ChevronRight size={32} />
          </button>

          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative aspect-video">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
              </div>
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-slate-400 text-sm sm:text-base mb-4">
                  {selectedImage.description}
                </p>
                <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-slate-500">
                  <span className="px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
                    {categoryLabels[selectedImage.category] || selectedImage.category}
                  </span>
                  <span>
                    Изображение {currentIndex + 1} из {gallery?.length || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
