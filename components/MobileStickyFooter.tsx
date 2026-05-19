'use client';

import { Phone } from 'lucide-react';

export default function MobileStickyFooter() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 p-3 sm:hidden z-50">
      <a
        href="tel:+79148866774"
        className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold active:bg-blue-700"
      >
        <Phone className="w-5 h-5" />
        <span>Позвонить</span>
      </a>
    </div>
  );
}
