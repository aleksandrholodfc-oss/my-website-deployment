'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItem {
  value: string;
  label: string;
}

interface StatsCounterProps {
  stats: StatItem[];
}

export default function StatsCounter({ stats }: StatsCounterProps) {
  const [counted, setCounted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && !counted) {
      setCounted(true);
    }
  }, [isInView, counted]);

  const parseValue = (value: string): { number: number; suffix: string } => {
    const match = value.match(/(\d+)/);
    const number = match ? parseInt(match[1], 10) : 0;
    const suffix = value.replace(/\d+/, '');
    return { number, suffix };
  };

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, i) => {
        const { number, suffix } = parseValue(stat.value);
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-xl sm:rounded-2xl p-3 sm:p-5 hover:border-blue-500/60 hover:bg-slate-800/80 transition-all duration-300 shadow-lg text-center"
          >
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
              {counted ? (
                <AnimatedNumber value={number} suffix={suffix} />
              ) : (
                stat.value
              )}
            </div>
            <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
          </motion.div>
        );
      })}
    </div>
  );
}

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setCurrent(Math.min(Math.floor(increment * step), value));
      if (step >= steps) {
        clearInterval(timer);
        setCurrent(value);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {current}
      {suffix}
    </span>
  );
}
