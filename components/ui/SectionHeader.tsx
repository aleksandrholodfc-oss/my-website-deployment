'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  titleColor?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  description,
  centered = false,
  titleColor,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={centered ? 'text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-1' : 'mb-8 sm:mb-12'}
    >
      {subtitle && (
        <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-xs sm:text-sm font-semibold mb-4">
          {subtitle}
        </span>
      )}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight ${titleColor || 'text-dark-900'}`}
      >
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
