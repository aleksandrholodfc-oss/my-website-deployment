'use client';
import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  hover?: boolean;
  delay?: number;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, delay = 0, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6',
          hover &&
            'hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all',
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4, delay }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = 'Card';
export default Card;
