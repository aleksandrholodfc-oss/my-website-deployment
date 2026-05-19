'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  company: string;
  text: string;
  rating: number;
}

export default function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  if (!testimonials || testimonials.length === 0) return null;

  const t = testimonials[current];

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="bg-slate-800 rounded-xl p-6 sm:p-8 border border-slate-700">
        <Quote className="w-8 h-8 text-blue-400 mb-4" />
        <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-6">{t.text}</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            {t.name[0]}
          </div>
          <div>
            <p className="font-semibold text-white">{t.name}</p>
            <p className="text-sm text-slate-400">{t.company}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white transition-colors"
          aria-label="Предыдущий отзыв"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm text-slate-400">
          {current + 1} / {testimonials.length}
        </span>
        <button
          onClick={next}
          className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white transition-colors"
          aria-label="Следующий отзыв"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
