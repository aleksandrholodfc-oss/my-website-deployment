import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeader({ title, subtitle, description, centered = false }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={centered ? 'text-center max-w-3xl mx-auto mb-12' : 'mb-12'}
    >
      {subtitle && (
        <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-900 mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-gray-600 leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
