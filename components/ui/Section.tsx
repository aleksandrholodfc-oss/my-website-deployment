import { HTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  title?: string;
  subtitle?: string;
  center?: boolean;
  background?: 'light' | 'dark';
}

export default function Section({
  id,
  className,
  title,
  subtitle,
  center = true,
  background,
  children,
  ...props
}: SectionProps) {
  const bgClasses = {
    light: 'bg-slate-100',
    dark: 'bg-slate-900',
  };

  const textClasses = {
    light: 'text-gray-800',
    dark: 'text-white',
  };

  return (
    <section
      id={id}
      className={cn('py-12 sm:py-16 lg:py-24', background && bgClasses[background], className)}
      {...props}
    >
      <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', center && 'text-center')}>
        {(title || subtitle) && (
          <div className={cn('mb-8 sm:mb-12', !center && 'text-left')}>
            {subtitle && (
              <span
                className={cn(
                  'inline-block px-3 py-1 text-sm font-medium rounded-full mb-4',
                  background === 'light'
                    ? 'bg-blue-500/10 text-blue-600'
                    : 'bg-blue-500/10 text-blue-400'
                )}
              >
                {subtitle}
              </span>
            )}
            {title && (
              <h2
                className={cn(
                  'text-2xl sm:text-3xl md:text-4xl font-bold leading-tight',
                  background === 'light' ? textClasses.light : textClasses.dark
                )}
              >
                {title}
              </h2>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
