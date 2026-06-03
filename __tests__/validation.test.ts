import { contactFormSchema, escapeHtml } from '@/lib/validation';

describe('Validation Utils', () => {
  describe('contactFormSchema', () => {
    it('should validate correct data', () => {
      const validData = {
        name: 'Иван Иванов',
        phone: '+7 (999) 123-45-67',
        email: 'test@example.com',
        description: 'Need repair',
      };
      const result = contactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should fail if name is too short', () => {
      const invalidData = {
        name: 'И',
        phone: '+7 (999) 123-45-67',
      };
      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should fail if phone is invalid', () => {
      const invalidData = {
        name: 'Иван Иванов',
        phone: '123',
      };
      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should fail if honeypot (website) is filled', () => {
      const botData = {
        name: 'Иван Иванов',
        phone: '+7 (999) 123-45-67',
        website: 'http://evil.com',
      };
      const result = contactFormSchema.safeParse(botData);
      expect(result.success).toBe(false);
    });
  });

  describe('escapeHtml', () => {
    it('should escape HTML characters', () => {
      const input = '<script>alert("XSS")</script> & more';
      const expected = '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt; &amp; more';
      expect(escapeHtml(input)).toBe(expected);
    });
  });
});
