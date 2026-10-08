import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  it('generates a key without prefix', () => {
    const key = createNamespaceKey();
    expect(key).toBeDefined();
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
    expect(key).toMatch(/^[a-p0-9]{5}$/);
  });

  it('generates a key with prefix', () => {
    const prefix = 'cbp-button';
    const key = createNamespaceKey(prefix);
    expect(key).toBeDefined();
    expect(key.startsWith('cbp-button-')).toBe(true);
    expect(key.length).toBe(prefix.length + 1 + 5);
    expect(key).toMatch(/^cbp-button-[a-p0-9]{5}$/);
  });

  it('handles empty string prefix correctly', () => {
    const key = createNamespaceKey('');
    expect(key).toBeDefined();
    expect(typeof key).toBe('string');
    expect(key.length).toBe(5);
    expect(key).toMatch(/^[a-p0-9]{5}$/);
  });

  it('generates unique keys on successive calls', () => {
    const keys = new Set();
    const count = 100;
    for (let i = 0; i < count; i++) {
      keys.add(createNamespaceKey('test'));
    }
    expect(keys.size).toBe(count);
  });
});
