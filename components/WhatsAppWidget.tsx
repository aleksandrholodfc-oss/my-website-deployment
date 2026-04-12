'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppWidget() {
  const phoneNumber = '+79148866774'; // Replace with actual WhatsApp number

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber.replace(/\D/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title="Написать в WhatsApp"
    >
      <MessageCircle size={28} />
    </motion.a>
  );
}
