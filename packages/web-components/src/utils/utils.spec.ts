import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  it('should generate a string when called with no arguments', () => {
    const key = createNamespaceKey();
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
    expect(key).toMatch(/^[a-z0-9]{5}$/);
  });

  it('should prefix key with given string and hyphen when prefix is provided', () => {
    const prefix = 'cbp-button';
    const key = createNamespaceKey(prefix);
    expect(key.startsWith(`${prefix}-`)).toBe(true);
    expect(key.length).toBe(prefix.length + 1 + 5);
    expect(key).toMatch(/^cbp-button-[a-z0-9]{5}$/);
  });

  it('should handle empty string prefix without leading hyphen', () => {
    const key = createNamespaceKey('');
    expect(key.length).toBe(5);
    expect(key).toMatch(/^[a-z0-9]{5}$/);
    expect(key.startsWith('-')).toBe(false);
  });

  it('should generate unique keys on consecutive calls', () => {
    const keys = new Set<string>();
    for (let i = 0; i < 100; i++) {
      keys.add(createNamespaceKey('test'));
    }
    expect(keys.size).toBe(100);
  });
});
