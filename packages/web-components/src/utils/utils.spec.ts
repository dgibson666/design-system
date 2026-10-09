import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  it('should generate a 5-character string when no prefix is provided', () => {
    const key = createNamespaceKey();
    expect(typeof key).toBe('string');
    expect(key).toMatch(/^[a-z0-9]{5}$/);
  });

  it('should prepend prefix and hyphen when prefix is provided', () => {
    const prefix = 'cbp-button';
    const key = createNamespaceKey(prefix);
    expect(key.startsWith(`${prefix}-`)).toBe(true);
    const suffix = key.slice(prefix.length + 1);
    expect(suffix).toMatch(/^[a-z0-9]{5}$/);
  });

  it('should return only the random string without leading hyphen when prefix is empty string', () => {
    const key = createNamespaceKey('');
    expect(key).toMatch(/^[a-z0-9]{5}$/);
  });

  it('should generate unique keys on successive calls', () => {
    const keys = new Set<string>();
    for (let i = 0; i < 100; i++) {
      keys.add(createNamespaceKey('test'));
    }
    expect(keys.size).toBe(100);
  });
});
