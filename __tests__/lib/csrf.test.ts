import { generateCsrfToken, validateCsrfToken } from '@/lib/csrf';

describe('lib/csrf', () => {
  it('should generate a token', async () => {
    const token = await generateCsrfToken();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  it('should validate a correct token', async () => {
    const token = await generateCsrfToken();
    const isValid = await validateCsrfToken(token);
    expect(isValid).toBe(true);
  });

  it('should fail validation for an incorrect token', async () => {
    const isValid = await validateCsrfToken('invalid-token');
    expect(isValid).toBe(false);
  });

  it('should fail validation for a malformed token', async () => {
    const isValid = await validateCsrfToken('malformed:token');
    expect(isValid).toBe(false);
  });
});
