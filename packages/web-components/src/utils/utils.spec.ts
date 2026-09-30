import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  it('should generate a 5-character string when no prefix is provided', () => {
    const key = createNamespaceKey();
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
  });

  it('should generate a 5-character string when prefix is undefined', () => {
    const key = createNamespaceKey(undefined);
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
  });

  it('should prepend the prefix and a hyphen when a prefix is provided', () => {
    const prefix = 'cbp-button';
    const key = createNamespaceKey(prefix);
    expect(key.startsWith(`${prefix}-`)).toBe(true);
    const randomPart = key.slice(prefix.length + 1);
    expect(randomPart.length).toBe(5);
    expect(key.length).toBe(prefix.length + 1 + 5);
  });

  it('should handle empty string prefix', () => {
    const key = createNamespaceKey('');
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
  });

  it('should generate unique values on subsequent calls', () => {
    const keys = new Set();
    const count = 100;
    for (let i = 0; i < count; i++) {
      keys.add(createNamespaceKey('test'));
    }
    expect(keys.size).toBe(count);
  });
});
