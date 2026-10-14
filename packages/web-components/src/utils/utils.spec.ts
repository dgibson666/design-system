import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  it('should generate a key without prefix when prefix is not provided', () => {
    const key = createNamespaceKey();
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
  });

  it('should generate a key with prefix followed by a hyphen', () => {
    const prefix = 'cbp-accordion-item';
    const key = createNamespaceKey(prefix);
    expect(key.startsWith(`${prefix}-`)).toBe(true);
    expect(key.length).toBe(prefix.length + 1 + 5);
  });

  it('should generate unique keys on consecutive calls', () => {
    const key1 = createNamespaceKey('test');
    const key2 = createNamespaceKey('test');
    expect(key1).not.toBe(key2);
  });

  it('should handle empty string prefix correctly', () => {
    const key = createNamespaceKey('');
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
    expect(key.includes('-')).toBe(false);
  });
});
