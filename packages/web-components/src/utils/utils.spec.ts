import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  it('should generate a string key prefixed with given prefix and a hyphen when prefix is provided', () => {
    const prefix = 'cbp-accordion-item';
    const key = createNamespaceKey(prefix);

    expect(key.startsWith(`${prefix}-`)).toBe(true);
    // Suffix should be 5 base-26 characters
    const suffix = key.substring(prefix.length + 1);
    expect(suffix).toHaveLength(5);
    expect(suffix).toMatch(/^[0-9a-p]{5}$/);
  });

  it('should generate a string key without prefix or hyphen when prefix is omitted or empty', () => {
    const keyWithoutArg = createNamespaceKey();
    expect(keyWithoutArg).toHaveLength(5);
    expect(keyWithoutArg).toMatch(/^[0-9a-p]{5}$/);
    expect(keyWithoutArg).not.toContain('-');

    const keyWithEmptyPrefix = createNamespaceKey('');
    expect(keyWithEmptyPrefix).toHaveLength(5);
    expect(keyWithEmptyPrefix).toMatch(/^[0-9a-p]{5}$/);
    expect(keyWithEmptyPrefix).not.toContain('-');
  });

  it('should generate unique keys on consecutive calls', () => {
    const keys = new Set(Array.from({ length: 50 }, () => createNamespaceKey('test')));
    expect(keys.size).toBe(50);
  });
});
