'use client';
import { forwardRef } from 'react';
import { m, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed';
    const variants = {
      primary:
        'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35',
      secondary:
        'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/35',
      outline:
        'border border-slate-600 hover:border-blue-500 text-slate-200 hover:text-white hover:bg-blue-500/10',
      ghost: 'text-slate-300 hover:text-white hover:bg-slate-800/50',
    };
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base',
      lg: 'px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg',
    };

    return (
      <m.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </m.button>
    );
  }
);
Button.displayName = 'Button';
export default Button;
