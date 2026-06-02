import { cn } from '@/lib/utils';

describe('lib/utils - cn', () => {
  it('should merge class names correctly', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
  });

  it('should handle conditional classes', () => {
    expect(cn('bg-red-500', true && 'text-white', false && 'hidden')).toBe('bg-red-500 text-white');
  });

  it('should merge tailwind classes correctly (override)', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('should handle empty or null values', () => {
    expect(cn('base', null, undefined, '', false, 'extra')).toBe('base extra');
  });
});
