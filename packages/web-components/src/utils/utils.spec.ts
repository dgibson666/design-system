import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  it('should generate a key with prefix when prefix is provided', () => {
    const prefix = 'cbp-button';
    const key = createNamespaceKey(prefix);
    expect(key.startsWith(`${prefix}-`)).toBe(true);
    const suffix = key.slice(prefix.length + 1);
    expect(suffix).toHaveLength(5);
    expect(suffix).toMatch(/^[a-z0-9]{5}$/);
  });

  it('should generate a key without prefix when prefix is undefined or omitted', () => {
    const key = createNamespaceKey();
    expect(key).toHaveLength(5);
    expect(key).toMatch(/^[a-z0-9]{5}$/);
  });

  it('should handle empty string prefix', () => {
    const key = createNamespaceKey('');
    expect(key).toHaveLength(5);
    expect(key).toMatch(/^[a-z0-9]{5}$/);
  });

  it('should generate unique keys across multiple calls', () => {
    const keys = new Set(Array.from({ length: 100 }, () => createNamespaceKey('test')));
    expect(keys.size).toBe(100);
  });
});
