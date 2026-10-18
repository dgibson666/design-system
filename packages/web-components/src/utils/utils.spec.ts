import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  it('should prepend prefix and hyphen when prefix is provided', () => {
    const prefix = 'cbp-button';
    const key = createNamespaceKey(prefix);

    expect(key.startsWith(`${prefix}-`)).toBe(true);
    const randomPart = key.slice(prefix.length + 1);
    expect(randomPart.length).toBe(5);
  });

  it('should return only random string when prefix is undefined', () => {
    const key = createNamespaceKey();

    expect(key).not.toContain('-');
    expect(key.length).toBe(5);
  });

  it('should return only random string when prefix is an empty string', () => {
    const key = createNamespaceKey('');

    expect(key).not.toContain('-');
    expect(key.length).toBe(5);
  });

  it('should generate unique keys across multiple invocations', () => {
    const keys = new Set<string>();
    const count = 100;

    for (let i = 0; i < count; i++) {
      keys.add(createNamespaceKey('test'));
    }

    expect(keys.size).toBe(count);
  });

  it('should contain valid base-26 alphanumeric characters in random suffix', () => {
    const key = createNamespaceKey('test');
    const randomPart = key.replace('test-', '');

    expect(randomPart).toMatch(/^[0-9a-p]{5}$/);
  });
});
