'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
        {['all', 'trade', 'industrial', 'climate', 'auto', 'refrigerator'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category === 'all'
              ? 'Все'
              : category === 'trade'
                ? 'Торговое'
                : category === 'industrial'
                  ? 'Промышленное'
                  : category === 'climate'
                    ? 'Климатическое'
                    : category === 'auto'
                      ? 'Авто'
                      : 'Рефрижераторы'}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {gallery
          ?.filter((item: any) => selectedCategory === 'all' || item.category === selectedCategory)
          .map((item: any, index: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg sm:rounded-xl bg-gray-100 aspect-video"
              onClick={() => openImage(item, index)}
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-center text-white p-2 sm:p-4">
                  <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-300">{item.description}</p>
                </div>
              </div>
            </motion.div>
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
            <X size={32} className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <button
            className="absolute left-2 sm:left-4 text-white hover:text-gray-300 transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <ChevronLeft size={48} className="w-8 h-8 sm:w-12 sm:h-12" />
          </button>

          <button
            className="absolute right-2 sm:right-4 text-white hover:text-gray-300 transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <ChevronRight size={48} className="w-8 h-8 sm:w-12 sm:h-12" />
          </button>

          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 text-center">
              {selectedImage.image ? (
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  width={800}
                  height={450}
                  className="w-full aspect-video object-cover rounded-lg mb-4 sm:mb-6"
                />
              ) : (
                <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <ImageIcon className="w-16 h-16 sm:w-24 sm:h-24 text-blue-600" />
                </div>
              )}
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                {selectedImage.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">{selectedImage.description}</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-4">
                Изображение {currentIndex + 1} из {gallery?.length || 0}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
