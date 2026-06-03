import { generateCsrfToken, validateCsrfToken } from '@/lib/csrf';
import { cookies } from 'next/headers';

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

describe('CSRF Protection', () => {
  const secret = 'dev-secret-key-at-least-32-chars-long-!!!';
  process.env.CSRF_SECRET = secret;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should generate a valid token', async () => {
    const token = await generateCsrfToken();
    expect(token).toContain('.');
    const [uuid, signature] = token.split('.');
    expect(uuid).toBeDefined();
    expect(signature).toBeDefined();
  });

  it('should validate a correct token with matching cookie', async () => {
    const token = await generateCsrfToken();
    (cookies as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue({ value: token }),
    });

    const isValid = await validateCsrfToken(token);
    expect(isValid).toBe(true);
  });

  it('should fail validation with incorrect signature', async () => {
    const token = await generateCsrfToken();
    const [uuid] = token.split('.');
    const invalidToken = `${uuid}.invalid-signature`;

    (cookies as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue({ value: invalidToken }),
    });

    const isValid = await validateCsrfToken(invalidToken);
    expect(isValid).toBe(false);
  });

  it('should fail validation if cookie does not match', async () => {
    const token1 = await generateCsrfToken();
    const token2 = await generateCsrfToken();

    (cookies as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue({ value: token2 }),
    });

    const isValid = await validateCsrfToken(token1);
    expect(isValid).toBe(false);
  });
});
