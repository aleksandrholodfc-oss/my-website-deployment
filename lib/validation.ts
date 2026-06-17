import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа').max(100),
  phone: z
    .string()
    .regex(/^\+?[0-9\s\-\(\)]+$/, 'Некорректный формат телефона')
    .min(10)
    .max(20),
  email: z.string().email('Некорректный email').optional().or(z.literal('')),
  description: z.string().max(1000).optional().or(z.literal('')),
  website: z.string().max(0).optional(), // Honeypot
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
