import { createNamespaceKey } from './utils';

describe('createNamespaceKey', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should generate a key with the specified prefix', () => {
    const prefix = 'cbp-button';
    const key = createNamespaceKey(prefix);
    expect(key.startsWith(`${prefix}-`)).toBe(true);
    expect(key.length).toBe(prefix.length + 1 + 5);
  });

  it('should generate a key without a prefix when no prefix is provided', () => {
    const key = createNamespaceKey();
    expect(key.length).toBe(5);
    expect(key.includes('-')).toBe(false);
  });

  it('should generate a key without a prefix when undefined is passed', () => {
    const key = createNamespaceKey(undefined);
    expect(key.length).toBe(5);
    expect(key.includes('-')).toBe(false);
  });

  it('should generate a key without a prefix when empty string is passed', () => {
    const key = createNamespaceKey('');
    expect(key.length).toBe(5);
    expect(key.includes('-')).toBe(false);
  });

  it('should produce deterministic output when Math.random is mocked', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.123456789);

    const keyWithPrefix = createNamespaceKey('cbp-test');
    expect(keyWithPrefix).toBe('cbp-test-35bmk');

    const keyWithoutPrefix = createNamespaceKey();
    expect(keyWithoutPrefix).toBe('35bmk');
  });

  it('should generate unique keys across multiple invocations', () => {
    const count = 100;
    const keys = new Set<string>();

    for (let i = 0; i < count; i++) {
      keys.add(createNamespaceKey('test'));
    }

    expect(keys.size).toBe(count);
  });

  it('should contain only base-26 characters in the random suffix', () => {
    const key = createNamespaceKey();
    // Base 26 characters in JS toString(26) are digits 0-9 and lowercase letters a-p
    expect(key).toMatch(/^[0-9a-p]{5}$/);
  });

  it('should format the suffix with base-26 characters when prefix is supplied', () => {
    const prefix = 'cbp-checkbox';
    const key = createNamespaceKey(prefix);
    const suffix = key.slice(prefix.length + 1);
    expect(suffix).toMatch(/^[0-9a-p]{5}$/);
  });
});
