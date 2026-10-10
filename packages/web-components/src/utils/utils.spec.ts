import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  it('should generate a random key without a prefix when no argument is provided', () => {
    const key = createNamespaceKey();
    expect(key).toBeDefined();
    expect(typeof key).toBe('string');
    expect(key).toMatch(/^[a-z0-9]{5}$/);
  });

  it('should prepend prefix and hyphen when a prefix string is provided', () => {
    const prefix = 'cbp-button';
    const key = createNamespaceKey(prefix);
    expect(key.startsWith(`${prefix}-`)).toBe(true);
    expect(key).toMatch(/^cbp-button-[a-z0-9]{5}$/);
  });

  it('should handle an empty string prefix without adding a hyphen', () => {
    const key = createNamespaceKey('');
    expect(key).toBeDefined();
    expect(key).toMatch(/^[a-z0-9]{5}$/);
  });

  it('should generate distinct keys on consecutive calls', () => {
    const key1 = createNamespaceKey('test');
    const key2 = createNamespaceKey('test');
    expect(key1).not.toBe(key2);
  });

  it('should produce keys of expected length for different prefixes', () => {
    const prefix = 'my-component';
    const key = createNamespaceKey(prefix);
    // prefix length + 1 (hyphen) + 5 (random characters)
    expect(key.length).toBe(prefix.length + 1 + 5);
  });
});
